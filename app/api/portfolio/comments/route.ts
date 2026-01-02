import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/portfolio/comments?photoId=... - Get comments for a photo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get('photoId')

    if (!photoId) {
      return NextResponse.json({ error: 'photoId is required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.PHOTO_COMMENTS)
      .select('*')
      .eq('photo_id', photoId)
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const comments = (data || []).map((item: any) => ({
      id: item.id.toString(),
      user: item.member_name,
      text: item.comment,
      date: item.created_at,
      replies: []
    }))

    return NextResponse.json({ comments })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/portfolio/comments - Add comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { photoId, memberName, comment } = body

    if (!photoId || !memberName || !comment) {
      return NextResponse.json({ error: 'photoId, memberName and comment are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.PHOTO_COMMENTS)
      .insert([{
        photo_id: photoId,
        member_name: memberName,
        comment: comment.trim()
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      comment: {
        id: data.id.toString(),
        user: data.member_name,
        text: data.comment,
        date: data.created_at,
        replies: []
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

