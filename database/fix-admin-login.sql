-- FIX ADMIN LOGIN - Zorg dat Admin account bestaat en werkt
-- Voer dit uit in Supabase SQL Editor

-- 1. Verwijder oude Admin accounts (als er meerdere zijn)
DELETE FROM accounts WHERE member_name = 'Admin' AND id NOT IN (
  SELECT MIN(id) FROM accounts WHERE member_name = 'Admin'
);

-- 2. Maak Admin account aan of update het met CORRECT wachtwoord
INSERT INTO accounts (member_name, password, password_reset_required, is_admin, created_at, updated_at)
VALUES ('Admin', 'Welkom2026!', TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (member_name) DO UPDATE
SET 
    password = 'Welkom2026!',
    password_reset_required = TRUE,
    is_admin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

-- 3. Verifieer Admin account
SELECT 
    member_name,
    password,
    password_reset_required,
    is_admin,
    created_at,
    updated_at
FROM accounts
WHERE member_name = 'Admin';

-- 4. Test query - controleer of login zou werken
SELECT 
    member_name,
    CASE 
        WHEN password = 'Welkom2026!' THEN '✅ Password klopt'
        WHEN password = 'welkom2026!' THEN '⚠️ Password is lowercase (moet Welkom2026! zijn)'
        ELSE '❌ Password klopt NIET'
    END AS password_status,
    password_reset_required,
    is_admin
FROM accounts
WHERE member_name = 'Admin';


