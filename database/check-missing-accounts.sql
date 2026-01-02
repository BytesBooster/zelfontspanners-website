-- Script om te controleren welke accounts missen
-- Vergelijkt de ledenlijst met de accounts in de database

-- Lijst van alle leden (uit lib/members.ts)
WITH expected_members AS (
    SELECT unnest(ARRAY[
        'albert van der Meij',
        'Anja Versteegen',
        'Ann van rijn',
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
),
existing_accounts AS (
    SELECT member_name FROM accounts
)
SELECT 
    em.member_name AS missing_member,
    'MISSING' AS status
FROM expected_members em
LEFT JOIN existing_accounts ea ON em.member_name = ea.member_name
WHERE ea.member_name IS NULL

UNION ALL

SELECT 
    ea.member_name AS extra_account,
    'EXTRA (niet in ledenlijst)' AS status
FROM existing_accounts ea
LEFT JOIN expected_members em ON ea.member_name = em.member_name
WHERE em.member_name IS NULL

ORDER BY status, missing_member;

-- Overzicht: totaal aantal accounts vs verwacht aantal
WITH expected_members AS (
    SELECT unnest(ARRAY[
        'albert van der Meij',
        'Anja Versteegen',
        'Ann van rijn',
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
)
SELECT 
    (SELECT COUNT(*) FROM expected_members) AS expected_count,
    (SELECT COUNT(*) FROM accounts) AS actual_count,
    (SELECT COUNT(*) FROM expected_members) - (SELECT COUNT(*) FROM accounts) AS missing_count;

-- Toon alle bestaande accounts
SELECT 
    member_name,
    password,
    password_reset_required,
    is_admin,
    created_at,
    updated_at
FROM accounts
ORDER BY member_name;

