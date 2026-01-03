-- Check hoe portfolio foto's zijn opgeslagen in de database
-- Dit helpt te begrijpen of ze base64 zijn of file paths

-- Check eerste 10 portfolio entries
SELECT 
    member_name,
    photo_data->>'src' as photo_src,
    CASE 
        WHEN photo_data->>'src' LIKE 'data:image%' THEN 'base64'
        WHEN photo_data->>'src' LIKE 'http%' THEN 'full_url'
        WHEN photo_data->>'src' LIKE 'images/%' THEN 'relative_path'
        ELSE 'other'
    END as photo_type,
    LENGTH(photo_data->>'src') as src_length
FROM portfolio_data
ORDER BY created_at DESC
LIMIT 10;

-- Count per type
SELECT 
    CASE 
        WHEN photo_data->>'src' LIKE 'data:image%' THEN 'base64'
        WHEN photo_data->>'src' LIKE 'http%' THEN 'full_url'
        WHEN photo_data->>'src' LIKE 'images/%' THEN 'relative_path'
        ELSE 'other'
    END as photo_type,
    COUNT(*) as count
FROM portfolio_data
GROUP BY photo_type;

