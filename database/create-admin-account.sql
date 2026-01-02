-- Maak admin account aan
-- Dit account heeft speciale admin rechten

-- Maak admin account aan (als het nog niet bestaat)
INSERT INTO accounts (member_name, password, created_at, updated_at, password_reset_required, is_admin)
VALUES ('Admin', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, TRUE)
ON CONFLICT (member_name) DO UPDATE
SET 
    password = 'Welkom2026!',
    password_reset_required = TRUE,
    is_admin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

-- Verifieer dat het admin account bestaat
SELECT 
    member_name,
    password,
    password_reset_required,
    is_admin,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Admin' OR is_admin = TRUE;

-- Toon alle admin accounts
SELECT 
    member_name,
    is_admin,
    password_reset_required
FROM accounts
WHERE is_admin = TRUE;


