# ⚡ Quick Deploy Guide - Plesk

## Snelle Stappen (5 minuten)

### 1. Build maken
```bash
npm run build
```

### 2. Bestanden uploaden naar server
Upload deze mappen naar je Plesk server:
- `.next/standalone/` → `/var/www/vhosts/jouw-domein.nl/httpdocs/`
- `public/` → `/var/www/vhosts/jouw-domein.nl/httpdocs/public/`
- `package.json` → `/var/www/vhosts/jouw-domein.nl/httpdocs/`

### 3. In Plesk: Node.js App aanmaken
1. Ga naar **Node.js** in Plesk
2. Klik **Add Node.js App**
3. **App root**: `/var/www/vhosts/jouw-domein.nl/httpdocs`
4. **Startup file**: `server.js`
5. **Node.js version**: 18.x of 20.x LTS

### 4. Environment Variables instellen
In Plesk Node.js app → Environment Variables:
```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SUPABASE_URL=https://emhidjqtxjnnrlgbbmyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
CLOUDINARY_CLOUD_NAME=dp9lcxbfu
CLOUDINARY_API_KEY=877964424671325
CLOUDINARY_API_SECRET=jEZWkfFP9CTxvcqHdbuBgaL9tS0
```

### 5. SSL Certificaat toevoegen
1. Ga naar **SSL/TLS Certificates**
2. Klik **Get a free certificate from Let's Encrypt**
3. Vul domain en email in
4. Installeer certificaat
5. Zet **Redirect HTTP to HTTPS** aan

### 6. DNS instellen
Bij je domain registrar:
- **A Record** `@` → [Server IP]
- **A Record** `www` → [Server IP]

### 7. App starten
In Plesk Node.js app → Klik **Start App**

### 8. Testen
Ga naar `https://jouw-domein.nl` en test alles!

---

## 📚 Volledige Guide
Zie `DEPLOYMENT-PLESK.md` voor uitgebreide instructies en troubleshooting.


