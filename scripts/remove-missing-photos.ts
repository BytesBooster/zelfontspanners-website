/**
 * Script om foto's met lokale URLs te verwijderen uit Supabase
 * die niet meer bestaan op de server
 * 
 * Gebruik:
 * npx tsx scripts/remove-missing-photos.ts
 */

import { createClient } from '@supabase/supabase-js'
import { existsSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials niet gevonden')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function removeMissingPhotos() {
  console.log('🔍 Zoeken naar foto\'s met lokale URLs die niet meer bestaan...\n')

  // Haal alle foto's op met lokale URLs (geen http/https)
  const { data: allPhotos, error } = await supabase
    .from('portfolio_photos')
    .select('id, member_name, cloudinary_url, title')
    .not('cloudinary_url', 'like', 'http%')

  if (error) {
    console.error('❌ Fout bij ophalen foto\'s:', error.message)
    process.exit(1)
  }

  if (!allPhotos || allPhotos.length === 0) {
    console.log('✅ Geen foto\'s met lokale URLs gevonden!')
    return
  }

  console.log(`📸 ${allPhotos.length} foto's met lokale URLs gevonden\n`)

  let totalRemoved = 0
  let totalKept = 0
  const removed: string[] = []
  const kept: string[] = []

  for (const photo of allPhotos) {
    const url = photo.cloudinary_url
    // Verwijder leading slash en maak pad
    const localPath = join(process.cwd(), 'public', url.replace(/^\//, ''))

    if (!existsSync(localPath)) {
      // Bestand bestaat niet meer - verwijder uit Supabase
      const { error: deleteError } = await supabase
        .from('portfolio_photos')
        .delete()
        .eq('id', photo.id)

      if (deleteError) {
        console.error(`  ❌ Fout bij verwijderen ${photo.member_name}: "${photo.title}" - ${deleteError.message}`)
      } else {
        totalRemoved++
        removed.push(`${photo.member_name}: "${photo.title}"`)
        console.log(`  🗑️  Verwijderd: ${photo.member_name} - "${photo.title}"`)
      }
    } else {
      // Bestand bestaat nog - behoud
      totalKept++
      kept.push(`${photo.member_name}: "${photo.title}"`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Resultaten:')
  console.log(`  🗑️  Verwijderd: ${totalRemoved}`)
  console.log(`  ✅ Behouden: ${totalKept}`)

  if (removed.length > 0) {
    console.log('\n🗑️  Verwijderde foto\'s:')
    removed.forEach(item => console.log(`  - ${item}`))
  }

  if (kept.length > 0) {
    console.log('\n✅ Behouden foto\'s (bestaan nog op server):')
    kept.forEach(item => console.log(`  - ${item}`))
  }

  console.log('\n✨ Klaar!')
}

removeMissingPhotos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })



