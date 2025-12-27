-- Verificatie query om te controleren of alle tabellen zijn aangemaakt
-- Voer dit uit in Supabase SQL Editor om te controleren

-- Check of alle tabellen bestaan
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN (
    'photo_likes',
    'photo_comments',
    'foto_van_de_maand_submissions',
    'foto_van_de_maand_votes',
    'portfolio_photos'
  )
ORDER BY table_name;

-- Check RLS (Row Level Security) status
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'photo_likes',
    'photo_comments',
    'foto_van_de_maand_submissions',
    'foto_van_de_maand_votes',
    'portfolio_photos'
  )
ORDER BY tablename;


