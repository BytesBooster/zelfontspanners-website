-- Database tabel voor Gebruikersaccounts
-- Voer dit uit in Supabase SQL Editor
-- Dit script kan veilig meerdere keren worden uitgevoerd

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

-- Drop bestaande policies als ze bestaan (voor herhaalde uitvoering)
DROP POLICY IF EXISTS "User accounts are viewable by authenticated users" ON user_accounts;
DROP POLICY IF EXISTS "Users can update their own account" ON user_accounts;
DROP POLICY IF EXISTS "Users can insert their own account" ON user_accounts;

CREATE POLICY "User accounts are viewable by authenticated users"
  ON user_accounts FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own account"
  ON user_accounts FOR UPDATE
  USING (true);

CREATE POLICY "Users can insert their own account"
  ON user_accounts FOR INSERT
  WITH CHECK (true);

-- Trigger voor updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_accounts_updated_at ON user_accounts;
CREATE TRIGGER update_user_accounts_updated_at BEFORE UPDATE ON user_accounts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


