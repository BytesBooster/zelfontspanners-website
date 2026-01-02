-- Check en maak account aan voor Renate van den Hoorn
-- Dit script controleert of het account bestaat en maakt het aan als het niet bestaat

-- Eerst controleren of het account bestaat
SELECT 
    member_name,
    password,
    created_at,
    updated_at,
    password_reset_required
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

-- Als het account niet bestaat, maak het aan
INSERT INTO accounts (member_name, password, created_at, updated_at, password_reset_required)
VALUES ('Renate van den Hoorn', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE)
ON CONFLICT (member_name) DO UPDATE
SET 
    password = 'Welkom2026!',
    password_reset_required = TRUE,
    updated_at = CURRENT_TIMESTAMP;

-- Verifieer dat het account nu bestaat
SELECT 
    member_name,
    password,
    password_reset_required,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Renate van den Hoorn';

