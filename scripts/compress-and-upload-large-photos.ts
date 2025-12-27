/**
 * Script om te grote foto's te comprimeren en opnieuw te uploaden naar Cloudinary
 * 
 * Gebruik:
 * npx tsx scripts/compress-and-upload-large-photos.ts
 */

import { readFileSync, existsSync, statSync, unlinkSync, readdirSync } from 'fs'
import { join } from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import sharp from 'sharp'

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

// Vind automatisch alle foto's groter dan 10MB
function findLargePhotos(): Array<{ memberName: string; fileName: string; src: string; size: number }> {
  const largePhotos: Array<{ memberName: string; fileName: string; src: string; size: number }> = []
  const portfolioPath = join(process.cwd(), 'public', 'images', 'portfolio')
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!existsSync(portfolioPath)) {
    return largePhotos
  }

  const memberFolders = readdirSync(portfolioPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const memberFolder of memberFolders) {
    const memberPath = join(portfolioPath, memberFolder)
    const files = readdirSync(memberPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .filter(dirent => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(dirent.name))

    for (const file of files) {
      const filePath = join(memberPath, file.name)
      const stats = statSync(filePath)
      
      if (stats.size > maxSize) {
        // Zoek de juiste member naam in portfolio-data.js
        const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
        const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')
        
        // Zoek member naam die overeenkomt met deze folder
        let memberName = memberFolder.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
        
        // Probeer exacte match te vinden in portfolio-data.js
        const memberNamePattern = new RegExp(`'([^']+)':\\s*{[^}]*name:\\s*'([^']+)'`, 'g')
        let match
        while ((match = memberNamePattern.exec(portfolioDataContent)) !== null) {
          const key = match[1]
          const name = match[2]
          // Check of folder naam overeenkomt met key (case-insensitive, zonder spaties)
          const normalizedKey = key.toLowerCase().replace(/\s+/g, '-')
          const normalizedFolder = memberFolder.toLowerCase()
          if (normalizedKey === normalizedFolder || normalizedKey.includes(normalizedFolder) || normalizedFolder.includes(normalizedKey)) {
            memberName = name
            break
          }
        }
        
        largePhotos.push({
          memberName: memberName,
          fileName: file.name.replace(/\.[^/.]+$/, ''),
          src: `images/portfolio/${memberFolder}/${file.name}`,
          size: stats.size
        })
      }
    }
  }

  return largePhotos
}

