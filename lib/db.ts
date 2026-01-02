// Database client setup
// Supports Supabase (PostgreSQL) by default
// Can be extended for other databases

let dbClient: any = null

export function getDbClient() {
  if (dbClient) return dbClient

  // Check for Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js')
    dbClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    return dbClient
  }

  // Check for direct PostgreSQL connection
  if (process.env.DATABASE_URL) {
    // You can use pg library here if needed
    // For now, we'll use Supabase client
    throw new Error('Direct PostgreSQL connection not yet implemented. Please use Supabase or set up environment variables.')
  }

  throw new Error('No database configuration found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or DATABASE_URL')
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


