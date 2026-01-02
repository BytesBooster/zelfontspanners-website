import { NextRequest, NextResponse } from 'next/server'
import { getDbClient, TABLES } from '@/lib/db'
import { getAllMembers } from '@/lib/members'

// POST /api/accounts/reset-password - Admin reset password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { memberName, adminPassword, newPassword } = body

    if (!adminPassword || !newPassword) {
      return NextResponse.json({ error: 'adminPassword and newPassword are required' }, { status: 400 })
    }

    // Verify admin password
    if (adminPassword !== 'welkom2026!') {
      return NextResponse.json({ success: false, message: 'Onjuist admin wachtwoord' }, { status: 401 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Nieuw wachtwoord moet minimaal 6 tekens lang zijn' }, { status: 400 })
    }

    const supabase = getDbClient()

    if (memberName) {
      // Reset single account
      const { data: account } = await supabase
        .from(TABLES.ACCOUNTS)
        .select('*')
        .eq('member_name', memberName)
        .single()

      if (!account) {
        return NextResponse.json({ success: false, message: 'Gebruiker niet gevonden' }, { status: 404 })
      }

      const { data, error } = await supabase
        .from(TABLES.ACCOUNTS)
        .update({
          password: newPassword,
          updated_at: new Date().toISOString()
        })
        .eq('member_name', memberName)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: `Wachtwoord voor ${memberName} succesvol gereset`, account: data })
    } else {
      // Reset all accounts
      const members = getAllMembers()
      let resetCount = 0
      let errors: string[] = []

      // Reset each account individually
      for (const member of members) {
        const { data: account } = await supabase
          .from(TABLES.ACCOUNTS)
          .select('*')
          .eq('member_name', member)
          .single()

        if (account) {
          // Account exists, update it
          const { error: updateError } = await supabase
            .from(TABLES.ACCOUNTS)
            .update({
              password: newPassword,
              updated_at: new Date().toISOString()
            })
            .eq('member_name', member)

          if (updateError) {
            errors.push(`${member}: ${updateError.message}`)
          } else {
            resetCount++
          }
        } else {
          // Account doesn't exist, create it
          const { error: createError } = await supabase
            .from(TABLES.ACCOUNTS)
            .insert([{
              member_name: member,
              password: newPassword,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }])

          if (createError) {
            errors.push(`${member}: ${createError.message}`)
          } else {
            resetCount++
          }
        }
      }

      if (errors.length > 0) {
        return NextResponse.json({
          success: resetCount > 0,
          message: `${resetCount} wachtwoorden gereset. Fouten: ${errors.join('; ')}`,
          count: resetCount
        })
      }

      return NextResponse.json({
        success: true,
        message: `${resetCount} wachtwoorden succesvol gereset`,
        count: resetCount
      })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 })
  }
}

