import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// GET /api/accounts - Get all accounts or specific account
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memberName = searchParams.get('memberName')

    const supabase = getDbClient()

    if (memberName) {
      // Get specific account
      const { data, error } = await supabase
        .from(TABLES.ACCOUNTS)
        .select('*')
        .eq('member_name', memberName)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ account: data || null })
    } else {
      // Get all accounts
      const { data, error } = await supabase
        .from(TABLES.ACCOUNTS)
        .select('*')

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ accounts: data || [] })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// POST /api/accounts - Create or update account
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, password, createdAt, updatedAt } = body

    if (!memberName || !password) {
      return NextResponse.json({ error: 'memberName and password are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Check if account exists
    const { data: existing } = await supabase
      .from(TABLES.ACCOUNTS)
      .select('*')
      .eq('member_name', memberName)
      .single()

    const accountData = {
      member_name: memberName,
      password,
      created_at: createdAt || new Date().toISOString(),
      updated_at: updatedAt || new Date().toISOString()
    }

    if (existing) {
      // Update existing account
      const { data, error } = await supabase
        .from(TABLES.ACCOUNTS)
        .update({
          password,
          updated_at: new Date().toISOString()
        })
        .eq('member_name', memberName)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ account: data, created: false })
    } else {
      // Create new account
      const { data, error } = await supabase
        .from(TABLES.ACCOUNTS)
        .insert([accountData])
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ account: data, created: true })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

// PUT /api/accounts - Update account password
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, password } = body

    if (!memberName || !password) {
      return NextResponse.json({ error: 'memberName and password are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    const { data, error } = await supabase
      .from(TABLES.ACCOUNTS)
      .update({
        password,
        updated_at: new Date().toISOString()
      })
      .eq('member_name', memberName)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ account: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

