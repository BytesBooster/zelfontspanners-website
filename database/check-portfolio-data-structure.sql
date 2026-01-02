-- Script om te controleren welke portfolio data er is en hoe het is gestructureerd

-- Check welke tabellen er zijn die met portfolio te maken hebben
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name LIKE '%portfolio%' OR table_name LIKE '%photo%'
ORDER BY table_name, ordinal_position;

-- Check hoeveel portfolio data er is
SELECT 
    'portfolio_data' AS table_name,
    COUNT(*) AS row_count
FROM portfolio_data
UNION ALL
SELECT 
    'portfolio_order' AS table_name,
    COUNT(*) AS row_count
FROM portfolio_order
UNION ALL
SELECT 
    'hidden_photos' AS table_name,
    COUNT(*) AS row_count
FROM hidden_photos;

-- Check portfolio_photos als die bestaat (voer handmatig uit als tabel bestaat)
-- SELECT 
--     'portfolio_photos' AS table_name,
--     COUNT(*) AS row_count
-- FROM portfolio_photos;

-- Check portfolio_data structuur en data
SELECT 
    id,
    member_name,
    photo_data,
    created_at
FROM portfolio_data
LIMIT 5;

-- Check portfolio_photos als die bestaat (voer handmatig uit als tabel bestaat)
-- SELECT 
--     id,
--     member_name,
--     title,
--     image_url,
--     order_index,
--     created_at
-- FROM portfolio_photos
-- LIMIT 5;

-- Check welke members portfolio data hebben
SELECT DISTINCT member_name
FROM portfolio_data
ORDER BY member_name;

-- Check portfolio_photos members als die tabel bestaat (voer handmatig uit als tabel bestaat)
-- SELECT DISTINCT member_name
-- FROM portfolio_photos
-- ORDER BY member_name;

