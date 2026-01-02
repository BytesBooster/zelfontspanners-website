import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// POST /api/accounts/login - Login and create session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, password } = body

    if (!memberName || !password) {
      return NextResponse.json({ error: 'memberName and password are required' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Get account
    const { data: account, error: accountError } = await supabase
      .from(TABLES.ACCOUNTS)
      .select('*')
      .eq('member_name', memberName)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ success: false, message: 'Gebruiker niet gevonden' }, { status: 401 })
    }

    // Check password
    if (account.password !== password) {
      return NextResponse.json({ success: false, message: 'Onjuist wachtwoord' }, { status: 401 })
    }

    // Create session
    const session = {
      member_name: memberName,
      timestamp: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }

    const { data: sessionData, error: sessionError } = await supabase
      .from(TABLES.SESSIONS)
      .insert([session])
      .select()
      .single()

    if (sessionError) {
      // If session table doesn't exist, return session token in response
      // Client can store it in memory/cookie
      return NextResponse.json({
        success: true,
        memberName: memberName,
        sessionToken: btoa(JSON.stringify(session)),
        requiresPasswordChange: account.password === 'test123' || account.password === 'welkom2026!'
      })
    }

    return NextResponse.json({
      success: true,
      memberName: memberName,
      sessionId: sessionData.id,
      requiresPasswordChange: account.password === 'test123' || account.password === 'welkom2026!'
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

