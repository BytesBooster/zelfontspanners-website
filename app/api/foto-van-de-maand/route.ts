import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/foto-van-de-maand?month=...&year=... - Get submissions for a month
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const year = searchParams.get('year')

    if (!month || !year) {
      return NextResponse.json({ error: 'month and year are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.FOTO_VAN_DE_MAAND)
      .select('*')
      .eq('month', parseInt(month))
      .eq('year', parseInt(year))

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const submissions = (data || []).map((item: any) => ({
      id: item.id.toString(),
      photographer: item.memberName,
      title: item.title,
      imageSrc: item.imageSrc,
      votes: item.votes || [],
      uploadDate: item.createdAt,
      excursionId: item.excursionId || null,
      excursionTitle: item.excursionTitle || null,
      excursionLocation: item.excursionLocation || null,
      excursionDate: item.excursionDate || null
    }))

    // Find winner (most votes)
    let winner = null
    if (submissions.length > 0) {
      const sortedByVotes = [...submissions].sort((a, b) => b.votes.length - a.votes.length)
      if (sortedByVotes[0].votes.length > 0) {
        winner = sortedByVotes[0]
      }
    }

    return NextResponse.json({
      submissions,
      winner
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/foto-van-de-maand - Add submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, imageSrc, title, month, year, excursionId, excursionTitle, excursionLocation, excursionDate } = body

    if (!memberName || !imageSrc || !month || !year) {
      return NextResponse.json({ error: 'memberName, imageSrc, month and year are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Check if user already has 5 submissions for this month
    const { data: existing } = await supabase
      .from(TABLES.FOTO_VAN_DE_MAAND)
      .select('*')
      .eq('memberName', memberName)
      .eq('month', month)
      .eq('year', year)

    if (existing && existing.length >= 5) {
      return NextResponse.json({ error: 'Maximum 5 foto\'s per maand toegestaan' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from(TABLES.FOTO_VAN_DE_MAAND)
      .insert([{
        memberName,
        imageSrc,
        title: title || null,
        month: parseInt(month),
        year: parseInt(year),
        votes: [],
        excursionId: excursionId || null,
        excursionTitle: excursionTitle || null,
        excursionLocation: excursionLocation || null,
        excursionDate: excursionDate || null
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, submission: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/foto-van-de-maand/vote - Vote for a photo
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionId, memberName } = body

    if (!submissionId || !memberName) {
      return NextResponse.json({ error: 'submissionId and memberName are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Get submission
    const { data: submission, error: fetchError } = await supabase
      .from(TABLES.FOTO_VAN_DE_MAAND)
      .select('*')
      .eq('id', submissionId)
      .single()

    if (fetchError || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    const votes = submission.votes || []
    const hasVoted = votes.includes(memberName)

    let newVotes
    if (hasVoted) {
      // Remove vote
      newVotes = votes.filter((v: string) => v !== memberName)
    } else {
      // Add vote
      newVotes = [...votes, memberName]
    }

    const { data, error } = await supabase
      .from(TABLES.FOTO_VAN_DE_MAAND)
      .update({ votes: newVotes })
      .eq('id', submissionId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, submission: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

