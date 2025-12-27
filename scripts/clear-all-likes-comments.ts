import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials niet gevonden in .env.local')
  console.error('Zorg ervoor dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function clearAllLikesAndComments() {
  console.log('🗑️  Start verwijderen van alle likes en comments...\n')

  try {
    // Verwijder alle likes
    console.log('📊 Verwijderen van likes...')
    const { data: likesData, error: likesError } = await supabase
      .from('photo_likes')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all (using a condition that's always true)

    if (likesError) {
      console.error('❌ Fout bij verwijderen van likes:', likesError)
    } else {
      console.log('✅ Alle likes verwijderd')
    }

    // Verwijder alle comments
    console.log('💬 Verwijderen van comments...')
    const { data: commentsData, error: commentsError } = await supabase
      .from('photo_comments')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all (using a condition that's always true)

    if (commentsError) {
      console.error('❌ Fout bij verwijderen van comments:', commentsError)
    } else {
      console.log('✅ Alle comments verwijderd')
    }

    console.log('\n✨ Klaar! Alle likes en comments zijn verwijderd.')
    console.log('💡 De website is nu klaar om live te gaan!')

  } catch (error) {
    console.error('❌ Onverwachte fout:', error)
    process.exit(1)
  }
}

clearAllLikesAndComments()


