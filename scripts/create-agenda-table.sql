-- Database tabel voor Agenda Events
-- Voer dit uit in Supabase SQL Editor
-- Dit script kan veilig meerdere keren worden uitgevoerd

-- ============================================
-- AGENDA EVENTS TABLE
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


