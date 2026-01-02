#!/bin/bash
# Wrapper script om environment variables te laden voordat Next.js server start

cd /var/www/vhosts/zelfontspanners.nl/nodejs

# Load .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Export environment variables (fallback als .env niet bestaat)
export NODE_ENV=production
export PORT=3001
export NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-'https://emhidjqtxjnnrlgbbmyi.supabase.co'}
export NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtaGlkanF0eGpubnJsZ2JibXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk4MzMsImV4cCI6MjA4MjM1NTgzM30.XwlTaxrcJzF6W4iJgMG09lfM636fsChKWJYLBlbJ-Ds'}

# Start Next.js server
exec node .next/standalone/server.js

