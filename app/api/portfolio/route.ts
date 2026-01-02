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
      .eq('memberName', memberName)

    if (photosError) {
      return NextResponse.json({ error: photosError.message }, { status: 500 })
    }

    // Get portfolio order
    const { data: orderData, error: orderError } = await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .select('photoOrder')
      .eq('memberName', memberName)
      .single()

    // Get hidden photos
    const { data: hiddenPhotos, error: hiddenError } = await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .select('photoSrc')
      .eq('memberName', memberName)

    const photoOrder = orderData?.photoOrder || []
    const hiddenSrcs = (hiddenPhotos || []).map((h: any) => h.photoSrc)

    // Filter out hidden photos and sort by order
    const visiblePhotos = (photos || [])
      .map((p: any) => p.photoData)
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
        memberName,
        photoData: photo
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update order
    const { data: orderData } = await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .select('photoOrder')
      .eq('memberName', memberName)
      .single()

    const currentOrder = orderData?.photoOrder || []
    currentOrder.push(photo.src)

    await supabase
      .from(TABLES.PORTFOLIO_ORDER)
      .upsert({
        memberName,
        photoOrder: currentOrder,
        updatedAt: new Date().toISOString()
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
          memberName,
          photoOrder,
          updatedAt: new Date().toISOString()
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
          memberName,
          photoSrc
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
        .eq('memberName', memberName)
        .eq('photoSrc', photoSrc)

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
      .eq('memberName', memberName)
      .contains('photoData', { src: photoSrc })

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Hide photo (mark as hidden)
    await supabase
      .from(TABLES.HIDDEN_PHOTOS)
      .insert([{
        memberName,
        photoSrc
      }])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

