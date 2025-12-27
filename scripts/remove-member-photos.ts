/**
 * Script om alle foto's van een specifiek lid te verwijderen uit Supabase
 * 
 * Gebruik:
 * npx tsx scripts/remove-member-photos.ts "Ann van rijn"
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials niet gevonden')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function removeMemberPhotos(memberName: string) {
  console.log(`🗑️  Verwijderen van alle foto's voor "${memberName}"...\n`)

  // Haal eerst alle foto's op van dit lid
  const { data: photos, error: fetchError } = await supabase
    .from('portfolio_photos')
    .select('id, title, cloudinary_public_id')
    .eq('member_name', memberName)

  if (fetchError) {
    console.error('❌ Fout bij ophalen foto\'s:', fetchError.message)
    process.exit(1)
  }

  if (!photos || photos.length === 0) {
    console.log(`✅ Geen foto's gevonden voor "${memberName}"`)
    return
  }

  console.log(`📸 ${photos.length} foto's gevonden voor "${memberName}"\n`)

  // Verwijder alle foto's
  const { error: deleteError } = await supabase
    .from('portfolio_photos')
    .delete()
    .eq('member_name', memberName)

  if (deleteError) {
    console.error('❌ Fout bij verwijderen foto\'s:', deleteError.message)
    process.exit(1)
  }

  console.log('='.repeat(60))
  console.log('📊 Resultaten:')
  console.log(`  ✅ ${photos.length} foto's verwijderd voor "${memberName}"`)
  console.log('\n✨ Klaar!')
}

// Haal lid naam op van command line argument
const memberName = process.argv[2]

if (!memberName) {
  console.error('❌ Geef een lid naam op als argument')
  console.log('Gebruik: npx tsx scripts/remove-member-photos.ts "Ann van rijn"')
  process.exit(1)
}

removeMemberPhotos(memberName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })


