-- Script om alle likes en comments te verwijderen uit Supabase
-- Kopieer en plak dit in de SQL Editor van Supabase

-- Verwijder alle likes
DELETE FROM photo_likes;

-- Verwijder alle comments (replies worden automatisch verwijderd door CASCADE of moeten eerst verwijderd worden)
DELETE FROM photo_comments;

-- Verifieer dat alles is verwijderd
SELECT COUNT(*) as remaining_likes FROM photo_likes;
SELECT COUNT(*) as remaining_comments FROM photo_comments;


