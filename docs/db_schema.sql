-- Database schema (MySQL compatible)
-- Use this file to align backend DB structure with frontend data

-- Users / Authentication
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) UNIQUE,
  password_hash VARCHAR(255),
  username VARCHAR(191) UNIQUE DEFAULT NULL,
  role VARCHAR(50) DEFAULT 'user',
  avatar VARCHAR(1024) DEFAULT NULL,
  phone VARCHAR(32) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  no_whatsapp VARCHAR(32) DEFAULT NULL,
  socials JSON DEFAULT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  meta JSON DEFAULT NULL,
  created_by INT DEFAULT NULL,
  updated_by INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Owners (pemilik). Can reference users.id or be standalone
CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  name VARCHAR(191) NOT NULL,
  slug VARCHAR(191) UNIQUE,
  avatar VARCHAR(1024),
  bio TEXT,
  whatsapp VARCHAR(32),
  socials JSON DEFAULT NULL,
  is_verified TINYINT(1) DEFAULT 0,
  stats JSON DEFAULT NULL,
  area_specialist JSON DEFAULT NULL,
  property_types JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Property types (tipe_properti)
-- Property types (tipe_propertis in backend)
CREATE TABLE tipe_propertis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  slug VARCHAR(191) UNIQUE,
  category VARCHAR(100),
  meta JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Properties / Listings
-- Properties / Listings (uses existing table name `propertis` in backend)
CREATE TABLE propertis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  owner_id INT DEFAULT NULL,
  type_id INT DEFAULT NULL,
  title VARCHAR(255) DEFAULT NULL,
  slug VARCHAR(255) UNIQUE DEFAULT NULL,
  description LONGTEXT DEFAULT NULL,
  image JSON DEFAULT NULL,
  harga_sewa JSON DEFAULT NULL,
  price BIGINT DEFAULT NULL,
  duration VARCHAR(50) DEFAULT 'bulan',
  status VARCHAR(50) DEFAULT 'Tersedia',
  address TEXT DEFAULT NULL,
  area VARCHAR(191) DEFAULT NULL,
  city VARCHAR(191) DEFAULT NULL,
  whatsapp VARCHAR(32) DEFAULT NULL,
  member_level VARCHAR(100) DEFAULT NULL,
  duration_min INT DEFAULT NULL,
  upload_date DATETIME DEFAULT NULL,
  electricity_capacity INT DEFAULT NULL,
  electricity_cost VARCHAR(100) DEFAULT NULL,
  views INT DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0,
  extra JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE SET NULL,
  FOREIGN KEY (type_id) REFERENCES tipe_propertis(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Property images
CREATE TABLE property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  url VARCHAR(1024) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES propertis(id) ON DELETE CASCADE
);

-- Property informations (environment / interior groups)
-- Store grouped info as JSON to preserve structure from frontend sample data
CREATE TABLE property_informations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  info_type VARCHAR(50) NOT NULL, -- 'lingkungan' or 'interior'
  name VARCHAR(191),
  data JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES propertis(id) ON DELETE CASCADE
);

-- Article authors
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  slug VARCHAR(191) UNIQUE,
  avatar VARCHAR(1024),
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Articles / Panduan
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  image VARCHAR(1024),
  published_at DATE,
  author_id INT,
  category VARCHAR(191),
  content LONGTEXT,
  meta JSON DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL
);

-- Reviews / Ulasan Pengguna
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT DEFAULT NULL,
  user_id INT DEFAULT NULL,
  rating TINYINT DEFAULT 5,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES propertis(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Contacts to advertiser (hubungiPengiklanProperti)
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT DEFAULT NULL,
  name VARCHAR(191),
  phone VARCHAR(32),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES propertis(id) ON DELETE SET NULL
);

-- Reports (laporkan iklan)
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT DEFAULT NULL,
  reporter_name VARCHAR(191),
  reporter_contact VARCHAR(191),
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES propertis(id) ON DELETE SET NULL
);

-- Feedback / Suggestions (beriSaran)
CREATE TABLE suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191),
  email VARCHAR(191),
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Simple lookup tables: tipe_kost, tipe_kamar, tipe_sewa
CREATE TABLE tipe_kost (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191),
  slug VARCHAR(191) UNIQUE
);

CREATE TABLE tipe_kamar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191),
  slug VARCHAR(191) UNIQUE
);

CREATE TABLE tipe_sewa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191),
  slug VARCHAR(191) UNIQUE
);

-- Konsultasi / investor / konsultasi messages
CREATE TABLE konsultasi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  name VARCHAR(191),
  email VARCHAR(191),
  topic VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for performance (examples)
CREATE INDEX idx_propertis_owner ON propertis(owner_id);
CREATE INDEX idx_propertis_type ON propertis(type_id);

-- End of schema
