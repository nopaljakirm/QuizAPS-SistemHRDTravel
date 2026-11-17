// src/models/Pengunjung.js
// Entity: Pengunjung (sesuai Domain Model Travel - US8)
// Pihak yang tiketnya dipesankan oleh manajer travel, berbeda dari Pengguna

const db = require('../db/database');

class Pengunjung {
  // Sesuai UC9 (US8): simpan data pengunjung saat manajer travel memesan tiket
  static create({ nama, email, nomorIdentitas }) {
    const stmt = db.prepare(`
      INSERT INTO pengunjung (nama, email, nomor_identitas)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(nama, email, nomorIdentitas || null);
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM pengunjung WHERE id = ?');
    return stmt.get(id);
  }

  // Sesuai UC10 (US8): lihat tiket yang terpesan di akun pengunjung
  static findTiketByPengunjungId(pengunjungId) {
    const stmt = db.prepare(`
      SELECT t.*, pm.penerbangan_id, pn.nomor_penerbangan, pn.kota_asal, pn.kota_tujuan, pn.tanggal_keberangkatan
      FROM tiket t
      JOIN pemesanan pm ON t.pemesanan_id = pm.id
      JOIN penerbangan pn ON pm.penerbangan_id = pn.id
      WHERE pm.pengunjung_id = ?
    `);
    return stmt.all(pengunjungId);
  }
}

module.exports = Pengunjung;