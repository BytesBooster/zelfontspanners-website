-- Simpele SQL migratie voor portfolio's
-- Dit script moet handmatig worden aangepast met de data uit portfolio-data.js
-- 
-- Gebruik:
-- 1. Open portfolio-data.js
-- 2. Kopieer de STATIC_PORTFOLIO_DATA
-- 3. Gebruik dit script als template om INSERT statements te maken
--
-- OF gebruik het TypeScript migratiescript: scripts/migrate-portfolios-to-db.ts

-- Voorbeeld voor één member:
-- INSERT INTO portfolio_data (member_name, photo_data) VALUES
--   ('Member Naam', '{"src": "images/portfolio/member/foto1.jpg", "title": "Foto 1", "category": "all", "isUserUploaded": false}'),
--   ('Member Naam', '{"src": "images/portfolio/member/foto2.jpg", "title": "Foto 2", "category": "all", "isUserUploaded": false}');

-- INSERT INTO portfolio_order (member_name, photo_order) VALUES
--   ('Member Naam', '["images/portfolio/member/foto1.jpg", "images/portfolio/member/foto2.jpg"]');

-- Let op: Dit is alleen een template. Gebruik het TypeScript script voor automatische migratie.

