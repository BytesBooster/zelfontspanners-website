/**
 * Script om portfolio's van portfolio-data.js naar de database te migreren
 * 
 * Gebruik:
 * 1. Zorg dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld
 * 2. Run: npx tsx scripts/migrate-portfolios-to-db.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
  console.log('✅ .env.local geladen')
} else {
  // Try .env as fallback
  const envFallback = path.join(process.cwd(), '.env')
  if (fs.existsSync(envFallback)) {
    dotenv.config({ path: envFallback })
    console.log('✅ .env geladen')
  } else {
    console.log('⚠️  Geen .env.local of .env bestand gevonden')
  }
}

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY moeten zijn ingesteld!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Read portfolio-data.js file
const portfolioDataPath = path.join(process.cwd(), 'public', 'portfolio-data.js')
const portfolioDataContent = fs.readFileSync(portfolioDataPath, 'utf-8')

// Extract STATIC_PORTFOLIO_DATA from the file
// Find the start and end of the STATIC_PORTFOLIO_DATA object
const startMarker = 'const STATIC_PORTFOLIO_DATA = {'
const startIndex = portfolioDataContent.indexOf(startMarker)
if (startIndex === -1) {
  console.error('❌ Kon STATIC_PORTFOLIO_DATA niet vinden in portfolio-data.js')
  process.exit(1)
}

// Find where the object ends (look for the closing brace and semicolon)
// The object ends with }; after the closing brace
let endIndex = portfolioDataContent.indexOf('};', startIndex)
if (endIndex === -1) {
  // Try without semicolon
  endIndex = portfolioDataContent.lastIndexOf('}', portfolioDataContent.length - 10)
}

if (endIndex === -1 || endIndex <= startIndex) {
  console.error('❌ Kon einde van STATIC_PORTFOLIO_DATA niet vinden')
  process.exit(1)
}

// Extract the data object (including the opening brace)
const dataStart = startIndex + startMarker.length - 1 // Include the opening brace
const dataString = portfolioDataContent.substring(dataStart, endIndex + 1)

// Evaluate the JavaScript to get the data (only for migration script)
let staticPortfolioData: Record<string, { name: string; photos: Array<{ src: string; title: string; category?: string }> }>
try {
  // Use eval in a controlled way (only for migration script)
  // Wrap in try-catch to handle any syntax errors
  const evalCode = `staticPortfolioData = ${dataString}`
  eval(evalCode)
  
  if (!staticPortfolioData || typeof staticPortfolioData !== 'object') {
    throw new Error('STATIC_PORTFOLIO_DATA is geen geldig object')
  }
  
  console.log(`✅ Portfolio data geladen: ${Object.keys(staticPortfolioData).length} members`)
} catch (error: any) {
  console.error('❌ Fout bij het parsen van portfolio-data.js:', error.message)
  console.error('Tip: Controleer of portfolio-data.js geldige JavaScript syntax heeft')
  console.error('Debug: Start index:', startIndex, 'End index:', endIndex)
  process.exit(1)
}

async function migratePortfolios() {
  console.log('🚀 Start migratie van portfolio\'s naar database...\n')

  const members = Object.keys(staticPortfolioData)
  console.log(`📋 Gevonden ${members.length} members\n`)

  let totalPhotos = 0
  let migratedPhotos = 0
  let errors = 0

  for (const memberName of members) {
    const memberData = staticPortfolioData[memberName]
    const photos = memberData.photos || []
    
    if (photos.length === 0) {
      console.log(`⏭️  ${memberName}: Geen foto's, overslaan`)
      continue
    }

    console.log(`📸 ${memberName}: ${photos.length} foto's`)

    // Migrate each photo
    const photoOrder: string[] = []
    
    for (const photo of photos) {
      totalPhotos++
      
      try {
        // Insert photo into portfolio_data
        const { error: insertError } = await supabase
          .from('portfolio_data')
          .insert({
            member_name: memberName,
            photo_data: {
              src: photo.src,
              title: photo.title || '',
              category: photo.category || 'all',
              isUserUploaded: false
            }
          })

        if (insertError) {
          // Check if it's a duplicate (photo already exists)
          if (insertError.code === '23505') {
            console.log(`   ⚠️  Foto al aanwezig: ${photo.title || photo.src.substring(0, 30)}`)
          } else {
            console.error(`   ❌ Fout bij foto "${photo.title || photo.src}":`, insertError.message)
            errors++
          }
        } else {
          migratedPhotos++
          photoOrder.push(photo.src)
        }
      } catch (error: any) {
        console.error(`   ❌ Fout bij foto "${photo.title || photo.src}":`, error.message)
        errors++
      }
    }

    // Update portfolio_order
    if (photoOrder.length > 0) {
      try {
        const { error: orderError } = await supabase
          .from('portfolio_order')
          .upsert({
            member_name: memberName,
            photo_order: photoOrder,
            updated_at: new Date().toISOString()
          })

        if (orderError) {
          console.error(`   ❌ Fout bij portfolio_order voor ${memberName}:`, orderError.message)
        } else {
          console.log(`   ✅ Portfolio order opgeslagen (${photoOrder.length} foto's)`)
        }
      } catch (error: any) {
        console.error(`   ❌ Fout bij portfolio_order voor ${memberName}:`, error.message)
      }
    }

    console.log('')
  }

  console.log('\n📊 Migratie samenvatting:')
  console.log(`   Totaal foto's: ${totalPhotos}`)
  console.log(`   Gemigreerd: ${migratedPhotos}`)
  console.log(`   Fouten: ${errors}`)
  console.log(`   Members: ${members.length}`)
  
  if (errors === 0) {
    console.log('\n✅ Migratie succesvol voltooid!')
  } else {
    console.log(`\n⚠️  Migratie voltooid met ${errors} fouten`)
  }
}

// Run migration
migratePortfolios().catch((error) => {
  console.error('❌ Kritieke fout:', error)
  process.exit(1)
})

