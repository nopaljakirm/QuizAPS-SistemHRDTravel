// src/models/Penerbangan.js
// Entity: Penerbangan (sesuai Domain Model Travel)

const db = require('../db/database');

class Penerbangan {
  // Sesuai UC1 (US2/US3): cari penerbangan berdasarkan kota asal & tujuan
  static findByRute(kotaAsal, kotaTujuan) {
    const stmt = db.prepare(`
      SELECT p.*, m.nama AS nama_maskapai, m.kode_maskapai
      FROM penerbangan p
      JOIN maskapai m ON p.maskapai_id = m.id
      WHERE p.kota_asal = ? AND p.kota_tujuan = ?
    `);
    return stmt.all(kotaAsal, kotaTujuan);
  }

  static findById(id) {
    const stmt = db.prepare(`
      SELECT p.*, m.nama AS nama_maskapai, m.kode_maskapai
      FROM penerbangan p
      JOIN maskapai m ON p.maskapai_id = m.id
      WHERE p.id = ?
    `);
    return stmt.get(id);
  }

  static cekKetersediaan(id) {
    const stmt = db.prepare('SELECT kursi_tersedia FROM penerbangan WHERE id = ?');
    const result = stmt.get(id);
    return result && result.kursi_tersedia > 0;
  }

  static kurangiKursi(id) {
    const stmt = db.prepare('UPDATE penerbangan SET kursi_tersedia = kursi_tersedia - 1 WHERE id = ?');
    return stmt.run(id);
  }

  // Sesuai UC4 (US4): cari penerbangan multi-destinasi dengan kombinasi kriteria
  static findByKombinasiKriteria({ tanggal, kotaAsal, kotaTujuan }) {
    let query = `
      SELECT p.*, m.nama AS nama_maskapai
      FROM penerbangan p
      JOIN maskapai m ON p.maskapai_id = m.id
      WHERE 1=1
    `;
    const params = [];

    if (tanggal) {
      query += ' AND p.tanggal_keberangkatan = ?';
      params.push(tanggal);
    }
    if (kotaAsal) {
      query += ' AND p.kota_asal = ?';
      params.push(kotaAsal);
    }
    if (kotaTujuan) {
      query += ' AND p.kota_tujuan = ?';
      params.push(kotaTujuan);
    }

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  // Sesuai UC7 (US6): cari penerbangan berdasarkan preferensi, untuk dibandingkan
  static findByPreferensi({ kotaTujuan, tanggal, jam }) {
    let query = `
      SELECT p.*, m.nama AS nama_maskapai
      FROM penerbangan p
      JOIN maskapai m ON p.maskapai_id = m.id
      WHERE 1=1
    `;
    const params = [];

    if (kotaTujuan) { query += ' AND p.kota_tujuan LIKE ?'; params.push(`%${kotaTujuan}%`); }
    if (tanggal) { query += ' AND p.tanggal_keberangkatan = ?'; params.push(tanggal); }
    if (jam) { query += ' AND p.jam_keberangkatan = ?'; params.push(jam); }

    query += ' ORDER BY p.harga ASC';
    return db.prepare(query).all(...params);
  }
}

module.exports = Penerbangan;