/**
 * Migratie Script: Statische Portfolio Foto's naar Supabase
 * 
 * Dit script migreert alle statische portfolio foto's uit portfolio-data.js
 * naar Supabase database.
 * 
 * Gebruik:
 * 1. Zorg dat .env.local correct is ingesteld met Supabase credentials
 * 2. Run: npx tsx scripts/migrate-static-photos.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials niet gevonden in .env.local')
  console.error('Zorg dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function migrateStaticPhotos() {
  try {
    console.log('🚀 Start migratie van statische portfolio foto\'s...\n')

    // Lees portfolio-data.js bestand
    const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
    console.log(`📖 Lees portfolio data van: ${portfolioDataPath}`)
    
    const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')

    // Extract STATIC_PORTFOLIO_DATA uit het JavaScript bestand
    const staticDataMatch = portfolioDataContent.match(/const STATIC_PORTFOLIO_DATA\s*=\s*({[\s\S]*?});/)
    
    if (!staticDataMatch) {
      console.error('❌ Kon STATIC_PORTFOLIO_DATA niet vinden in portfolio-data.js')
      process.exit(1)
    }

    // Eval de JavaScript code om het object te krijgen
    const staticDataString = staticDataMatch[1]
    const staticData = eval(`(${staticDataString})`)

    let totalMigrated = 0
    let totalSkipped = 0
    let totalErrors = 0
    const errors: string[] = []

    const memberNames = Object.keys(staticData)
    console.log(`📊 Gevonden ${memberNames.length} leden met portfolio's\n`)

    // Loop door alle leden
    for (const memberName of memberNames) {
      const memberData = (staticData as any)[memberName]
      
      if (!memberData || !memberData.photos || !Array.isArray(memberData.photos)) {
        console.log(`⚠️  ${memberName}: Geen foto's gevonden`)
        continue
      }

      const photos = memberData.photos as Array<{ src: string; title: string; category?: string }>
      console.log(`\n👤 ${memberName}: ${photos.length} foto's gevonden`)

      // Check eerst of er al foto's zijn voor deze lid
      const { data: existingPhotos } = await supabase
        .from('portfolio_photos')
        .select('cloudinary_url, cloudinary_public_id')
        .eq('member_name', memberName)

      const existingUrls = new Set(existingPhotos?.map(p => p.cloudinary_url) || [])
      const existingPublicIds = new Set(existingPhotos?.map(p => p.cloudinary_public_id) || [])

      // Migreer elke foto
      for (let index = 0; index < photos.length; index++) {
        const photo = photos[index]
        
        // Maak URL - voeg / toe voor relatieve paden
        const photoUrl = photo.src.startsWith('http') 
          ? photo.src 
          : `/${photo.src}`
        
        // Skip als foto al bestaat
        if (existingUrls.has(photoUrl)) {
          totalSkipped++
          continue
        }

        try {
          // Voor statische foto's gebruiken we de huidige URL als cloudinary_url
          // en genereren een fake public_id (we kunnen deze later vervangen als we naar Cloudinary migreren)
          const fileName = photo.src.split('/').pop() || 'photo.jpg'
          const fakePublicId = `static/${memberName.toLowerCase().replace(/\s+/g, '-')}/${fileName}`

          // Skip als public_id al bestaat
          if (existingPublicIds.has(fakePublicId)) {
            totalSkipped++
            continue
          }

          const { error } = await supabase
            .from('portfolio_photos')
            .insert([{
              member_name: memberName,
              cloudinary_url: photoUrl,
              cloudinary_public_id: fakePublicId,
              title: photo.title || 'Foto',
              display_order: index,
            }])

          if (error) {
            // Skip duplicate errors (mogelijk race condition)
            if (error.message.includes('duplicate') || error.message.includes('unique')) {
              totalSkipped++
            } else {
              errors.push(`${memberName}: "${photo.title}" - ${error.message}`)
              totalErrors++
              console.log(`  ❌ Fout bij "${photo.title}": ${error.message}`)
            }
          } else {
            totalMigrated++
            if ((index + 1) % 10 === 0) {
              process.stdout.write(`  ✅ ${index + 1}/${photos.length} foto's gemigreerd...\r`)
            }
          }
        } catch (error: any) {
          errors.push(`${memberName}: "${photo.title}" - ${error.message}`)
          totalErrors++
          console.log(`  ❌ Fout bij "${photo.title}": ${error.message}`)
        }
      }

      console.log(`  ✅ ${memberName}: ${totalMigrated} nieuwe foto's gemigreerd`)
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 Migratie Resultaten:')
    console.log(`  ✅ Succesvol gemigreerd: ${totalMigrated}`)
    console.log(`  ⏭️  Overgeslagen (al aanwezig): ${totalSkipped}`)
    console.log(`  ❌ Fouten: ${totalErrors}`)
    
    if (errors.length > 0) {
      console.log('\n⚠️  Eerste 10 fouten:')
      errors.slice(0, 10).forEach(error => console.log(`  - ${error}`))
      if (errors.length > 10) {
        console.log(`  ... en ${errors.length - 10} meer fouten`)
      }
    }

    console.log('\n✨ Migratie voltooid!')
  } catch (error: any) {
    console.error('\n❌ Migratie mislukt:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run migratie
migrateStaticPhotos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })



