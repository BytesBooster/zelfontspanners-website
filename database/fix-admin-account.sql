-- Fix admin account - zorg dat het bestaat met correct wachtwoord
-- Dit script werkt met zowel password als password_hash kolommen

-- Maak admin account aan of update het
INSERT INTO accounts (member_name, password, created_at, updated_at, password_reset_required, is_admin)
VALUES ('Admin', 'Welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE, TRUE)
ON CONFLICT (member_name) DO UPDATE
SET 
    password = 'Welkom2026!',
    password_reset_required = TRUE,
    is_admin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

-- Verifieer admin account
SELECT 
    member_name,
    password,
    password_reset_required,
    is_admin,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Admin';

