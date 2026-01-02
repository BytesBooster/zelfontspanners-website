module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/vhosts/zelfontspanners.nl/nodejs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001, // Gebruik een andere poort dan bytesbooster (3000)
        // Supabase Configuratie
        NEXT_PUBLIC_SUPABASE_URL: 'https://emhidjqtxjnnrlgbbmyi.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds',
        // Cloudinary Configuratie (optioneel, maar staat in .env.local)
        CLOUDINARY_CLOUD_NAME: 'dp9lcxbfu',
        CLOUDINARY_API_KEY: '877964424671325',
        CLOUDINARY_API_SECRET: 'jEZWkfFP9CTxvcqHdbuBgaL9tS0',
      },
      error_file: '/var/www/vhosts/zelfontspanners.nl/logs/pm2-error.log',
      out_file: '/var/www/vhosts/zelfontspanners.nl/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
    },
  ],
}
