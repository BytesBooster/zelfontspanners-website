/**
 * Script om photo_ids in likes en comments te migreren naar cloudinary_public_id
 * 
 * Dit script:
 * 1. Haalt alle portfolio foto's op uit Supabase
 * 2. Voor elke foto, zoekt naar likes/comments met oude photo_id (gegenereerd uit URL)
 * 3. Update deze naar de nieuwe photo_id (cloudinary_public_id)
 * 
 * Gebruik:
 * npx tsx scripts/migrate-photo-ids.ts
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

// Functie om photoId te genereren uit URL (zelfde als in lib/portfolio.ts)
function getPhotoId(photoSrc: string): string {
  if (!photoSrc) return ''
  
  if (photoSrc.startsWith('data:image')) {
    const hash = photoSrc.substring(0, 100).split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0)
    }, 0)
    return `base64_${Math.abs(hash)}`
  }
  
  let normalizedSrc = photoSrc
  try {
    if (photoSrc.includes('://')) {
      const url = new URL(photoSrc)
      normalizedSrc = url.pathname
    } else if (photoSrc.startsWith('//')) {
      normalizedSrc = photoSrc.substring(photoSrc.indexOf('/', 2))
    }
    normalizedSrc = normalizedSrc.replace(/^\/+/, '')
    normalizedSrc = normalizedSrc.split('?')[0].split('#')[0]
    normalizedSrc = normalizedSrc.replace(/\\/g, '/')
    normalizedSrc = normalizedSrc.replace(/\/+$/, '')
  } catch (e) {
    normalizedSrc = photoSrc.replace(/\\/g, '/').replace(/^\/+/, '').split('?')[0].split('#')[0]
  }
  
  return normalizedSrc.replace(/[^a-zA-Z0-9\/]/g, '_').replace(/\//g, '_')
}

// Functie om public_id te extraheren uit Cloudinary URL
function extractPublicIdFromUrl(url: string): string {
  try {
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v123/public_id.jpg
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const uploadIndex = pathParts.indexOf('upload')
    
    if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
      // Skip 'v123' versie nummer, neem alles daarna en verwijder extensie
      const publicId = pathParts.slice(uploadIndex + 2).join('/').replace(/\.[^/.]+$/, '')
      return publicId
    }
  } catch (e) {
    // Ignore
  }
  return ''
}

async function migratePhotoIds() {
  console.log('🔄 Start migratie van photo_ids naar cloudinary_public_id...\n')

  // Haal alle portfolio foto's op
  let allPhotos: any[] = []
  let from = 0
  const pageSize = 1000
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('portfolio_photos')
      .select('id, cloudinary_url, cloudinary_public_id')
      .range(from, from + pageSize - 1)

    if (error) {
      console.error('❌ Fout bij ophalen foto\'s:', error.message)
      break
    }

    if (data && data.length > 0) {
      allPhotos = allPhotos.concat(data)
      from += pageSize
      hasMore = data.length === pageSize
    } else {
      hasMore = false
    }
  }

  console.log(`📸 ${allPhotos.length} foto's gevonden\n`)

  // Maak een mapping van oude photo_ids naar nieuwe photo_ids
  // Door alle mogelijke oude formaten te proberen
  const photoIdMapping = new Map<string, string>()
  
  for (const photo of allPhotos) {
    if (!photo.cloudinary_public_id || !photo.cloudinary_url) {
      continue
    }

    const newPhotoId = photo.cloudinary_public_id
    const publicIdFromUrl = extractPublicIdFromUrl(photo.cloudinary_url)
    
    // Genereer verschillende mogelijke oude photo_ids
    const oldPhotoIdFromUrl = getPhotoId(photo.cloudinary_url)
    const publicIdNormalized = newPhotoId.replace(/\//g, '_')
    
    // Voeg alle mogelijke mappings toe
    if (oldPhotoIdFromUrl && oldPhotoIdFromUrl !== newPhotoId) {
      photoIdMapping.set(oldPhotoIdFromUrl, newPhotoId)
    }
    if (publicIdFromUrl && publicIdFromUrl !== newPhotoId) {
      photoIdMapping.set(publicIdFromUrl, newPhotoId)
    }
    if (publicIdNormalized && publicIdNormalized !== newPhotoId) {
      photoIdMapping.set(publicIdNormalized, newPhotoId)
    }
    
    // Voor Cloudinary URLs: extract het laatste deel (public_id) uit de oude photo_id
    // Bijvoorbeeld: "dp9lcxbfu_image_upload_v1766793638_zelfontspanners_portfolio_Hans_20Haarsma_u9fpjbcyqmx40s75zbvx_jpg"
    // Probeer te matchen met public_id: "zelfontspanners/portfolio/Hans Haarsma/u9fpjbcyqmx40s75zbvx"
    // Door te zoeken naar het laatste deel van de public_id in de oude photo_id
    const publicIdParts = newPhotoId.split('/')
    if (publicIdParts.length > 0) {
      const lastPart = publicIdParts[publicIdParts.length - 1]
      // Zoek naar photo_ids die eindigen met dit deel
      photoIdMapping.set(`*${lastPart}`, newPhotoId) // Gebruik wildcard voor matching
    }
  }

  console.log(`📋 ${photoIdMapping.size} mogelijke photo_id mappings gevonden\n`)

  // Haal alle unieke photo_ids op uit likes en comments
  const { data: allLikes } = await supabase
    .from('photo_likes')
    .select('photo_id')
    .limit(10000)

  const { data: allComments } = await supabase
    .from('photo_comments')
    .select('photo_id')
    .limit(10000)

  const uniquePhotoIds = new Set<string>()
  allLikes?.forEach(like => uniquePhotoIds.add(like.photo_id))
  allComments?.forEach(comment => uniquePhotoIds.add(comment.photo_id))

  console.log(`🔍 ${uniquePhotoIds.size} unieke photo_ids gevonden in likes/comments\n`)

  let likesMigrated = 0
  let commentsMigrated = 0
  let likesSkipped = 0
  let notFound = 0

  // Voor elke unieke photo_id, probeer de nieuwe photo_id te vinden
  for (const oldPhotoId of Array.from(uniquePhotoIds)) {
    let newPhotoId: string | undefined

    // Directe match
    if (photoIdMapping.has(oldPhotoId)) {
      newPhotoId = photoIdMapping.get(oldPhotoId)!
    } else {
      // Probeer wildcard matching (eindigt met laatste deel van public_id)
      for (const [key, value] of Array.from(photoIdMapping.entries())) {
        if (key.startsWith('*') && oldPhotoId.includes(key.substring(1))) {
          newPhotoId = value
          break
        }
      }
    }

    // Als geen match gevonden, probeer public_id te extraheren uit de oude photo_id
    if (!newPhotoId) {
      // Zoek naar foto's waarvan de public_id voorkomt in de oude photo_id
      for (const photo of allPhotos) {
        if (!photo.cloudinary_public_id) continue
        
        const publicIdParts = photo.cloudinary_public_id.split('/')
        const lastPart = publicIdParts[publicIdParts.length - 1]
        
        // Als de oude photo_id het laatste deel van de public_id bevat
        if (oldPhotoId.includes(lastPart)) {
          newPhotoId = photo.cloudinary_public_id
          break
        }
      }
    }

    if (!newPhotoId) {
      notFound++
      if (notFound <= 5) {
        console.log(`  ⚠️  Geen match gevonden voor: ${oldPhotoId.substring(0, 60)}...`)
      }
      continue
    }

    // Migreer likes
    const { data: likes, error: likesError } = await supabase
      .from('photo_likes')
      .select('id, user_name')
      .eq('photo_id', oldPhotoId)

    if (!likesError && likes && likes.length > 0) {
      // Check of er al likes zijn met nieuwe photoId
      const { data: existingLikes } = await supabase
        .from('photo_likes')
        .select('user_name')
        .eq('photo_id', newPhotoId)

      const existingUserNames = new Set((existingLikes || []).map(l => l.user_name))

      for (const like of likes) {
        // Skip als deze user al een like heeft met nieuwe photoId
        if (existingUserNames.has(like.user_name)) {
          likesSkipped++
          // Verwijder oude like
          await supabase
            .from('photo_likes')
            .delete()
            .eq('id', like.id)
          continue
        }

        // Update naar nieuwe photoId
        const { error: updateError } = await supabase
          .from('photo_likes')
          .update({ photo_id: newPhotoId })
          .eq('id', like.id)

        if (!updateError) {
          likesMigrated++
          if (likesMigrated <= 5) {
            console.log(`  ✅ Like gemigreerd: ${oldPhotoId.substring(0, 50)}... → ${newPhotoId}`)
          }
        }
      }
    }

    // Migreer comments
    const { data: comments, error: commentsError } = await supabase
      .from('photo_comments')
      .select('id')
      .eq('photo_id', oldPhotoId)

    if (!commentsError && comments && comments.length > 0) {
      for (const comment of comments) {
        const { error: updateError } = await supabase
          .from('photo_comments')
          .update({ photo_id: newPhotoId })
          .eq('id', comment.id)

        if (!updateError) {
          commentsMigrated++
          if (commentsMigrated <= 5) {
            console.log(`  ✅ Comment gemigreerd: ${oldPhotoId.substring(0, 50)}... → ${newPhotoId}`)
          }
        }
      }
    }
  }

  console.log('='.repeat(60))
  console.log('📊 Resultaten:')
  console.log(`  ✅ Likes gemigreerd: ${likesMigrated}`)
  console.log(`  ✅ Comments gemigreerd: ${commentsMigrated}`)
  console.log(`  ⏭️  Likes overgeslagen (al bestaand): ${likesSkipped}`)
  console.log('\n✨ Migratie voltooid!')
}

migratePhotoIds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

