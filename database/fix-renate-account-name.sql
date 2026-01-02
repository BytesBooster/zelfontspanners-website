-- Fix mogelijke naam verschillen voor Renate van den Hoorn
-- Dit script controleert op verschillende variaties van de naam

-- Check alle mogelijke variaties
SELECT member_name, password, created_at
FROM accounts
WHERE LOWER(member_name) LIKE '%renate%'
   OR LOWER(member_name) LIKE '%hoorn%';

-- Als er een account is met een andere variatie, update het naar de juiste naam
UPDATE accounts
SET member_name = 'Renate van den Hoorn',
    password = 'Welkom2026!',
    password_reset_required = TRUE,
    updated_at = CURRENT_TIMESTAMP
WHERE LOWER(member_name) LIKE '%renate%'
  AND member_name != 'Renate van den Hoorn';

-- Maak het account aan als het helemaal niet bestaat
INSERT INTO accounts (member_name, password, created_at, updated_at, password_reset_required)
SELECT 'Renate van den Hoorn', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM accounts WHERE member_name = 'Renate van den Hoorn'
);

-- Verifieer het resultaat
SELECT 
    member_name,
    password,
    password_reset_required,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

