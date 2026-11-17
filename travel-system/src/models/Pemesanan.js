// src/models/Pemesanan.js
// Entity: Pemesanan (sesuai Domain Model Travel)

const db = require('../db/database');

class Pemesanan {
  static create({ penggunaId, pengunjungId, penerbanganId, jumlahPenumpang, totalHarga }) {
    const stmt = db.prepare(`
      INSERT INTO pemesanan (pengguna_id, pengunjung_id, penerbangan_id, tanggal_pemesanan, jumlah_penumpang, total_harga)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const tanggalPemesanan = new Date().toISOString().split('T')[0];
    const result = stmt.run(penggunaId || null, pengunjungId || null, penerbanganId, tanggalPemesanan, jumlahPenumpang, totalHarga);
    return result.lastInsertRowid;
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM pemesanan WHERE id = ?');
    return stmt.get(id);
  }
}

module.exports = Pemesanan;