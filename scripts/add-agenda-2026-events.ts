/**
 * Script om de Agenda 2026 evenementen toe te voegen aan Supabase
 * Voer uit met: npx tsx scripts/add-agenda-2026-events.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

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
  console.error('❌ Supabase credentials niet gevonden in environment variables!')
  console.error('Zorg ervoor dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld in .env.local')
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

async function addAgendaEvent(event: {
  title: string
  date: string
  time?: string | null
  location?: string | null
  description?: string | null
  icon?: string
  created_by: string
}) {
  try {
    const { data, error } = await supabase
      .from('agenda_events')
      .insert([event])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error adding agenda event:', error)
    return null
  }
}

const agenda2026Events = [
  { date: '2026-01-25', title: 'Agenda Evenement', month: 'Januari' },
  { date: '2026-02-15', title: 'Agenda Evenement', month: 'Februari' },
  { date: '2026-03-22', title: 'Agenda Evenement', month: 'Maart' },
  { date: '2026-04-12', title: 'Agenda Evenement', month: 'April' },
  { date: '2026-05-31', title: 'Agenda Evenement', month: 'Mei' },
  { date: '2026-06-28', title: 'Agenda Evenement', month: 'Juni' },
  { date: '2026-07-26', title: 'Agenda Evenement', month: 'Juli' },
  { date: '2026-08-23', title: 'Agenda Evenement', month: 'Augustus' },
  { date: '2026-09-27', title: 'Agenda Evenement', month: 'September' },
  { date: '2026-10-25', title: 'Agenda Evenement', month: 'Oktober' },
  { date: '2026-11-22', title: 'Agenda Evenement', month: 'November' },
  { date: '2026-12-13', title: 'Agenda Evenement', month: 'December' },
]

async function addAgenda2026Events() {
  console.log('🚀 Start toevoegen van Agenda 2026 evenementen...\n')

  let successCount = 0
  let errorCount = 0

  for (const event of agenda2026Events) {
    try {
      const result = await addAgendaEvent({
        title: `${event.month} Evenement`,
        date: event.date,
        time: null,
        location: null,
        description: `Agenda evenement op ${event.date}`,
        icon: '📅',
        created_by: 'System'
      })

      if (result) {
        console.log(`✅ Toegevoegd: ${event.month} (${event.date})`)
        successCount++
      } else {
        console.log(`❌ Fout bij: ${event.month} (${event.date})`)
        errorCount++
      }
    } catch (error) {
      console.error(`❌ Fout bij ${event.month} (${event.date}):`, error)
      errorCount++
    }
  }

  console.log('\n============================================================')
  console.log(`📊 Resultaten:`)
  console.log(`✅ Succesvol toegevoegd: ${successCount}`)
  console.log(`❌ Fouten: ${errorCount}`)
  console.log('============================================================')
}

// Voer het script uit
addAgenda2026Events()
  .then(() => {
    console.log('\n✨ Script voltooid!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script gefaald:', error)
    process.exit(1)
  })

