-- Skema database Sistem Travel/Tiket Pesawat
-- Diturunkan dari Domain Model & ERD (Mg 6-7)

CREATE TABLE IF NOT EXISTS maskapai (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  kode_maskapai TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS penerbangan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nomor_penerbangan TEXT NOT NULL UNIQUE,
  maskapai_id INTEGER NOT NULL,
  kota_asal TEXT NOT NULL,
  kota_tujuan TEXT NOT NULL,
  tanggal_keberangkatan TEXT NOT NULL,
  jam_keberangkatan TEXT NOT NULL,
  harga INTEGER NOT NULL,
  kursi_tersedia INTEGER NOT NULL DEFAULT 50,
  FOREIGN KEY (maskapai_id) REFERENCES maskapai(id)
);

CREATE TABLE IF NOT EXISTS pengguna (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  tipe TEXT NOT NULL DEFAULT 'umum' -- 'umum' atau 'member'
);

CREATE TABLE IF NOT EXISTS profil (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pengguna_id INTEGER NOT NULL UNIQUE,
  nomor_identitas TEXT,
  nomor_telepon TEXT,
  status_kelengkapan TEXT NOT NULL DEFAULT 'tidak lengkap', -- 'lengkap' / 'tidak lengkap'
  FOREIGN KEY (pengguna_id) REFERENCES pengguna(id)
);

CREATE TABLE IF NOT EXISTS pengunjung (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  nomor_identitas TEXT
);

CREATE TABLE IF NOT EXISTS pemesanan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pengguna_id INTEGER,
  pengunjung_id INTEGER,
  penerbangan_id INTEGER NOT NULL,
  tanggal_pemesanan TEXT NOT NULL,
  jumlah_penumpang INTEGER NOT NULL DEFAULT 1,
  total_harga INTEGER NOT NULL,
  FOREIGN KEY (pengguna_id) REFERENCES pengguna(id),
  FOREIGN KEY (pengunjung_id) REFERENCES pengunjung(id),
  FOREIGN KEY (penerbangan_id) REFERENCES penerbangan(id)
);

CREATE TABLE IF NOT EXISTS tiket (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pemesanan_id INTEGER NOT NULL,
  kode_booking_reference TEXT NOT NULL UNIQUE,
  status_booking TEXT NOT NULL DEFAULT 'waiting_payment', -- 'confirmed' / 'booked' / 'waiting_payment' / 'dibatalkan'
  tanggal_pemesanan TEXT NOT NULL,
  etiket_terkirim INTEGER NOT NULL DEFAULT 0, -- 0 = belum, 1 = sudah
  FOREIGN KEY (pemesanan_id) REFERENCES pemesanan(id)
);

-- ===================== SEED DATA =====================

-- Maskapai
INSERT OR IGNORE INTO maskapai (id, nama, kode_maskapai) VALUES
  (1, 'Garuda Indonesia', 'GA'),
  (2, 'Lion Air', 'JT'),
  (3, 'AirAsia Indonesia', 'QZ');

-- Penerbangan (tanggal disesuaikan 2026 agar relevan dengan tahun berjalan)
INSERT OR IGNORE INTO penerbangan (id, nomor_penerbangan, maskapai_id, kota_asal, kota_tujuan, tanggal_keberangkatan, jam_keberangkatan, harga, kursi_tersedia) VALUES
  (1, 'GA123', 1, 'Surabaya', 'Jakarta', '2026-12-20', '08:00', 850000, 50),
  (2, 'JT456', 2, 'Surabaya', 'Jakarta', '2026-12-20', '14:00', 650000, 30),
  (3, 'QZ789', 3, 'Jakarta', 'Bali', '2026-12-23', '10:00', 1200000, 40),
  (4, 'GA321', 1, 'Jakarta', 'Bali', '2026-12-23', '16:00', 1350000, 45),
  (5, 'JT654', 2, 'Bali', 'Lombok', '2026-12-24', '09:00', 500000, 25);

-- Pengguna (termasuk member frequent traveller)
INSERT OR IGNORE INTO pengguna (id, nama, email, tipe) VALUES
  (1, 'Dewi Lestari', 'dewi@mail.com', 'umum'),
  (2, 'Rian Hidayat', 'rian@mail.com', 'member');

-- Profil (member harus melengkapi profil dulu sebelum validasi tiket)
INSERT OR IGNORE INTO profil (id, pengguna_id, nomor_identitas, nomor_telepon, status_kelengkapan) VALUES
  (1, 2, NULL, NULL, 'tidak lengkap');