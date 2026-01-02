-- Fix column names if tables already exist with wrong column names
-- This script renames columns from camelCase (with quotes) to snake_case

-- Photo likes table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_likes' AND column_name = 'photoId') THEN
    ALTER TABLE photo_likes RENAME COLUMN "photoId" TO photo_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_likes' AND column_name = 'memberName') THEN
    ALTER TABLE photo_likes RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_likes' AND column_name = 'createdAt') THEN
    ALTER TABLE photo_likes RENAME COLUMN "createdAt" TO created_at;
  END IF;
END $$;

-- Photo comments table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_comments' AND column_name = 'photoId') THEN
    ALTER TABLE photo_comments RENAME COLUMN "photoId" TO photo_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_comments' AND column_name = 'memberName') THEN
    ALTER TABLE photo_comments RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'photo_comments' AND column_name = 'createdAt') THEN
    ALTER TABLE photo_comments RENAME COLUMN "createdAt" TO created_at;
  END IF;
END $$;

-- Accounts table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'memberName') THEN
    ALTER TABLE accounts RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'createdAt') THEN
    ALTER TABLE accounts RENAME COLUMN "createdAt" TO created_at;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'updatedAt') THEN
    ALTER TABLE accounts RENAME COLUMN "updatedAt" TO updated_at;
  END IF;
END $$;

-- Portfolio data table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_data' AND column_name = 'memberName') THEN
    ALTER TABLE portfolio_data RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_data' AND column_name = 'photoData') THEN
    ALTER TABLE portfolio_data RENAME COLUMN "photoData" TO photo_data;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_data' AND column_name = 'createdAt') THEN
    ALTER TABLE portfolio_data RENAME COLUMN "createdAt" TO created_at;
  END IF;
END $$;

-- Portfolio order table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_order' AND column_name = 'memberName') THEN
    ALTER TABLE portfolio_order RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_order' AND column_name = 'photoOrder') THEN
    ALTER TABLE portfolio_order RENAME COLUMN "photoOrder" TO photo_order;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_order' AND column_name = 'updatedAt') THEN
    ALTER TABLE portfolio_order RENAME COLUMN "updatedAt" TO updated_at;
  END IF;
END $$;

-- Hidden photos table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hidden_photos' AND column_name = 'memberName') THEN
    ALTER TABLE hidden_photos RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hidden_photos' AND column_name = 'photoSrc') THEN
    ALTER TABLE hidden_photos RENAME COLUMN "photoSrc" TO photo_src;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hidden_photos' AND column_name = 'createdAt') THEN
    ALTER TABLE hidden_photos RENAME COLUMN "createdAt" TO created_at;
  END IF;
END $$;

-- Agenda events table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agenda_events' AND column_name = 'createdBy') THEN
    ALTER TABLE agenda_events RENAME COLUMN "createdBy" TO created_by;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agenda_events' AND column_name = 'createdAt') THEN
    ALTER TABLE agenda_events RENAME COLUMN "createdAt" TO created_at;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agenda_events' AND column_name = 'updatedAt') THEN
    ALTER TABLE agenda_events RENAME COLUMN "updatedAt" TO updated_at;
  END IF;
END $$;

-- Foto van de maand table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'memberName') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'imageSrc') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "imageSrc" TO image_src;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'createdAt') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "createdAt" TO created_at;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'excursionId') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "excursionId" TO excursion_id;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'excursionTitle') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "excursionTitle" TO excursion_title;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'excursionLocation') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "excursionLocation" TO excursion_location;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'foto_van_de_maand' AND column_name = 'excursionDate') THEN
    ALTER TABLE foto_van_de_maand RENAME COLUMN "excursionDate" TO excursion_date;
  END IF;
END $$;

-- Sessions table
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'memberName') THEN
    ALTER TABLE sessions RENAME COLUMN "memberName" TO member_name;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'expiresAt') THEN
    ALTER TABLE sessions RENAME COLUMN "expiresAt" TO expires_at;
  END IF;
END $$;

-- Recreate indexes with correct column names (old ones will be automatically dropped when columns are renamed)
CREATE INDEX IF NOT EXISTS idx_photo_likes_photo_id ON photo_likes(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_comments_photo_id ON photo_comments(photo_id);

