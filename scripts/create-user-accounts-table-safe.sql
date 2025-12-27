-- Database tabel voor Gebruikersaccounts (veilige versie zonder DROP statements)
-- Voer dit uit in Supabase SQL Editor
-- Gebruik deze versie als je het script voor het eerst uitvoert

-- ============================================
-- USER ACCOUNTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_name TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  must_change_password BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_password_change TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_user_accounts_member_name ON user_accounts(member_name);

-- RLS Policies voor user_accounts
ALTER TABLE user_accounts ENABLE ROW LEVEL SECURITY;

-- Maak alleen policies aan als ze nog niet bestaan
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_accounts' 
    AND policyname = 'User accounts are viewable by authenticated users'
  ) THEN
    CREATE POLICY "User accounts are viewable by authenticated users"
      ON user_accounts FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_accounts' 
    AND policyname = 'Users can update their own account'
  ) THEN
    CREATE POLICY "Users can update their own account"
      ON user_accounts FOR UPDATE
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_accounts' 
    AND policyname = 'Users can insert their own account'
  ) THEN
    CREATE POLICY "Users can insert their own account"
      ON user_accounts FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger voor updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Maak alleen trigger aan als deze nog niet bestaat
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_user_accounts_updated_at'
  ) THEN
    CREATE TRIGGER update_user_accounts_updated_at BEFORE UPDATE ON user_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;


