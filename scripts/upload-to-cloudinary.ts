/**
 * Script om alle statische portfolio foto's naar Cloudinary te uploaden
 * en de URLs in Supabase bij te werken
 * 
 * Gebruik:
 * npx tsx scripts/upload-to-cloudinary.ts
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || ''
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || ''

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
  console.error('❌ Cloudinary credentials niet gevonden in .env.local')
  process.exit(1)
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials niet gevonden in .env.local')
  process.exit(1)
}

// Configureer Cloudinary
cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
})

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function uploadToCloudinary() {
  console.log('🚀 Start uploaden van statische foto\'s naar Cloudinary...\n')

  // Lees portfolio-data.js
  const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
  const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')

  const startIndex = portfolioDataContent.indexOf('const STATIC_PORTFOLIO_DATA')
  if (startIndex === -1) {
    console.error('❌ Kon STATIC_PORTFOLIO_DATA niet vinden')
    process.exit(1)
  }

  const objectStart = portfolioDataContent.indexOf('{', startIndex)
  if (objectStart === -1) {
    console.error('❌ Kon object start niet vinden')
    process.exit(1)
  }

  let bracketCount = 0
  let objectEnd = objectStart
  for (let i = objectStart; i < portfolioDataContent.length; i++) {
    const char = portfolioDataContent[i]
    if (char === '{') bracketCount++
    if (char === '}') bracketCount--
    if (bracketCount === 0) {
      objectEnd = i + 1
      break
    }
  }

  const staticDataString = portfolioDataContent.substring(objectStart, objectEnd)
  let staticData: any

  try {
    const func = new Function(`return ${staticDataString}`)
    staticData = func()
  } catch (evalError: any) {
    console.error('❌ Fout bij parsen van portfolio data:', evalError.message)
    process.exit(1)
  }

  let totalUploaded = 0
  let totalSkipped = 0
  let totalErrors = 0
  const errors: string[] = []

  // Loop door alle leden
  for (const [memberName, memberData] of Object.entries(staticData as any)) {
    if (!memberData || !memberData.photos || !Array.isArray(memberData.photos)) {
      continue
    }

    const photos = memberData.photos as Array<{ src: string; title: string }>
    console.log(`\n👤 ${memberName}: ${photos.length} foto's`)

    // Haal bestaande foto's op uit Supabase voor deze lid
    const { data: existingPhotos } = await supabase
      .from('portfolio_photos')
      .select('id, cloudinary_url, cloudinary_public_id')
      .eq('member_name', memberName)

    const existingUrls = new Set(existingPhotos?.map(p => p.cloudinary_url) || [])
    const existingPublicIds = new Set(existingPhotos?.map(p => p.cloudinary_public_id) || [])

  // Upload elke foto naar Cloudinary
  for (let index = 0; index < photos.length; index++) {
    const photo = photos[index]
    
    // Skip als foto al een Cloudinary URL heeft
    if (photo.src.startsWith('http')) {
      totalSkipped++
      continue
    }

    // Check of foto al bestaat in Supabase met Cloudinary URL
    const photoUrl = photo.src.startsWith('/') ? photo.src : `/${photo.src}`
    if (existingUrls.has(photoUrl)) {
      // Check of het al een Cloudinary URL is
      const existingPhoto = existingPhotos?.find(p => p.cloudinary_url === photoUrl)
      if (existingPhoto && existingPhoto.cloudinary_public_id && !existingPhoto.cloudinary_public_id.startsWith('static/')) {
        totalSkipped++
        continue
      }
    }

    try {
      // Pad naar lokale foto
      const localPath = join(process.cwd(), 'public', photo.src.replace(/^\//, ''))
      
      if (!existsSync(localPath)) {
        errors.push(`${memberName}: "${photo.title}" - Bestand niet gevonden: ${localPath}`)
        totalErrors++
        continue
      }

      // Upload naar Cloudinary
      const result = await cloudinary.uploader.upload(localPath, {
        folder: `zelfontspanners/portfolio/${memberName}`,
        resource_type: 'image',
        format: 'jpg',
        quality: 'auto:good',
        transformation: [
          {
            width: 1920,
            height: 1920,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        ],
        context: {
          alt: photo.title || '',
          caption: photo.title || '',
        },
      })

      // Update of insert in Supabase
      const existingPhoto = existingPhotos?.find(p => {
        const normalizedUrl = p.cloudinary_url.replace(/^\//, '').toLowerCase()
        const normalizedSrc = photo.src.replace(/^\//, '').toLowerCase()
        return normalizedUrl === normalizedSrc
      })

      if (existingPhoto) {
        // Update bestaande record
        const { error: updateError } = await supabase
          .from('portfolio_photos')
          .update({
            cloudinary_url: result.secure_url,
            cloudinary_public_id: result.public_id,
          })
          .eq('id', existingPhoto.id)
        
        if (updateError) {
          throw new Error(`Supabase update error: ${updateError.message}`)
        }
      } else {
        // Insert nieuwe record
        const { error: insertError } = await supabase
          .from('portfolio_photos')
          .insert([{
            member_name: memberName,
            cloudinary_url: result.secure_url,
            cloudinary_public_id: result.public_id,
            title: photo.title || 'Foto',
            display_order: index,
          }])
        
        if (insertError) {
          throw new Error(`Supabase insert error: ${insertError.message}`)
        }
      }

      totalUploaded++
      if (totalUploaded % 10 === 0) {
        console.log(`  ✅ ${totalUploaded} foto's geüpload...`)
      }
    } catch (error: any) {
      errors.push(`${memberName}: "${photo.title}" - ${error.message}`)
      totalErrors++
      console.error(`  ❌ Fout bij "${photo.title}": ${error.message}`)
    }
  }
}

console.log('\n' + '='.repeat(60))
console.log('📊 Resultaten:')
console.log(`  ✅ Succesvol geüpload: ${totalUploaded}`)
console.log(`  ⏭️  Overgeslagen: ${totalSkipped}`)
console.log(`  ❌ Fouten: ${totalErrors}`)

if (errors.length > 0) {
  console.log('\n⚠️  Eerste 10 fouten:')
  errors.slice(0, 10).forEach(error => console.log(`  - ${error}`))
  if (errors.length > 10) {
    console.log(`  ... en ${errors.length - 10} meer fouten`)
  }
}

  console.log('\n✨ Upload voltooid!')
  console.log('\n💡 Nu kun je de originele foto\'s veilig verwijderen met:')
  console.log('   npx tsx scripts/move-static-photos.ts --delete')
}

// Run de async functie
uploadToCloudinary()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

