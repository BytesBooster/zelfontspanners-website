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
import https from 'https'
import http from 'http'

// BELANGRIJK: Dit script download ALLE foto's van de live server
// Geen lokale bestanden worden gebruikt - alles komt uit de database en wordt naar base64 geconverteerd

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

// Function to download image from URL and convert to base64
function downloadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`))
        return
      }

      const chunks: Buffer[] = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const base64 = buffer.toString('base64')
        const contentType = response.headers['content-type'] || 'image/jpeg'
        const dataUrl = `data:${contentType};base64,${base64}`
        resolve(dataUrl)
      })
    }).on('error', reject)
  })
}

// Deze functie wordt niet meer gebruikt - we downloaden alles van de live server

// Function to read local file and convert to base64
function readLocalFileAsBase64(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File not found: ${filePath}`))
        return
      }

      const buffer = fs.readFileSync(filePath)
      const base64 = buffer.toString('base64')
      const ext = path.extname(filePath).toLowerCase()
      const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
      }
      const contentType = mimeTypes[ext] || 'image/jpeg'
      const dataUrl = `data:${contentType};base64,${base64}`
      resolve(dataUrl)
    } catch (error: any) {
      reject(error)
    }
  })
}

// Function to convert image path to base64 - probeer eerst server, dan lokaal
async function convertImageToBase64(src: string): Promise<string | null> {
  try {
    // If already base64, return as is
    if (src.startsWith('data:image')) {
      return src
    }

    // If it's a full URL, download it
    if (src.startsWith('http://') || src.startsWith('https://')) {
      console.log(`   📥 Downloading from URL: ${src}`)
      return await downloadImageAsBase64(src)
    }

    // For relative paths, probeer eerst server, dan lokaal
    let filePath = src
    
    // Remove leading slash if present
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1)
    }

    // Probeer eerst van live server
    const liveServerUrl = `https://zelfontspanners.nl/${filePath}`
    console.log(`   🌐 Probeer live server: ${liveServerUrl}`)
    try {
      return await downloadImageAsBase64(liveServerUrl)
    } catch (error: any) {
      console.log(`   ⚠️  Server 404, probeer lokaal...`)
      
      // Als server faalt, probeer lokaal bestand
      const localPath = path.join(process.cwd(), 'public', filePath)
      if (fs.existsSync(localPath)) {
        console.log(`   📁 Gevonden lokaal: ${localPath}`)
        try {
          return await readLocalFileAsBase64(localPath)
        } catch (localError: any) {
          console.log(`   ❌ Kon lokaal bestand niet lezen: ${localError.message}`)
          return null
        }
      } else {
        console.log(`   ❌ Bestand niet gevonden (noch server, noch lokaal): ${filePath}`)
        return null
      }
    }
  } catch (error: any) {
    console.error(`   ❌ Fout bij converteren image ${src}:`, error.message)
    return null
  }
}

async function convertAllPhotosToBase64() {
  console.log('🚀 Start conversie van foto\'s naar base64...\n')

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
      const base64Src = await convertImageToBase64(src)

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

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100))

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

