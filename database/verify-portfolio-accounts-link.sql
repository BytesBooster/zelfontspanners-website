-- Script om te verifiëren dat alle accounts gekoppeld zijn aan portfolios
-- Controleert of er portfolio data is voor elk account

-- Check welke accounts portfolio data hebben
SELECT 
    a.member_name,
    a.password_reset_required,
    a.is_admin,
    COUNT(p.id) AS photo_count,
    CASE 
        WHEN COUNT(p.id) > 0 THEN 'Heeft portfolio'
        ELSE 'Geen portfolio data'
    END AS portfolio_status
FROM accounts a
LEFT JOIN portfolio_data p ON a.member_name = p.member_name
GROUP BY a.member_name, a.password_reset_required, a.is_admin
ORDER BY 
    CASE WHEN a.is_admin = TRUE THEN 0 ELSE 1 END,
    a.member_name;

-- Overzicht: hoeveel accounts hebben portfolio data?
SELECT 
    COUNT(DISTINCT a.member_name) AS total_accounts,
    COUNT(DISTINCT p.member_name) AS accounts_with_portfolio,
    COUNT(DISTINCT a.member_name) - COUNT(DISTINCT p.member_name) AS accounts_without_portfolio,
    COUNT(p.id) AS total_photos
FROM accounts a
LEFT JOIN portfolio_data p ON a.member_name = p.member_name;

-- Accounts zonder portfolio data (maar met account)
SELECT 
    a.member_name,
    a.created_at AS account_created,
    'Geen portfolio data gevonden' AS status
FROM accounts a
LEFT JOIN portfolio_data p ON a.member_name = p.member_name
WHERE p.id IS NULL
ORDER BY a.member_name;

