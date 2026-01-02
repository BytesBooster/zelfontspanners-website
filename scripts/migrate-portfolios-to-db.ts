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
// This is a bit hacky but works for this migration
const dataMatch = portfolioDataContent.match(/const STATIC_PORTFOLIO_DATA = ({[\s\S]*?});/)
if (!dataMatch) {
  console.error('❌ Kon STATIC_PORTFOLIO_DATA niet vinden in portfolio-data.js')
  process.exit(1)
}

// Evaluate the JavaScript to get the data (in a safe way)
let staticPortfolioData: Record<string, { name: string; photos: Array<{ src: string; title: string; category?: string }> }>
try {
  // Use eval in a controlled way (only for migration script)
  eval(`staticPortfolioData = ${dataMatch[1]}`)
} catch (error) {
  console.error('❌ Fout bij het parsen van portfolio-data.js:', error)
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

