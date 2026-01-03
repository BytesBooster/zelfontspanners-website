import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/portfolio/random?count=10 - Get random portfolio photos from all members
// Optimized to only fetch base64 photos (stored in database)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '10', 10)

    const supabase = getDbClient()

    // Get all hidden photos first (small query)
    const { data: hiddenPhotos, error: hiddenError } = await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .select('photo_src')

    const hiddenSrcs = new Set((hiddenPhotos || []).map((h: any) => h.photo_src))

    // Fetch portfolio photos in batches to avoid timeout
    // We'll filter for base64 images client-side since Supabase doesn't support JSONB path filtering well
    const batchSize = 500
    let allPhotos: any[] = []
    let offset = 0
    let hasMore = true

    while (hasMore && allPhotos.length < count * 3) { // Fetch 3x more than needed for randomization
      const { data: batch, error: photosError } = await supabase
        .from(TABLES.PORTFOLIO_DATA)
        .select('photo_data')
        .range(offset, offset + batchSize - 1)

      if (photosError) {
        console.error('[API] Error fetching portfolio photos:', photosError.message)
        break
      }

      if (!batch || batch.length === 0) {
        hasMore = false
        break
      }

      // Filter for base64 images only and exclude hidden photos
      const base64Photos = batch
        .map((p: any) => p.photo_data)
        .filter((photo: any) => {
          if (!photo || !photo.src) return false
          // Only include base64 images (from database)
          if (!photo.src.startsWith('data:image')) return false
          // Skip hidden photos
          if (hiddenSrcs.has(photo.src)) return false
          return true
        })

      allPhotos = allPhotos.concat(base64Photos)
      offset += batchSize
      hasMore = batch.length === batchSize

      // If we have enough photos, stop fetching
      if (allPhotos.length >= count * 2) {
        break
      }
    }

    // Shuffle and take random photos
    const shuffled = [...allPhotos].sort(() => Math.random() - 0.5)
    const randomPhotos = shuffled.slice(0, Math.min(count, shuffled.length))

    console.log(`[API] Returning ${randomPhotos.length} random base64 photos (from ${allPhotos.length} total base64 photos)`)

    return NextResponse.json({
      photos: randomPhotos
    })
  } catch (error: any) {
    console.error('[API] Error in /api/portfolio/random:', error)
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

