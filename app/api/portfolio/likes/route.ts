import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/portfolio/likes?photoId=... - Get likes for a photo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get('photoId')

    if (!photoId) {
      return NextResponse.json({ error: 'photoId is required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.PHOTO_LIKES)
      .select('member_name')
      .eq('photo_id', photoId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const likes = (data || []).map((item: any) => item.member_name)
    return NextResponse.json({ likes })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/portfolio/likes - Toggle like
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { photoId, memberName } = body

    if (!photoId || !memberName) {
      return NextResponse.json({ error: 'photoId and memberName are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Check if already liked
    const { data: existing } = await supabase
      .from(TABLES.PHOTO_LIKES)
      .select('*')
      .eq('photo_id', photoId)
      .eq('member_name', memberName)
      .single()

    if (existing) {
      // Unlike
      const { error } = await supabase
        .from(TABLES.PHOTO_LIKES)
        .delete()
        .eq('photo_id', photoId)
        .eq('member_name', memberName)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, liked: false })
    } else {
      // Like
      const { error } = await supabase
        .from(TABLES.PHOTO_LIKES)
        .insert([{
          photo_id: photoId,
          member_name: memberName
        }])

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, liked: true })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

