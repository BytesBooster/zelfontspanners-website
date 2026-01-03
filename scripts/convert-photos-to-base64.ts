/**
 * Script om alle portfolio foto's te converteren naar base64 en op te slaan in de database
 * 
 * BELANGRIJK: Dit script gebruikt GEEN lokale bestanden - alles wordt gedownload van de live server!
 * 
 * Dit script:
 * 1. Leest alle foto's uit de database die nog relative_path zijn
 * 2. Download de foto's VAN DE LIVE SERVER (https://zelfontspanners.nl)
 * 3. Converteert ze naar base64
 * 4. Update de database met de base64 data
 * 
 * Na dit script staan alle foto's als base64 in de database - geen serverbestanden meer nodig!
 * 
 * Gebruik:
 * 1. Zorg dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld
 * 2. Run: npm run convert-photos
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

// BELANGRIJK: Dit script leest lokale foto's en converteert ze naar base64 in de database

// Load environment variables
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
  console.log('✅ .env.local geladen')
} else {
  const envFallback = path.join(process.cwd(), '.env')
  if (fs.existsSync(envFallback)) {
    dotenv.config({ path: envFallback })
    console.log('✅ .env geladen')
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY moeten zijn ingesteld!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Function to read local file, compress and convert to base64
async function readLocalFileAsBase64(filePath: string, maxWidth: number = 1920, quality: number = 0.8): Promise<string> {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    // Try to use sharp for compression (if available)
    let sharp: any = null
    try {
      sharp = require('sharp')
    } catch (e) {
      // Sharp not available, use basic compression
    }

    if (sharp) {
      // Use sharp for compression
      const buffer = await sharp(filePath)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: Math.round(quality * 100) })
        .toBuffer()
      
      const base64 = buffer.toString('base64')
      return `data:image/jpeg;base64,${base64}`
    } else {
      // Fallback: read file without compression (but warn)
      const buffer = fs.readFileSync(filePath)
      const fileSizeMB = (buffer.length / 1024 / 1024).toFixed(2)
      
      if (buffer.length > 5 * 1024 * 1024) { // > 5MB
        console.log(`   ⚠️  Grote afbeelding (${fileSizeMB}MB) - overweeg sharp te installeren voor compressie`)
      }
      
      const base64 = buffer.toString('base64')
      const ext = path.extname(filePath).toLowerCase()
      const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.JPG': 'image/jpeg',
        '.JPEG': 'image/jpeg',
        '.PNG': 'image/png',
        '.GIF': 'image/gif',
        '.WEBP': 'image/webp'
      }
      const contentType = mimeTypes[ext] || 'image/jpeg'
      return `data:${contentType};base64,${base64}`
    }
  } catch (error: any) {
    throw error
  }
}

// Function to find local file matching database path
function findLocalFile(dbPath: string, localBasePath: string): string | null {
  // Convert database path to local file path
  // Database path: images/portfolio/willeke-buijssen/PB192436.JPG
  // Local path should be: C:\Users\jrdhn\Desktop\zelfontspanners-statische-fotos\images\portfolio\willeke-buijssen\PB192436.JPG
  
  // Remove leading slash if present
  let cleanPath = dbPath.startsWith('/') ? dbPath.substring(1) : dbPath
  
  // Try exact match first
  const exactPath = path.join(localBasePath, cleanPath)
  if (fs.existsSync(exactPath)) {
    return exactPath
  }
  
  // Try with different path separators
  const normalizedPath = cleanPath.replace(/\//g, path.sep)
  const normalizedFullPath = path.join(localBasePath, normalizedPath)
  if (fs.existsSync(normalizedFullPath)) {
    return normalizedFullPath
  }
  
  // Try to find file by filename only (search recursively)
  const fileName = path.basename(cleanPath)
  try {
    const found = findFileRecursive(localBasePath, fileName)
    if (found) {
      return found
    }
  } catch (e) {
    // Ignore errors
  }
  
  return null
}

// Recursive function to find file by name
function findFileRecursive(dir: string, fileName: string): string | null {
  try {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        const found = findFileRecursive(fullPath, fileName)
        if (found) return found
      } else if (file === fileName || file.toLowerCase() === fileName.toLowerCase()) {
        return fullPath
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  return null
}

// Deze functie wordt niet meer gebruikt - we downloaden alles van de live server

// Function to convert image path to base64 - leest van lokale bestanden!
async function convertImageToBase64(src: string, localBasePath: string): Promise<string | null> {
  try {
    // If already base64, return as is
    if (src.startsWith('data:image')) {
      return src
    }

    // If it's a full URL, skip (we only process local files)
    if (src.startsWith('http://') || src.startsWith('https://')) {
      console.log(`   ⏭️  Skipping URL (alleen lokale bestanden): ${src}`)
      return null
    }

    // Find local file matching database path
    const localFilePath = findLocalFile(src, localBasePath)
    
    if (!localFilePath) {
      console.log(`   ❌ Lokale bestand niet gevonden voor: ${src}`)
      return null
    }

    console.log(`   📁 Gevonden lokaal: ${localFilePath}`)
    try {
      return await readLocalFileAsBase64(localFilePath)
    } catch (error: any) {
      console.log(`   ❌ Kon lokaal bestand niet lezen: ${error.message}`)
      return null
    }
  } catch (error: any) {
    console.error(`   ❌ Fout bij converteren image ${src}:`, error.message)
    return null
  }
}

async function convertAllPhotosToBase64() {
  console.log('🚀 Start conversie van foto\'s naar base64...\n')

  // Lokale map met foto's
  const localBasePath = 'C:\\Users\\jrdhn\\Desktop\\zelfontspanners-statische-fotos'
  
  // Check if local path exists
  if (!fs.existsSync(localBasePath)) {
    console.error(`❌ Lokale map niet gevonden: ${localBasePath}`)
    console.error(`   Zorg dat de map bestaat en alle foto's bevat!`)
    process.exit(1)
  }

  console.log(`📁 Lokale map: ${localBasePath}`)
  console.log(`✅ Map gevonden!\n`)

  // Fetch all portfolio photos that are not yet base64
  const { data: allPhotos, error: fetchError } = await supabase
    .from('portfolio_data')
    .select('id, member_name, photo_data')

  if (fetchError) {
    console.error('❌ Fout bij ophalen foto\'s:', fetchError.message)
    process.exit(1)
  }

  if (!allPhotos || allPhotos.length === 0) {
    console.log('⚠️  Geen foto\'s gevonden in database')
    return
  }

  console.log(`📋 Gevonden ${allPhotos.length} foto's in database\n`)

  let converted = 0
  let skipped = 0
  let errors = 0
  let alreadyBase64 = 0

  for (const photo of allPhotos) {
    const photoData = photo.photo_data as any
    const src = photoData?.src

    if (!src) {
      console.log(`⏭️  Foto ID ${photo.id}: Geen src gevonden, overslaan`)
      skipped++
      continue
    }

    // Check if already base64
    if (src.startsWith('data:image')) {
      console.log(`✅ Foto ID ${photo.id} (${photo.member_name}): Al base64`)
      alreadyBase64++
      continue
    }

    console.log(`🔄 Foto ID ${photo.id} (${photo.member_name}): ${src.substring(0, 50)}...`)

    try {
      const base64Src = await convertImageToBase64(src, localBasePath)

      if (!base64Src) {
        console.log(`   ⚠️  Kon foto niet converteren, overslaan`)
        skipped++
        continue
      }

      // Update photo_data with base64 src
      const updatedPhotoData = {
        ...photoData,
        src: base64Src
      }

      const { error: updateError } = await supabase
        .from('portfolio_data')
        .update({ photo_data: updatedPhotoData })
        .eq('id', photo.id)

      if (updateError) {
        console.error(`   ❌ Fout bij updaten:`, updateError.message)
        errors++
      } else {
        console.log(`   ✅ Geconverteerd naar base64`)
        converted++
      }

      // Longer delay to avoid database timeout (especially for large images)
      await new Promise(resolve => setTimeout(resolve, 200))

    } catch (error: any) {
      console.error(`   ❌ Fout:`, error.message)
      errors++
    }
  }

  console.log('\n📊 Conversie samenvatting:')
  console.log(`   Totaal foto's: ${allPhotos.length}`)
  console.log(`   Geconverteerd: ${converted}`)
  console.log(`   Al base64: ${alreadyBase64}`)
  console.log(`   Overgeslagen: ${skipped}`)
  console.log(`   Fouten: ${errors}`)
  
  if (errors === 0 && skipped === 0) {
    console.log('\n✅ Conversie succesvol voltooid!')
  } else {
    console.log(`\n⚠️  Conversie voltooid met ${errors} fouten en ${skipped} overgeslagen foto's`)
  }
}

// Run conversion
convertAllPhotosToBase64().catch((error) => {
  console.error('❌ Kritieke fout:', error)
  process.exit(1)
})