async function compressAndUpload() {
  console.log('🔍 Zoeken naar foto\'s groter dan 10MB...\n')
  
  const largePhotos = findLargePhotos()
  
  if (largePhotos.length === 0) {
    console.log('✅ Geen foto\'s gevonden die groter zijn dan 10MB!')
    return
  }

  console.log(`📸 ${largePhotos.length} foto's gevonden die gecomprimeerd moeten worden:\n`)
  largePhotos.forEach(photo => {
    console.log(`  - ${photo.memberName}: ${photo.fileName} (${(photo.size / 1024 / 1024).toFixed(2)} MB)`)
  })
  console.log('')

  let totalUploaded = 0
  let totalErrors = 0
  const errors: string[] = []

  for (const photo of largePhotos) {
    try {
      // Gebruik het pad dat al is gevonden
      const localPath = join(process.cwd(), 'public', photo.src)

      if (!existsSync(localPath)) {
        errors.push(`${photo.memberName}: "${photo.fileName}" - Bestand niet gevonden: ${photo.src}`)
        totalErrors++
        continue
      }

      const originalSize = statSync(localPath).size
      console.log(`📸 ${photo.fileName}: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)

      // Comprimeer de foto
      const tempPath = localPath + '.compressed.jpg'
      let quality = 85
      let compressedSize = originalSize

      // Comprimeer tot onder 10MB (9MB om veilig te zijn)
      while (compressedSize > 9 * 1024 * 1024 && quality > 30) {
        await sharp(localPath)
          .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toFile(tempPath)

        compressedSize = statSync(tempPath).size
        console.log(`  🔄 Kwaliteit ${quality}%: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`)

        if (compressedSize > 9 * 1024 * 1024) {
          quality -= 5
        }
      }

      if (compressedSize > 10 * 1024 * 1024) {
        errors.push(`${photo.memberName}: "${photo.fileName}" - Kan niet comprimeren tot onder 10MB`)
        totalErrors++
        if (existsSync(tempPath)) {
          unlinkSync(tempPath)
        }
        continue
      }

      console.log(`  ✅ Gecomprimeerd naar ${(compressedSize / 1024 / 1024).toFixed(2)} MB (${quality}% kwaliteit)`)

      // Upload naar Cloudinary
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: `zelfontspanners/portfolio/${photo.memberName}`,
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
      })

      // Verwijder tijdelijk bestand
      if (existsSync(tempPath)) {
        unlinkSync(tempPath)
      }

      // Update Supabase
      const photoUrl = photo.src.startsWith('/') ? photo.src : `/${photo.src}`
      const { data: existingPhotos } = await supabase
        .from('portfolio_photos')
        .select('id, cloudinary_url')
        .eq('member_name', photo.memberName)
        .or(`cloudinary_url.eq.${photoUrl},cloudinary_url.eq.${photo.src}`)

      const existingPhoto = existingPhotos?.find(p => {
        const normalizedUrl = p.cloudinary_url.replace(/^\//, '').toLowerCase()
        const normalizedSrc = photo.src.replace(/^\//, '').toLowerCase()
        return normalizedUrl === normalizedSrc || normalizedUrl.includes(photo.fileName.toLowerCase())
      })

      if (existingPhoto) {
        await supabase
          .from('portfolio_photos')
          .update({
            cloudinary_url: result.secure_url,
            cloudinary_public_id: result.public_id,
          })
          .eq('id', existingPhoto.id)
      } else {
        // Zoek in portfolio-data.js voor display_order
        const portfolioDataPath = join(process.cwd(), 'public', 'portfolio-data.js')
        const portfolioDataContent = readFileSync(portfolioDataPath, 'utf-8')
        
        // Probeer de index te vinden (vereenvoudigd)
        let displayOrder = 0
        const memberDataMatch = portfolioDataContent.match(new RegExp(`'${photo.memberName}':\\s*{[^}]*photos:\\s*\\[[^\\]]*\\{[^}]*src:\\s*['"]${photo.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 's'))
        if (memberDataMatch) {
          // Vereenvoudigde manier om index te vinden
          const beforeMatch = portfolioDataContent.substring(0, portfolioDataContent.indexOf(memberDataMatch[0]))
          const memberStart = beforeMatch.lastIndexOf(`'${photo.memberName}'`)
          const photosStart = portfolioDataContent.indexOf('photos:', memberStart)
          const photoIndex = portfolioDataContent.substring(photosStart, memberDataMatch.index).split('{').length - 1
          displayOrder = photoIndex
        }

        await supabase
          .from('portfolio_photos')
          .insert([{
            member_name: photo.memberName,
            cloudinary_url: result.secure_url,
            cloudinary_public_id: result.public_id,
            title: photo.fileName,
            display_order: displayOrder,
          }])
      }

      totalUploaded++
      console.log(`  ✅ Geüpload naar Cloudinary\n`)
    } catch (error: any) {
      errors.push(`${photo.memberName}: "${photo.fileName}" - ${error.message}`)
      totalErrors++
      console.error(`  ❌ Fout: ${error.message}\n`)
    }
  }

  console.log('='.repeat(60))
  console.log('📊 Resultaten:')
  console.log(`  ✅ Succesvol geüpload: ${totalUploaded}`)
  console.log(`  ❌ Fouten: ${totalErrors}`)

  if (errors.length > 0) {
    console.log('\n⚠️  Fouten:')
    errors.forEach(error => console.log(`  - ${error}`))
  }

  console.log('\n✨ Klaar!')
}

compressAndUpload()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

