#!/bin/bash
# Check if old build file is referenced in Supabase database

echo "🔍 Checking database for old build file references..."
echo ""

# Check if we can connect to Supabase
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  Supabase environment variables not set"
    echo "   Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    exit 1
fi

echo "Running SQL query to check for old build references..."
echo ""

# Note: This requires Supabase CLI or direct database access
# For now, provide instructions to run the SQL manually

cat << 'EOF'
Run this SQL query in Supabase SQL Editor:

SELECT 'accounts' as table_name, id, member_name, 
       CASE 
         WHEN password::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PASSWORD'
         ELSE NULL
       END as found_in
FROM accounts
WHERE password::text LIKE '%94f0854bcc52beb1%'

UNION ALL

SELECT 'portfolio_data' as table_name, id, member_name,
       CASE 
         WHEN photo_data::text LIKE '%94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_DATA'
         WHEN photo_data::text LIKE '%layout-94f0854bcc52beb1%' THEN 'FOUND IN PHOTO_DATA'
         ELSE NULL
       END as found_in
FROM portfolio_data
WHERE photo_data::text LIKE '%94f0854bcc52beb1%' 
   OR photo_data::text LIKE '%layout-94f0854bcc52beb1%';

If this returns NO ROWS, then the database is clean.
If it returns rows, those need to be cleaned.

EOF

echo ""
echo "Alternatively, check manually in Supabase dashboard:"
echo "1. Go to Supabase dashboard"
echo "2. Open SQL Editor"
echo "3. Run the query from database/check-old-build-reference.sql"
echo "4. Check if any rows are returned"

