-- Script om alle ontbrekende accounts aan te maken
-- Dit maakt alleen accounts aan die nog niet bestaan

INSERT INTO accounts (member_name, password, created_at, updated_at, password_reset_required)
SELECT 
    member_name,
    'Welkom2026!',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    TRUE
FROM (
    SELECT unnest(ARRAY[
        'albert van der Meij',
        'Anja Versteegen',
        'Ann van rijn',
        'Anne-Marie Dennissen',
        'Ans Heisen',
        'Astrid Kasteleijn',
        'Astrid Sanders',
        'Bert van Zijderveld',
        'Bianca Dekkers - van Uden',
        'Cocky Anderson',
        'Corrie Cobussen',
        'Doris van de Laak',
        'Eva Veraa',
        'Frank van den Broek',
        'Gerhard Bod',
        'Hans Haarsma',
        'Hans van dfe Lest',
        'Helen Henskens',
        'Henk Regeling',
        'Ine Janssen',
        'Inge Pfeil',
        'Jan Cobussen',
        'Jos de Vaan',
        'Jos Verleg',
        'Karin Kalmar',
        'Karin Kruithof',
        'Lize Dekkers',
        'Marlies Reimering',
        'Plony Bos',
        'Renate van den Hoorn',
        'Rob Hendriks',
        'Ron Cuppes',
        'Ruud Cox',
        'Sandra van Kampen',
        'Theo Dennissen',
        'Tiemen Meertens',
        'Ton Leideritz',
        'Willeke Buijssen',
        'Tim Cobussen'
    ]) AS member_name
) AS all_members
WHERE NOT EXISTS (
    SELECT 1 FROM accounts WHERE accounts.member_name = all_members.member_name
)
ON CONFLICT (member_name) DO NOTHING;

-- Verifieer resultaat
SELECT 
    COUNT(*) AS total_accounts,
    COUNT(CASE WHEN password_reset_required = TRUE THEN 1 END) AS accounts_needing_password_reset,
    COUNT(CASE WHEN password = 'Welkom2026!' THEN 1 END) AS accounts_with_default_password
FROM accounts;

