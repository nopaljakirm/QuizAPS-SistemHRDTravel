-- Skema database Sistem HRD (Manajemen Cuti)
-- Diturunkan dari Domain Model & ERD (Mg 6-7)

CREATE TABLE IF NOT EXISTS pegawai (
  nip TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  departemen TEXT NOT NULL,
  tanggal_bergabung TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pengajuan_cuti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nip_pegawai TEXT NOT NULL,
  tanggal_pengajuan TEXT NOT NULL,
  periode_mulai TEXT NOT NULL,
  periode_selesai TEXT NOT NULL,
  lama_waktu_cuti INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  FOREIGN KEY (nip_pegawai) REFERENCES pegawai(nip)
);

CREATE TABLE IF NOT EXISTS riwayat_cuti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nip_pegawai TEXT NOT NULL,
  tahun_berjalan INTEGER NOT NULL,
  sisa_waktu_cuti INTEGER NOT NULL DEFAULT 12,
  total_cuti_terpakai INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (nip_pegawai) REFERENCES pegawai(nip),
  UNIQUE (nip_pegawai, tahun_berjalan)
);

-- Data contoh (seed) - Pegawai
INSERT OR IGNORE INTO pegawai (nip, nama, departemen, tanggal_bergabung) VALUES
  ('001', 'Andi Pratama', 'IT', '2022-01-10'),
  ('002', 'Budi Santoso', 'Finance', '2021-06-15'),
  ('003', 'Citra Dewi', 'Marketing', '2023-03-01');

-- Data contoh (seed) - Pengajuan Cuti
-- Catatan: periode disesuaikan ke tahun 2026 agar konsisten dengan tahun berjalan saat testing
INSERT OR IGNORE INTO pengajuan_cuti (nip_pegawai, tanggal_pengajuan, periode_mulai, periode_selesai, lama_waktu_cuti, status) VALUES
  ('001', '2026-01-05', '2026-01-20', '2026-01-24', 5, 'disetujui'),
  ('002', '2026-01-10', '2026-01-22', '2026-01-23', 2, 'pending'),
  ('003', '2026-02-01', '2026-02-10', '2026-02-14', 5, 'disetujui');

-- Data contoh (seed) - Riwayat Cuti
-- Diisi untuk beberapa tahun (2024, 2025, 2026) agar testing tidak terbatas satu tahun saja
-- Logika aplikasi tetap mengambil tahun berjalan secara dinamis (new Date().getFullYear())
INSERT OR IGNORE INTO riwayat_cuti (nip_pegawai, tahun_berjalan, sisa_waktu_cuti, total_cuti_terpakai) VALUES
  ('001', 2024, 10, 2),
  ('001', 2025, 7, 5),
  ('001', 2026, 7, 5),
  ('002', 2024, 12, 0),
  ('002', 2025, 12, 0),
  ('002', 2026, 12, 0),
  ('003', 2024, 8, 4),
  ('003', 2025, 7, 5),
  ('003', 2026, 7, 5);