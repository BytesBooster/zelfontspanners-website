// Check if old build file is referenced in database
// Run this in browser console or Node.js

const OLD_HASH = '94f0854bcc52beb1';
const OLD_FILE = 'layout-94f0854bcc52beb1.js';

async function checkDatabaseForOldBuild() {
  console.log('🔍 Checking database for old build references...');
  
  try {
    // Check portfolio_data (most likely place for HTML/JS content)
    const portfolioRes = await fetch('/api/portfolio?memberName=all');
    const portfolioData = await portfolioRes.json();
    
    let found = false;
    
    // Check all portfolio photos
    if (portfolioData.photos) {
      portfolioData.photos.forEach((photo, idx) => {
        const photoStr = JSON.stringify(photo);
        if (photoStr.includes(OLD_HASH) || photoStr.includes(OLD_FILE)) {
          console.error(`❌ FOUND in portfolio photo ${idx}:`, photo);
          found = true;
        }
      });
    }
    
    // Check agenda events
    const agendaRes = await fetch('/api/agenda');
    const agendaData = await agendaRes.json();
    
    if (agendaData.events) {
      agendaData.events.forEach((event, idx) => {
        const eventStr = JSON.stringify(event);
        if (eventStr.includes(OLD_HASH) || eventStr.includes(OLD_FILE)) {
          console.error(`❌ FOUND in agenda event ${idx}:`, event);
          found = true;
        }
      });
    }
    
    // Check foto van de maand
    const fotoRes = await fetch('/api/foto-van-de-maand');
    const fotoData = await fotoRes.json();
    
    if (fotoData.photos) {
      fotoData.photos.forEach((foto, idx) => {
        const fotoStr = JSON.stringify(foto);
        if (fotoStr.includes(OLD_HASH) || fotoStr.includes(OLD_FILE)) {
          console.error(`❌ FOUND in foto van de maand ${idx}:`, foto);
          found = true;
        }
      });
    }
    
    if (!found) {
      console.log('✅ Database is clean - no references to old build file found');
    } else {
      console.error('❌ OLD BUILD FILE FOUND IN DATABASE! Clean the database entries above.');
    }
    
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

// Run check
checkDatabaseForOldBuild();

