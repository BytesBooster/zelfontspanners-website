-- Database tabellen voor Likes, Comments en Foto van de Maand
-- Voer dit uit in Supabase SQL Editor

-- ============================================
-- 1. PHOTO LIKES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS photo_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(photo_id, user_name)
);

CREATE INDEX IF NOT EXISTS idx_photo_likes_photo_id ON photo_likes(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_likes_user_name ON photo_likes(user_name);

-- RLS Policies voor photo_likes
ALTER TABLE photo_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photo likes are viewable by everyone"
  ON photo_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert likes"
  ON photo_likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own likes"
  ON photo_likes FOR DELETE
  USING (true);

-- ============================================
-- 2. PHOTO COMMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS photo_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES photo_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_photo_comments_photo_id ON photo_comments(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_comments_parent_id ON photo_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_photo_comments_user_name ON photo_comments(user_name);

-- RLS Policies voor photo_comments
ALTER TABLE photo_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photo comments are viewable by everyone"
  ON photo_comments FOR SELECT
  USING (true);

CREATE POLICY "Users can insert comments"
  ON photo_comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own comments"
  ON photo_comments FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own comments"
  ON photo_comments FOR DELETE
  USING (true);

-- ============================================
-- 3. FOTO VAN DE MAAND SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS foto_van_de_maand_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month_key TEXT NOT NULL,
  photographer TEXT NOT NULL,
  title TEXT NOT NULL,
  cloudinary_url TEXT NOT NULL,
  cloudinary_public_id TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  excursion_id TEXT,
  excursion_title TEXT,
  excursion_location TEXT,
  excursion_date TEXT
);

CREATE INDEX IF NOT EXISTS idx_foto_submissions_month_key ON foto_van_de_maand_submissions(month_key);
CREATE INDEX IF NOT EXISTS idx_foto_submissions_photographer ON foto_van_de_maand_submissions(photographer);
CREATE INDEX IF NOT EXISTS idx_foto_submissions_upload_date ON foto_van_de_maand_submissions(upload_date);

-- RLS Policies voor foto_van_de_maand_submissions
ALTER TABLE foto_van_de_maand_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Foto submissions are viewable by everyone"
  ON foto_van_de_maand_submissions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert foto submissions"
  ON foto_van_de_maand_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own foto submissions"
  ON foto_van_de_maand_submissions FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own foto submissions"
  ON foto_van_de_maand_submissions FOR DELETE
  USING (true);

-- ============================================
-- 4. FOTO VAN DE MAAND VOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS foto_van_de_maand_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES foto_van_de_maand_submissions(id) ON DELETE CASCADE,
  voter_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(submission_id, voter_name)
);

CREATE INDEX IF NOT EXISTS idx_foto_votes_submission_id ON foto_van_de_maand_votes(submission_id);
CREATE INDEX IF NOT EXISTS idx_foto_votes_voter_name ON foto_van_de_maand_votes(voter_name);

-- RLS Policies voor foto_van_de_maand_votes
ALTER TABLE foto_van_de_maand_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Foto votes are viewable by everyone"
  ON foto_van_de_maand_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert votes"
  ON foto_van_de_maand_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own votes"
  ON foto_van_de_maand_votes FOR DELETE
  USING (true);

-- ============================================
-- 5. AGENDA EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS agenda_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  description TEXT,
  icon TEXT DEFAULT '📅',
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agenda_events_date ON agenda_events(date);
CREATE INDEX IF NOT EXISTS idx_agenda_events_created_by ON agenda_events(created_by);

-- RLS Policies voor agenda_events
ALTER TABLE agenda_events ENABLE ROW LEVEL SECURITY;

-- Drop bestaande policies als ze bestaan (voor herhaalde uitvoering)
DROP POLICY IF EXISTS "Agenda events are viewable by everyone" ON agenda_events;
DROP POLICY IF EXISTS "Users can insert agenda events" ON agenda_events;
DROP POLICY IF EXISTS "Users can update their own agenda events" ON agenda_events;
DROP POLICY IF EXISTS "Users can delete their own agenda events" ON agenda_events;

CREATE POLICY "Agenda events are viewable by everyone"
  ON agenda_events FOR SELECT
  USING (true);

CREATE POLICY "Users can insert agenda events"
  ON agenda_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own agenda events"
  ON agenda_events FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own agenda events"
  ON agenda_events FOR DELETE
  USING (true);

-- Trigger voor updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_agenda_events_updated_at ON agenda_events;
CREATE TRIGGER update_agenda_events_updated_at BEFORE UPDATE ON agenda_events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

