// src/travel/models/Pemesanan.js
// Entity: Pemesanan (sesuai Domain Model Travel)

const db = require('../db/database');

class Pemesanan {
  static create({ penggunaId, pengunjungId, penerbanganId, namaPenumpang, emailPenumpang, jumlahPenumpang, totalHarga }) {
    const stmt = db.prepare(`
      INSERT INTO pemesanan (pengguna_id, pengunjung_id, penerbangan_id, nama_penumpang, email_penumpang, tanggal_pemesanan, jumlah_penumpang, total_harga)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const tanggalPemesanan = new Date().toISOString().split('T')[0];
    const result = stmt.run(
      penggunaId || null, pengunjungId || null, penerbanganId,
      namaPenumpang || null, emailPenumpang || null,
      tanggalPemesanan, jumlahPenumpang, totalHarga
    );
    return result.lastInsertRowid;
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM pemesanan WHERE id = ?');
    return stmt.get(id);
  }

  // Cari semua tiket berdasarkan email (untuk fitur "Tiket Saya")
  static findByEmailPenumpang(email) {
    const stmt = db.prepare(`
      SELECT pm.*, t.kode_booking_reference, t.status_booking,
             pn.nomor_penerbangan, pn.kota_asal, pn.kota_tujuan, pn.tanggal_keberangkatan
      FROM pemesanan pm
      JOIN tiket t ON t.pemesanan_id = pm.id
      JOIN penerbangan pn ON pm.penerbangan_id = pn.id
      WHERE pm.email_penumpang = ?
      ORDER BY pm.id DESC
    `);
    return stmt.all(email);
  }
}

module.exports = Pemesanan;