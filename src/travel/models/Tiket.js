// src/models/Tiket.js
// Entity: Tiket (sesuai Domain Model Travel)

const db = require('../db/database');

class Tiket {
  static generate(pemesananId) {
    const kodeBooking = 'BR' + Math.floor(100000 + Math.random() * 900000);
    const tanggalPemesanan = new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      INSERT INTO tiket (pemesanan_id, kode_booking_reference, status_booking, tanggal_pemesanan)
      VALUES (?, ?, 'waiting_payment', ?)
    `);
    stmt.run(pemesananId, kodeBooking, tanggalPemesanan);

    return this.findByKodeBooking(kodeBooking);
  }

  static findByKodeBooking(kodeBooking) {
    const stmt = db.prepare(`
      SELECT t.*, pm.kode_booking_reference, pm.status_booking
      FROM tiket t
      JOIN pemesanan pm ON t.pemesanan_id = pm.id
      WHERE pm.kode_booking_reference = ?
    `);
    return stmt.get(kodeBooking);
  }

  static batalkan(kodeBooking) {
    const stmt = db.prepare(`UPDATE tiket SET status_booking = 'dibatalkan' WHERE kode_booking_reference = ?`);
    return stmt.run(kodeBooking);
  }

  // Sesuai UC8 (US7): lihat semua / filter status booking
  static findAll() {
    const stmt = db.prepare(`
      SELECT t.*, pm.penerbangan_id, pn.nomor_penerbangan, pn.kota_asal, pn.kota_tujuan
      FROM tiket t
      JOIN pemesanan pm ON t.pemesanan_id = pm.id
      JOIN penerbangan pn ON pm.penerbangan_id = pn.id
    `);
    return stmt.all();
  }

  static findByStatus(status) {
    const stmt = db.prepare(`
      SELECT t.*, pm.penerbangan_id, pn.nomor_penerbangan, pn.kota_asal, pn.kota_tujuan
      FROM tiket t
      JOIN pemesanan pm ON t.pemesanan_id = pm.id
      JOIN penerbangan pn ON pm.penerbangan_id = pn.id
      WHERE t.status_booking = ?
    `);
    return stmt.all(status);
  }

  // Sesuai UC9-11 (US8): tandai e-tiket terkirim
  static tandaiEtiketTerkirim(kodeBooking) {
    const stmt = db.prepare(`UPDATE tiket SET etiket_terkirim = 1 WHERE kode_booking_reference = ?`);
    return stmt.run(kodeBooking);
  }

  static kirimEtiket(kodeBooking) {
    return this.tandaiEtiketTerkirim(kodeBooking);
  }
}

module.exports = Tiket;