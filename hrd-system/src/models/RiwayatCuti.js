// src/models/RiwayatCuti.js
// Entity: RiwayatCuti (sesuai Domain Model HRD)

const db = require('../db/database');

class RiwayatCuti {
  // Sesuai UC3 (US1c): riwayat & sisa cuti pegawai pada tahun berjalan
  static findByNipDanTahun(nipPegawai, tahunBerjalan) {
    const stmt = db.prepare(`
      SELECT * FROM riwayat_cuti
      WHERE nip_pegawai = ? AND tahun_berjalan = ?
    `);
    return stmt.get(nipPegawai, tahunBerjalan);
  }
}

module.exports = RiwayatCuti;