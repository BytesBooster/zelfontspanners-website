// Database client setup
// Supports Supabase (PostgreSQL) by default
// Can be extended for other databases

let dbClient: any = null

export function getDbClient() {
  if (dbClient) return dbClient

  // Check for Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = require('@supabase/supabase-js')
      dbClient = createClient(supabaseUrl, supabaseKey)
      return dbClient
    } catch (error: any) {
      console.error('[DB] Error creating Supabase client:', error.message)
      throw new Error(`Failed to initialize database client: ${error.message}`)
    }
  }

  // Check for direct PostgreSQL connection
  if (process.env.DATABASE_URL) {
    // You can use pg library here if needed
    // For now, we'll use Supabase client
    throw new Error('Direct PostgreSQL connection not yet implemented. Please use Supabase or set up environment variables.')
  }

  // Provide detailed error message
  const missingVars = []
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  
  const errorMsg = `Database configuration missing. Missing environment variables: ${missingVars.join(', ')}. Please set these in your .env.local file or server environment.`
  console.error('[DB]', errorMsg)
  throw new Error(errorMsg)
}

// Database table names
export const TABLES = {
  ACCOUNTS: 'accounts',
  PORTFOLIO_DATA: 'portfolio_data',
  PORTFOLIO_ORDER: 'portfolio_order',
  HIDDEN_PHOTOS: 'hidden_photos',
  PHOTO_LIKES: 'photo_likes',
  PHOTO_COMMENTS: 'photo_comments',
  AGENDA_EVENTS: 'agenda_events',
  FOTO_VAN_DE_MAAND: 'foto_van_de_maand',
  SESSIONS: 'sessions'
} as const


