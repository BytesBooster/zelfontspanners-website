/**
 * Script om gebruikersaccounts naar Supabase te migreren
 * Voer uit met: npx tsx scripts/migrate-user-accounts.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
import { getAllMembers } from '../lib/members'

// Laad environment variables
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  dotenv.config()
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials niet gevonden!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
})

// Hash een wachtwoord met Web Crypto API (SHA-256)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

async function migrateUserAccounts() {
  console.log('🚀 Start migratie van gebruikersaccounts naar Supabase...\n')

  const members = getAllMembers()
  const defaultPassword = 'test123'
  const defaultPasswordHash = await hashPassword(defaultPassword)

  let createdCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const member of members) {
    try {
      // Check of account al bestaat
      const { data: existingAccount } = await supabase
        .from('user_accounts')
        .select('id')
        .eq('member_name', member)
        .single()

      if (existingAccount) {
        console.log(`⏭️  Overgeslagen: ${member} (al aanwezig)`)
        skippedCount++
        continue
      }

      // Maak nieuw account aan
      const { data, error } = await supabase
        .from('user_accounts')
        .insert([{
          member_name: member,
          password_hash: defaultPasswordHash,
          must_change_password: true // Verplicht wachtwoord wijzigen bij eerste login
        }])
        .select()
        .single()

      if (error) {
        console.error(`❌ Fout bij ${member}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Aangemaakt: ${member}`)
        createdCount++
      }
    } catch (error) {
      console.error(`❌ Fout bij ${member}:`, error)
      errorCount++
    }
  }

  console.log('\n============================================================')
  console.log(`📊 Resultaten:`)
  console.log(`✅ Aangemaakt: ${createdCount}`)
  console.log(`⏭️  Overgeslagen: ${skippedCount}`)
  console.log(`❌ Fouten: ${errorCount}`)
  console.log('============================================================')
  console.log('\n💡 Alle nieuwe accounts hebben standaard wachtwoord: test123')
  console.log('💡 Gebruikers moeten hun wachtwoord wijzigen bij eerste login')
}

// Voer het script uit
migrateUserAccounts()
  .then(() => {
    console.log('\n✨ Script voltooid!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script gefaald:', error)
    process.exit(1)
  })


