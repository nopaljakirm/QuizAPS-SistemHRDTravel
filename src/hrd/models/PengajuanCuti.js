// src/models/PengajuanCuti.js
// Entity: PengajuanCuti (sesuai Domain Model HRD)

const db = require('../db/database');

class PengajuanCuti {
  // Sesuai UC1 (US1): cari pengajuan cuti berdasarkan periode
  static findByPeriode(periodeMulai, periodeSelesai) {
    const stmt = db.prepare(`
      SELECT pc.*, p.nama, p.departemen
      FROM pengajuan_cuti pc
      JOIN pegawai p ON pc.nip_pegawai = p.nip
      WHERE pc.periode_mulai >= ? AND pc.periode_selesai <= ?
    `);
    return stmt.all(periodeMulai, periodeSelesai);
  }

  // Sesuai UC2 (US1b): detail pengajuan cuti berdasarkan periode
  static findDetailByPeriode(periodeMulai, periodeSelesai) {
    const stmt = db.prepare(`
      SELECT p.nama, pc.periode_mulai, pc.periode_selesai, pc.lama_waktu_cuti, pc.status
      FROM pengajuan_cuti pc
      JOIN pegawai p ON pc.nip_pegawai = p.nip
      WHERE pc.periode_mulai >= ? AND pc.periode_selesai <= ?
    `);
    return stmt.all(periodeMulai, periodeSelesai);
  }

  static findByNipPegawai(nipPegawai) {
    const stmt = db.prepare('SELECT * FROM pengajuan_cuti WHERE nip_pegawai = ?');
    return stmt.all(nipPegawai);
  }
}

module.exports = PengajuanCuti;