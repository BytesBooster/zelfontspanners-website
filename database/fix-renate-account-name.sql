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
    updated_at = CURRENT_TIMESTAMP
WHERE LOWER(member_name) LIKE '%renate%'
  AND member_name != 'Renate van den Hoorn';

-- Update password_reset_required als kolom bestaat
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'accounts' AND column_name = 'password_reset_required'
    ) THEN
        UPDATE accounts
        SET password_reset_required = TRUE
        WHERE member_name = 'Renate van den Hoorn';
    END IF;
END $$;

-- Maak het account aan als het helemaal niet bestaat
INSERT INTO accounts (member_name, password, created_at, updated_at)
SELECT 'Renate van den Hoorn', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM accounts WHERE member_name = 'Renate van den Hoorn'
);

-- Update password_reset_required voor nieuw aangemaakt account (als kolom bestaat)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'accounts' AND column_name = 'password_reset_required'
    ) THEN
        UPDATE accounts
        SET password_reset_required = TRUE
        WHERE member_name = 'Renate van den Hoorn';
    END IF;
END $$;

-- Verifieer het resultaat
SELECT 
    member_name,
    password,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

