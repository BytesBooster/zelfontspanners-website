import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/portfolio?memberName=... - Get portfolio data for a member
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memberName = searchParams.get('memberName')

    if (!memberName) {
      return NextResponse.json({ error: 'memberName is required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Get portfolio photos
    const { data: photos, error: photosError } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .select('*')
      .eq('member_name', memberName)

    if (photosError) {
      return NextResponse.json({ error: photosError.message }, { status: 500 })
    }

    // Get portfolio order
    const { data: orderData, error: orderError } = await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .select('photo_order')
      .eq('member_name', memberName)
      .single()

    // Get hidden photos
    const { data: hiddenPhotos, error: hiddenError } = await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .select('photo_src')
      .eq('member_name', memberName)

    const photoOrder = orderData?.photo_order || []
    const hiddenSrcs = (hiddenPhotos || []).map((h: any) => h.photo_src)

    // Filter out hidden photos and sort by order
    const visiblePhotos = (photos || [])
      .map((p: any) => p.photo_data)
      .filter((photo: any) => !hiddenSrcs.includes(photo.src))

    const orderedPhotos = photoOrder
      .map((src: string) => visiblePhotos.find((p: any) => p.src === src))
      .filter(Boolean)
      .concat(visiblePhotos.filter((p: any) => !photoOrder.includes(p.src)))

    return NextResponse.json({
      name: memberName,
      photos: orderedPhotos
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/portfolio - Add portfolio photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, photo } = body

    if (!memberName || !photo) {
      return NextResponse.json({ error: 'memberName and photo are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .insert([{
        member_name: memberName,
        photo_data: photo
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update order
    const { data: orderData } = await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .select('photo_order')
      .eq('member_name', memberName)
      .single()

    const currentOrder = orderData?.photo_order || []
    currentOrder.push(photo.src)

    await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .upsert({
        member_name: memberName,
        photo_order: currentOrder,
        updated_at: new Date().toISOString()
      })

    return NextResponse.json({ success: true, photo: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// PUT /api/portfolio - Update portfolio order or hide photo
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, action, photoSrc, photoOrder } = body

    if (!memberName || !action) {
      return NextResponse.json({ error: 'memberName and action are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    if (action === 'updateOrder' && photoOrder) {
      const { error } = await supabase
        .from(TABLES.PORTFOLIO_ORDER)
        .upsert({
          member_name: memberName,
          photo_order: photoOrder,
          updated_at: new Date().toISOString()
        })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'hidePhoto' && photoSrc) {
      const { error } = await supabase
        .from(TABLES.HIDDEN_PHOTOS)
        .insert([{
          member_name: memberName,
          photo_src: photoSrc
        }])

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'unhidePhoto' && photoSrc) {
      const { error } = await supabase
        .from(TABLES.HIDDEN_PHOTOS)
        .delete()
        .eq('member_name', memberName)
        .eq('photo_src', photoSrc)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// DELETE /api/portfolio - Delete portfolio photo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memberName = searchParams.get('memberName')
    const photoSrc = searchParams.get('photoSrc')

    if (!memberName || !photoSrc) {
      return NextResponse.json({ error: 'memberName and photoSrc are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Delete from portfolio_data
    const { error: deleteError } = await supabase
      .from(TABLES.PORTFOLIO_DATA)
      .delete()
      .eq('member_name', memberName)
      .contains('photo_data', { src: photoSrc })

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Hide photo (mark as hidden)
    await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .insert([{
        member_name: memberName,
        photo_src: photoSrc
      }])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

