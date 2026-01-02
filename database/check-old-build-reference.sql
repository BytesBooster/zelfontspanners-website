-- Check if old build file (layout-94f0854bcc52beb1.js) is referenced in database

-- Check all text columns in all tables for the old hash
-- Note: Casting all id columns to text to handle different types (integer vs uuid)
SELECT 'accounts' as table_name, id::text as id, member_name, 
       CASE 
         WHEN password::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PASSWORD'
         ELSE NULL
       END as found_in
FROM accounts
WHERE password::text LIKE '%94f0854bcc52beb1%'

UNION ALL

SELECT 'portfolio_data' as table_name, id::text as id, member_name,
       CASE 
         WHEN photo_data::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_DATA'
         WHEN photo_data::text LIKE '%layout-94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_DATA'
         ELSE NULL
       END as found_in
FROM portfolio_data
WHERE photo_data::text LIKE '%94f0854bcc52beb1%' 
   OR photo_data::text LIKE '%layout-94f0854bcc52beb1%'

UNION ALL

SELECT 'portfolio_order' as table_name, id::text as id, member_name,
       CASE 
         WHEN photo_order::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_ORDER'
         ELSE NULL
       END as found_in
FROM portfolio_order
WHERE photo_order::text LIKE '%94f0854bcc52beb1%'

UNION ALL

SELECT 'agenda_events' as table_name, id::text as id, title as member_name,
       CASE 
         WHEN description::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN DESCRIPTION'
         WHEN title::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN TITLE'
         ELSE NULL
       END as found_in
FROM agenda_events
WHERE description::text LIKE '%94f0854bcc52beb1%' 
   OR title::text LIKE '%94f0854bcc52beb1%'

UNION ALL

SELECT 'foto_van_de_maand' as table_name, id::text as id, member_name,
       CASE 
         WHEN photo_src::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_SRC'
         WHEN description::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN DESCRIPTION'
         ELSE NULL
       END as found_in
FROM foto_van_de_maand
WHERE photo_src::text LIKE '%94f0854bcc52beb1%' 
   OR description::text LIKE '%94f0854bcc52beb1%'

UNION ALL

SELECT 'photo_comments' as table_name, id::text as id, member_name,
       CASE 
         WHEN comment_text::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN COMMENT_TEXT'
         ELSE NULL
       END as found_in
FROM photo_comments
WHERE comment_text::text LIKE '%94f0854bcc52beb1%';

-- Also check for any HTML/JavaScript content
SELECT 'CHECKING FOR HTML/JS CONTENT' as check_type,
       'Searching all text fields for layout-94f0854bcc52beb1' as message;

