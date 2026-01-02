-- Verifieer en fix accounts tabel voor nieuwe login systeem
-- Dit script controleert of alle benodigde kolommen bestaan en voegt ze toe als ze ontbreken

-- 1. Check huidige structuur
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;

-- 2. Voeg password_reset_required kolom toe (als deze nog niet bestaat)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'accounts' AND column_name = 'password_reset_required'
    ) THEN
        ALTER TABLE accounts ADD COLUMN password_reset_required BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Kolom password_reset_required toegevoegd';
    ELSE
        RAISE NOTICE 'Kolom password_reset_required bestaat al';
    END IF;
END $$;

-- 3. Voeg is_admin kolom toe (als deze nog niet bestaat)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'accounts' AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE accounts ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Kolom is_admin toegevoegd';
    ELSE
        RAISE NOTICE 'Kolom is_admin bestaat al';
    END IF;
END $$;

-- 4. Verwijder oude password_hash kolom (als deze bestaat en niet gebruikt wordt)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'accounts' AND column_name = 'password_hash'
    ) THEN
        -- Check eerst of er data in staat die niet in password kolom staat
        IF EXISTS (
            SELECT 1 FROM accounts 
            WHERE password_hash IS NOT NULL 
            AND password_hash != '' 
            AND (password IS NULL OR password = '')
        ) THEN
            RAISE NOTICE 'WAARSCHUWING: password_hash kolom bevat data die niet in password kolom staat. Verwijder handmatig na verificatie.';
        ELSE
            ALTER TABLE accounts DROP COLUMN password_hash;
            RAISE NOTICE 'Kolom password_hash verwijderd (niet meer nodig)';
        END IF;
    ELSE
        RAISE NOTICE 'Kolom password_hash bestaat niet (goed)';
    END IF;
END $$;

-- 5. Update alle accounts met standaard wachtwoord om password_reset_required = TRUE te zetten
UPDATE accounts 
SET password_reset_required = TRUE
WHERE password IN ('welkom2026!', 'Welkom2026!', 'test123')
AND (password_reset_required IS NULL OR password_reset_required = FALSE);

-- 6. Zet Admin account is_admin = TRUE
UPDATE accounts 
SET is_admin = TRUE
WHERE member_name = 'Admin'
AND (is_admin IS NULL OR is_admin = FALSE);

-- 7. Verifieer eindresultaat
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;

-- 8. Toon overzicht van accounts met status
SELECT 
    member_name,
    CASE 
        WHEN password IN ('welkom2026!', 'Welkom2026!', 'test123') THEN 'Default password'
        ELSE 'Custom password'
    END AS password_status,
    password_reset_required,
    is_admin,
    created_at,
    updated_at
FROM accounts
ORDER BY member_name;

-- 9. Statistieken
SELECT 
    COUNT(*) AS total_accounts,
    COUNT(CASE WHEN password_reset_required = TRUE THEN 1 END) AS needs_password_reset,
    COUNT(CASE WHEN is_admin = TRUE THEN 1 END) AS admin_accounts,
    COUNT(CASE WHEN password IN ('welkom2026!', 'Welkom2026!', 'test123') THEN 1 END) AS default_passwords
FROM accounts;


