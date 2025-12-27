# 🚀 Migratie Statische Foto's - Snelle Start

## Optie 1: Via Web Interface

1. **Start server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - `http://localhost:3000/migrate` 
   - OF `http://localhost:3000/admin/migrate`

3. **Klik op "Start Migratie"**

## Optie 2: Via API Direct (Als pagina niet werkt)

Open in browser of gebruik curl:

```bash
# Browser
http://localhost:3000/api/migrate-static-photos

# Of met curl (POST request)
curl -X POST http://localhost:3000/api/migrate-static-photos
```

## Optie 3: Via TypeScript Script

```bash
npx tsx scripts/migrate-static-photos.ts
```

---

## Troubleshooting

### 404 Error op /migrate

**Oplossing:**
1. Stop server (Ctrl+C)
2. Wis cache: `Remove-Item -Recurse -Force .next`
3. Start opnieuw: `npm run dev`
4. Wacht 15 seconden
5. Probeer opnieuw

### API geeft error

**Controleer:**
- Supabase credentials in `.env.local`
- Database tabel `portfolio_photos` bestaat
- `portfolio-data.js` bestaat in `public/` folder

---

**Probeer eerst Optie 2 (API direct) als de pagina niet werkt!**



