#!/usr/bin/env node
/**
 * Script to check if environment variables are set correctly
 * Run this on the server to diagnose database connection issues
 */

console.log('🔍 Checking environment variables...\n')

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
]

let allPresent = true

requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    // Mask the key for security
    const displayValue = varName.includes('KEY') 
      ? `${value.substring(0, 20)}...${value.substring(value.length - 10)}` 
      : value
    console.log(`✅ ${varName}: ${displayValue}`)
  } else {
    console.log(`❌ ${varName}: NOT SET`)
    allPresent = false
  }
})

console.log('')

if (allPresent) {
  console.log('✅ All required environment variables are set!')
  
  // Try to create a Supabase client to verify connection
  try {
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    console.log('✅ Supabase client created successfully')
    
    // Try a simple query
    supabase.from('accounts').select('count').limit(1)
      .then(({ error }) => {
        if (error) {
          console.log(`⚠️  Database connection test: ${error.message}`)
          console.log('   This might be normal if tables don\'t exist yet')
        } else {
          console.log('✅ Database connection test successful')
        }
      })
      .catch(err => {
        console.log(`⚠️  Database connection test failed: ${err.message}`)
      })
  } catch (error) {
    console.log(`❌ Failed to create Supabase client: ${error.message}`)
    console.log('   Make sure @supabase/supabase-js is installed: npm install @supabase/supabase-js')
  }
} else {
  console.log('❌ Some environment variables are missing!')
  console.log('\nTo fix this:')
  console.log('1. Create a .env.local file in the project root')
  console.log('2. Add the following:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key')
  console.log('3. Or set them in your server environment (PM2, systemd, etc.)')
  console.log('\nFor PM2, you can set them in ecosystem.config.js or use:')
  console.log('   pm2 restart zelfontspanners --update-env')
}

