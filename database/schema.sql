-- Database Schema for De Zelfontspanners Website
-- PostgreSQL/Supabase compatible - uses snake_case for column names

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  password_reset_required BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (optional - can use JWT tokens instead)
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE
);

-- Portfolio data table
CREATE TABLE IF NOT EXISTS portfolio_data (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  photo_data JSONB NOT NULL, -- Contains: src, title, category, isUserUploaded
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE
);

-- Portfolio order table
CREATE TABLE IF NOT EXISTS portfolio_order (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  photo_order JSONB NOT NULL, -- Array of photo src strings in order
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE
);

-- Hidden photos table
CREATE TABLE IF NOT EXISTS hidden_photos (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  photo_src TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE,
  UNIQUE(member_name, photo_src)
);

-- Photo likes table
CREATE TABLE IF NOT EXISTS photo_likes (
  id SERIAL PRIMARY KEY,
  photo_id VARCHAR(255) NOT NULL,
  member_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE,
  UNIQUE(photo_id, member_name)
);

-- Photo comments table
CREATE TABLE IF NOT EXISTS photo_comments (
  id SERIAL PRIMARY KEY,
  photo_id VARCHAR(255) NOT NULL,
  member_name VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE
);

-- Agenda events table
CREATE TABLE IF NOT EXISTS agenda_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location VARCHAR(255),
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES accounts(member_name) ON DELETE CASCADE
);

-- Foto van de maand table
CREATE TABLE IF NOT EXISTS foto_van_de_maand (
  id SERIAL PRIMARY KEY,
  member_name VARCHAR(255) NOT NULL,
  image_src TEXT NOT NULL,
  title VARCHAR(255),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  votes JSONB DEFAULT '[]', -- Array of member names who voted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  excursion_id VARCHAR(255),
  excursion_title VARCHAR(255),
  excursion_location VARCHAR(255),
  excursion_date DATE,
  FOREIGN KEY (member_name) REFERENCES accounts(member_name) ON DELETE CASCADE,
  UNIQUE(month, year, member_name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accounts_member_name ON accounts(member_name);
CREATE INDEX IF NOT EXISTS idx_sessions_member_name ON sessions(member_name);
CREATE INDEX IF NOT EXISTS idx_portfolio_data_member_name ON portfolio_data(member_name);
CREATE INDEX IF NOT EXISTS idx_portfolio_order_member_name ON portfolio_order(member_name);
CREATE INDEX IF NOT EXISTS idx_hidden_photos_member_name ON hidden_photos(member_name);
CREATE INDEX IF NOT EXISTS idx_photo_likes_photo_id ON photo_likes(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_comments_photo_id ON photo_comments(photo_id);
CREATE INDEX IF NOT EXISTS idx_agenda_events_date ON agenda_events(date);
CREATE INDEX IF NOT EXISTS idx_foto_van_de_maand_month_year ON foto_van_de_maand(month, year);
