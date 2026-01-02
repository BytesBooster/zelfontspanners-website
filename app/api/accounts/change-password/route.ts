import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'

// POST /api/accounts/change-password - Change user password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, oldPassword, newPassword } = body

    if (!memberName || !oldPassword || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn' }, { status: 400 })
    }

    if (newPassword === oldPassword) {
      return NextResponse.json({ error: 'Nieuw wachtwoord moet verschillen van het huidige wachtwoord' }, { status: 400 })
    }

    const supabase = getDbClient()

    // Get account
    const { data: account, error: accountError } = await supabase
      .from(TABLES.ACCOUNTS)
      .select('*')
      .eq('member_name', memberName)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ success: false, message: 'Gebruiker niet gevonden' }, { status: 404 })
    }

    // Verify old password
    if (account.password !== oldPassword) {
      return NextResponse.json({ success: false, message: 'Huidig wachtwoord is onjuist' }, { status: 401 })
    }

    // Update password and clear password_reset_required flag
    const { data, error } = await supabase
      .from(TABLES.ACCOUNTS)
      .update({
        password: newPassword,
        password_reset_required: false,
        updated_at: new Date().toISOString()
      })
      .eq('member_name', memberName)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Wachtwoord succesvol gewijzigd', account: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

