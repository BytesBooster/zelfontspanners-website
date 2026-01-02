-- Check en maak account aan voor Renate van den Hoorn
-- Dit script controleert of het account bestaat en maakt het aan als het niet bestaat

-- Eerst controleren of het account bestaat
SELECT 
    member_name,
    password,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

-- Als het account niet bestaat, maak het aan
INSERT INTO accounts (member_name, password, created_at, updated_at)
VALUES ('Renate van den Hoorn', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (member_name) DO UPDATE
SET 
    password = 'Welkom2026!',
    updated_at = CURRENT_TIMESTAMP;

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

-- Verifieer dat het account nu bestaat
SELECT 
    member_name,
    password,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

