// src/models/Profil.js
// Entity: Profil (sesuai Domain Model Travel - US5, US5b)

const db = require('../db/database');

class Profil {
  static findByPenggunaId(penggunaId) {
    const stmt = db.prepare('SELECT * FROM profil WHERE pengguna_id = ?');
    return stmt.get(penggunaId);
  }

  // Sesuai UC5 (US5): update data profil
  static update(penggunaId, { nomorIdentitas, nomorTelepon }) {
    const statusKelengkapan = (nomorIdentitas && nomorTelepon) ? 'lengkap' : 'tidak lengkap';

    const existing = this.findByPenggunaId(penggunaId);

    if (existing) {
      const stmt = db.prepare(`
        UPDATE profil
        SET nomor_identitas = ?, nomor_telepon = ?, status_kelengkapan = ?
        WHERE pengguna_id = ?
      `);
      stmt.run(nomorIdentitas, nomorTelepon, statusKelengkapan, penggunaId);
    } else {
      const stmt = db.prepare(`
        INSERT INTO profil (pengguna_id, nomor_identitas, nomor_telepon, status_kelengkapan)
        VALUES (?, ?, ?, ?)
      `);
      stmt.run(penggunaId, nomorIdentitas, nomorTelepon, statusKelengkapan);
    }

    return this.findByPenggunaId(penggunaId);
  }

  // Sesuai UC6 (US5b): cek kelengkapan profil sebelum validasi tiket
  static cekKelengkapan(penggunaId) {
    const profil = this.findByPenggunaId(penggunaId);
    return profil && profil.status_kelengkapan === 'lengkap';
  }
}

module.exports = Profil;