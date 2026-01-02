-- Script om alle portfolio gerelateerde tabellen te vinden en te controleren

-- Check welke tabellen er zijn
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND (table_name LIKE '%portfolio%' OR table_name LIKE '%photo%')
ORDER BY table_name;

-- Check portfolio_data kolommen
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolio_data'
ORDER BY ordinal_position;

-- Check portfolio_photos kolommen (als die bestaat)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolio_photos'
ORDER BY ordinal_position
LIMIT 100;

-- Check hoeveel rijen er zijn in elke tabel
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

-- Check portfolio_photos als die bestaat
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'portfolio_photos') THEN
        RAISE NOTICE 'portfolio_photos tabel bestaat';
    ELSE
        RAISE NOTICE 'portfolio_photos tabel bestaat NIET';
    END IF;
END $$;

-- Check welke members portfolio data hebben in portfolio_data
SELECT 
    member_name,
    COUNT(*) AS photo_count
FROM portfolio_data
GROUP BY member_name
ORDER BY member_name
LIMIT 20;

-- Check welke members portfolio data hebben in portfolio_photos (als die bestaat)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'portfolio_photos') THEN
        PERFORM 1; -- Placeholder, we kunnen geen SELECT in DO block zonder result
    END IF;
END $$;

-- Als portfolio_photos bestaat, voer dit handmatig uit:
-- SELECT 
--     member_name,
--     COUNT(*) AS photo_count
-- FROM portfolio_photos
-- GROUP BY member_name
-- ORDER BY member_name
-- LIMIT 20;

