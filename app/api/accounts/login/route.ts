import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// POST /api/accounts/login - Simple and reliable login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, password } = body

    if (!memberName || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Naam en wachtwoord zijn verplicht' 
      }, { status: 400 })
    }

    const supabase = getDbClient()

    // Get account
    const { data: account, error: accountError } = await supabase
      .from(TABLES.ACCOUNTS)
      .select('*')
      .eq('member_name', memberName.trim())
      .single()

    if (accountError || !account) {
      return NextResponse.json({ 
        success: false, 
        message: 'Gebruiker niet gevonden' 
      }, { status: 401 })
    }

    // Simple password check - exact match (case-sensitive)
    const storedPassword = account.password?.trim() || ''
    const inputPassword = password.trim()
    
    if (storedPassword !== inputPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'Onjuist wachtwoord' 
      }, { status: 401 })
    }

    // Check if password change is required
    const defaultPasswords = ['test123', 'welkom2026!', 'Welkom2026!']
    const needsPasswordChange = account.password_reset_required === true || 
                                defaultPasswords.includes(storedPassword)

    return NextResponse.json({
      success: true,
      memberName: account.member_name,
      requiresPasswordChange: needsPasswordChange
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false,
      message: error.message || 'Er is een fout opgetreden bij het inloggen' 
    }, { status: 500 })
  }
}
