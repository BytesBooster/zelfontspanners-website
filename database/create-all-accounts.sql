-- Maak accounts aan voor alle leden met standaard wachtwoord 'welkom2026!'
-- Dit script maakt accounts aan voor alle leden die nog geen account hebben

-- Ledenlijst (uit lib/members.ts)
INSERT INTO accounts (member_name, password, created_at, updated_at)
VALUES
  ('albert van der Meij', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Anja Versteegen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ann van rijn', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ans Heisen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Astrid Kasteleijn', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Astrid Sanders', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bert van Zijderveld', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bianca Dekkers - van Uden', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Cocky Anderson', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Corrie Cobussen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Doris van de Laak', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Eva Veraa', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Frank van den Broek', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Gerhard Bod', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Hans Haarsma', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Hans van dfe Lest', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Helen Henskens', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Henk Regeling', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ine Janssen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Inge Pfeil', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jan Cobussen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jos de Vaan', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jos Verleg', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Karin Kalmar', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Karin Kruithof', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lize Dekkers', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Marlies Reimering', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Plony Bos', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Renate van den Hoorn', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rob Hendriks', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ron Cuppes', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ruud Cox', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Sandra van Kampen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Theo Dennissen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Tiemen Meertens', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ton Leideritz', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Willeke Buijssen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Tim Cobussen', 'welkom2026!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (member_name) DO NOTHING;

-- Toon hoeveel accounts zijn aangemaakt
SELECT 
  COUNT(*) as total_accounts,
  COUNT(CASE WHEN password = 'welkom2026!' THEN 1 END) as accounts_with_default_password
FROM accounts;


