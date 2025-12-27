-- Database tabel voor Agenda Events (veilige versie zonder DROP statements)
-- Voer dit uit in Supabase SQL Editor
-- Gebruik deze versie als je het script voor het eerst uitvoert

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

-- Maak alleen policies aan als ze nog niet bestaan
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_events' 
    AND policyname = 'Agenda events are viewable by everyone'
  ) THEN
    CREATE POLICY "Agenda events are viewable by everyone"
      ON agenda_events FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_events' 
    AND policyname = 'Users can insert agenda events'
  ) THEN
    CREATE POLICY "Users can insert agenda events"
      ON agenda_events FOR INSERT
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_events' 
    AND policyname = 'Users can update their own agenda events'
  ) THEN
    CREATE POLICY "Users can update their own agenda events"
      ON agenda_events FOR UPDATE
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_events' 
    AND policyname = 'Users can delete their own agenda events'
  ) THEN
    CREATE POLICY "Users can delete their own agenda events"
      ON agenda_events FOR DELETE
      USING (true);
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
    WHERE tgname = 'update_agenda_events_updated_at'
  ) THEN
    CREATE TRIGGER update_agenda_events_updated_at BEFORE UPDATE ON agenda_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;


