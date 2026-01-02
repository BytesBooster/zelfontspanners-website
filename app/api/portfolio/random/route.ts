import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/portfolio/random?count=10 - Get random portfolio photos from all members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '10', 10)

    const supabase = getDbClient()

    // Get all portfolio photos from all members
    const { data: allPhotos, error: photosError } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .select('*')

    if (photosError) {
      return NextResponse.json({ error: photosError.message }, { status: 500 })
    }

    // Get all hidden photos
    const { data: hiddenPhotos, error: hiddenError } = await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .select('photo_src')

    const hiddenSrcs = new Set((hiddenPhotos || []).map((h: any) => h.photo_src))

    // Filter out hidden photos and extract photo data
    const visiblePhotos = (allPhotos || [])
      .map((p: any) => p.photo_data)
      .filter((photo: any) => {
        // Skip hidden photos
        if (hiddenSrcs.has(photo.src)) return false
        // Skip base64 images (user uploads) for hero slider
        if (photo.src && photo.src.startsWith('data:image')) return false
        return true
      })

    // Shuffle and take random photos
    const shuffled = [...visiblePhotos].sort(() => Math.random() - 0.5)
    const randomPhotos = shuffled.slice(0, Math.min(count, shuffled.length))

    return NextResponse.json({
      photos: randomPhotos
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

