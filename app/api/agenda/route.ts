import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/agenda - Get all events
export async function GET(request: NextRequest) {
  try {
    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.AGENDA_EVENTS)
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const events = (data || []).map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      date: item.date,
      time: item.time,
      location: item.location,
      description: item.description,
      icon: item.icon,
      createdBy: item.createdBy,
      createdAt: item.createdAt
    }))

    // Filter out test event
    const filteredEvents = events.filter((event: any) => {
      return !(event.title === 'test' && event.date === '2026-07-21')
    })

    return NextResponse.json({ events: filteredEvents })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/agenda - Create event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, date, time, location, description, icon, createdBy } = body

    if (!title || !date || !createdBy) {
      return NextResponse.json({ error: 'title, date and createdBy are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.AGENDA_EVENTS)
      .insert([{
        title,
        date,
        time: time || null,
        location: location || null,
        description: description || null,
        icon: icon || null,
        createdBy
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      event: {
        id: data.id.toString(),
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        description: data.description,
        icon: data.icon,
        createdBy: data.createdBy,
        createdAt: data.createdAt
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// PUT /api/agenda - Update event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, date, time, location, description, icon } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const updateData: any = {
      updatedAt: new Date().toISOString()
    }

    if (title !== undefined) updateData.title = title
    if (date !== undefined) updateData.date = date
    if (time !== undefined) updateData.time = time
    if (location !== undefined) updateData.location = location
    if (description !== undefined) updateData.description = description
    if (icon !== undefined) updateData.icon = icon

    const { data, error } = await supabase
      .from(TABLES.AGENDA_EVENTS)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, event: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// DELETE /api/agenda?id=... - Delete event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { error } = await supabase
      .from(TABLES.AGENDA_EVENTS)
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}


