-- Script om Anne-Marie Dennissen volledig te verwijderen uit de database
-- Dit verwijdert alle data gerelateerd aan deze gebruiker

-- Verwijder portfolio data
DELETE FROM portfolio_data WHERE member_name = 'Anne-Marie Dennissen';

-- Verwijder portfolio order
DELETE FROM portfolio_order WHERE member_name = 'Anne-Marie Dennissen';

-- Verwijder hidden photos
DELETE FROM hidden_photos WHERE member_name = 'Anne-Marie Dennissen';

-- Verwijder photo likes (als gebruiker likes heeft gegeven)
DELETE FROM photo_likes WHERE user_name = 'Anne-Marie Dennissen';

-- Verwijder photo comments (als gebruiker comments heeft geplaatst)
DELETE FROM photo_comments WHERE user_name = 'Anne-Marie Dennissen';

-- Verwijder sessions
DELETE FROM sessions WHERE member_name = 'Anne-Marie Dennissen';

-- Verwijder account (laatste, omdat andere tabellen mogelijk foreign keys hebben)
DELETE FROM accounts WHERE member_name = 'Anne-Marie Dennissen';

-- Verifieer verwijdering
SELECT 
    'accounts' AS tabel,
    COUNT(*) AS aantal_records
FROM accounts 
WHERE member_name = 'Anne-Marie Dennissen'
UNION ALL
SELECT 
    'portfolio_data' AS tabel,
    COUNT(*) AS aantal_records
FROM portfolio_data 
WHERE member_name = 'Anne-Marie Dennissen'
UNION ALL
SELECT 
    'portfolio_order' AS tabel,
    COUNT(*) AS aantal_records
FROM portfolio_order 
WHERE member_name = 'Anne-Marie Dennissen'
UNION ALL
SELECT 
    'hidden_photos' AS tabel,
    COUNT(*) AS aantal_records
FROM hidden_photos 
WHERE member_name = 'Anne-Marie Dennissen';

-- Als alle counts 0 zijn, is de gebruiker volledig verwijderd

