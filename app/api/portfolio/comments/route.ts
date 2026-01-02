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
      .eq('photoId', photoId)
      .order('createdAt', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const comments = (data || []).map((item: any) => ({
      id: item.id.toString(),
      user: item.memberName,
      text: item.comment,
      date: item.createdAt,
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
        photoId,
        memberName,
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
        user: data.memberName,
        text: data.comment,
        date: data.createdAt,
        replies: []
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

