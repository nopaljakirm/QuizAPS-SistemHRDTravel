// src/models/Pegawai.js
// Entity: Pegawai (sesuai Domain Model HRD)

const db = require('../db/database');

class Pegawai {
  static findByNip(nip) {
    const stmt = db.prepare('SELECT * FROM pegawai WHERE nip = ?');
    return stmt.get(nip);
  }

  static findByNama(nama) {
    const stmt = db.prepare('SELECT * FROM pegawai WHERE nama LIKE ?');
    return stmt.get(`%${nama}%`);
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM pegawai');
    return stmt.all();
  }
}

module.exports = Pegawai;