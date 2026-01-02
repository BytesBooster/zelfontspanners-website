-- Reset alle account wachtwoorden naar 'welkom2026!'
-- Dit script reset alle accounts in de database naar het standaard wachtwoord
-- 
-- BELANGRIJK: Zorg eerst dat de tabellen zijn aangemaakt met database/schema.sql

-- Controleer eerst of de tabel bestaat
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'accounts') THEN
    RAISE EXCEPTION 'Tabel "accounts" bestaat niet. Voer eerst database/schema.sql uit om de tabellen aan te maken.';
  END IF;
END $$;

-- Reset alle accounts naar 'welkom2026!'
UPDATE accounts 
SET 
  password = 'welkom2026!',
  updated_at = CURRENT_TIMESTAMP
WHERE password != 'welkom2026!';

-- Of reset naar een ander wachtwoord (pas aan indien nodig):
-- UPDATE accounts 
-- SET 
--   password = 'jouw-nieuwe-wachtwoord',
--   updated_at = CURRENT_TIMESTAMP;

-- Toon hoeveel accounts zijn gereset
SELECT 
  COUNT(*) as total_accounts,
  COUNT(CASE WHEN password = 'welkom2026!' THEN 1 END) as accounts_with_reset_password,
  COUNT(CASE WHEN password != 'welkom2026!' THEN 1 END) as accounts_with_other_password
FROM accounts;
