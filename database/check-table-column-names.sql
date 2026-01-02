-- Script om te controleren of kolomnamen kloppen (camelCase vs snake_case)
-- Supabase gebruikt snake_case, maar de API gebruikt mogelijk camelCase

-- Check portfolio_data kolommen
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolio_data'
ORDER BY ordinal_position;

-- Check portfolio_order kolommen
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolio_order'
ORDER BY ordinal_position;

-- Check hidden_photos kolommen
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'hidden_photos'
ORDER BY ordinal_position;

-- Check member_accounts kolommen (voor referentie)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'member_accounts'
ORDER BY ordinal_position;

