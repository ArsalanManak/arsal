#!/usr/bin/env node

/**
 * Initialize database tables for the Arsal portfolio
 * Run this script once after setting DATABASE_URL in .env.local
 * 
 * Usage:
 *   npm run setup-db
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const initSchema = `
CREATE TABLE IF NOT EXISTS home_intro_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  caption TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS static_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  caption TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS video_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  caption TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  caption TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_home_intro_videos_sort ON home_intro_videos(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_static_ads_sort ON static_ads(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_video_ads_sort ON video_ads(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_courses_sort ON courses(sort_order ASC, created_at ASC);
`;

async function initializeDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL is not set in your environment.');
    console.error('Please create a .env.local file with:');
    console.error('DATABASE_URL=postgresql://user:password@host:port/database');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  try {
    console.log('🔧 Initializing database tables...');
    
    const queries = initSchema
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    for (const query of queries) {
      await pool.query(query);
    }

    console.log('✅ Database initialized successfully!');
    console.log('Tables created:');
    console.log('  - home_intro_videos');
    console.log('  - static_ads');
    console.log('  - video_ads');
    console.log('  - courses');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:');
    console.error(error.message);
    await pool.end();
    process.exit(1);
  }
}

initializeDatabase();
