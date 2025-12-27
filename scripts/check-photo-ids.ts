/**
 * Script om te controleren welke photo_ids er zijn in likes en comments
 * 
 * Gebruik:
 * npx tsx scripts/check-photo-ids.ts
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

async function checkPhotoIds() {
  console.log('🔍 Controleren van photo_ids in likes en comments...\n')

  // Haal alle likes op
  const { data: likes, error: likesError } = await supabase
    .from('photo_likes')
    .select('photo_id, user_name')
    .limit(20)

  if (likesError) {
    console.error('❌ Fout bij ophalen likes:', likesError.message)
  } else {
    console.log(`📊 Eerste ${likes?.length || 0} likes:`)
    likes?.forEach((like, index) => {
      console.log(`  ${index + 1}. photo_id: "${like.photo_id}" - user: ${like.user_name}`)
    })
  }

  console.log('\n')

  // Haal alle comments op
  const { data: comments, error: commentsError } = await supabase
    .from('photo_comments')
    .select('photo_id, user_name, text')
    .limit(20)

  if (commentsError) {
    console.error('❌ Fout bij ophalen comments:', commentsError.message)
  } else {
    console.log(`📊 Eerste ${comments?.length || 0} comments:`)
    comments?.forEach((comment, index) => {
      console.log(`  ${index + 1}. photo_id: "${comment.photo_id}" - user: ${comment.user_name} - text: "${comment.text.substring(0, 30)}..."`)
    })
  }

  console.log('\n')

  // Haal een paar portfolio foto's op om te zien welke public_ids er zijn
  const { data: photos, error: photosError } = await supabase
    .from('portfolio_photos')
    .select('cloudinary_url, cloudinary_public_id')
    .limit(5)

  if (photosError) {
    console.error('❌ Fout bij ophalen foto\'s:', photosError.message)
  } else {
    console.log(`📸 Voorbeelden van portfolio foto's:`)
    photos?.forEach((photo, index) => {
      console.log(`  ${index + 1}. URL: ${photo.cloudinary_url.substring(0, 60)}...`)
      console.log(`     Public ID: ${photo.cloudinary_public_id}`)
    })
  }
}

checkPhotoIds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })


