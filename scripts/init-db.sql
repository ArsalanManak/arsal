-- Initialize database tables for Arsal portfolio

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_home_intro_videos_sort ON home_intro_videos(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_static_ads_sort ON static_ads(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_video_ads_sort ON video_ads(sort_order ASC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_courses_sort ON courses(sort_order ASC, created_at ASC);
