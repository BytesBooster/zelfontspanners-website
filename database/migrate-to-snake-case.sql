-- Migration script to convert existing tables from camelCase to snake_case
-- Run this if you already have tables with camelCase column names

-- Drop existing tables if they exist (WARNING: This will delete all data!)
-- Only run this if you want to start fresh or have backed up your data

-- DROP TABLE IF EXISTS photo_comments CASCADE;
-- DROP TABLE IF EXISTS photo_likes CASCADE;
-- DROP TABLE IF EXISTS hidden_photos CASCADE;
-- DROP TABLE IF EXISTS portfolio_order CASCADE;
-- DROP TABLE IF EXISTS portfolio_data CASCADE;
-- DROP TABLE IF EXISTS foto_van_de_maand CASCADE;
-- DROP TABLE IF EXISTS agenda_events CASCADE;
-- DROP TABLE IF EXISTS sessions CASCADE;
-- DROP TABLE IF EXISTS accounts CASCADE;

-- Then run the schema.sql file to create tables with snake_case columns

-- OR: If you want to keep existing data, rename columns:
-- ALTER TABLE photo_likes RENAME COLUMN "photoId" TO photo_id;
-- ALTER TABLE photo_likes RENAME COLUMN "memberName" TO member_name;
-- ALTER TABLE photo_likes RENAME COLUMN "createdAt" TO created_at;
-- etc.


