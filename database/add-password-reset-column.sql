-- Voeg password_reset_required en is_admin kolommen toe aan accounts tabel
-- Dit script is veilig om meerdere keren uit te voeren

-- Voeg password_reset_required kolom toe (als deze nog niet bestaat)
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

-- Voeg is_admin kolom toe (als deze nog niet bestaat)
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

-- Update alle accounts met standaard wachtwoord om password_reset_required = TRUE te zetten
UPDATE accounts 
SET password_reset_required = TRUE
WHERE password IN ('welkom2026!', 'Welkom2026!', 'test123');

-- Verifieer de kolommen
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;


