/**
 * Script om de titels van Agenda 2026 evenementen bij te werken
 * Verwijdert "Evenement" uit de titel
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

async function updateAgendaTitles() {
  console.log('🔄 Start bijwerken van agenda titels...\n')

  try {
    // Haal alle evenementen op uit 2026
    const { data: events, error: fetchError } = await supabase
      .from('agenda_events')
      .select('*')
      .gte('date', '2026-01-01')
      .lt('date', '2027-01-01')

    if (fetchError) {
      console.error('❌ Fout bij ophalen evenementen:', fetchError)
      return
    }

    if (!events || events.length === 0) {
      console.log('⚠️ Geen evenementen gevonden voor 2026')
      return
    }

    let updatedCount = 0

    for (const event of events) {
      // Verwijder " Evenement" uit de titel als het erin staat
      const newTitle = event.title.replace(' Evenement', '').trim()
      
      if (newTitle !== event.title) {
        const { error: updateError } = await supabase
          .from('agenda_events')
          .update({ title: newTitle })
          .eq('id', event.id)

        if (updateError) {
          console.error(`❌ Fout bij updaten ${event.title}:`, updateError)
        } else {
          console.log(`✅ Bijgewerkt: "${event.title}" → "${newTitle}"`)
          updatedCount++
        }
      }
    }

    console.log('\n============================================================')
    console.log(`📊 Resultaten:`)
    console.log(`✅ Bijgewerkt: ${updatedCount} evenementen`)
    console.log('============================================================')
  } catch (error) {
    console.error('❌ Script gefaald:', error)
  }
}

// Voer het script uit
updateAgendaTitles()
  .then(() => {
    console.log('\n✨ Script voltooid!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script gefaald:', error)
    process.exit(1)
  })


