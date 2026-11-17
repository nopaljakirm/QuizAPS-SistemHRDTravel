// src/models/Maskapai.js
// Entity: Maskapai (sesuai Domain Model Travel)

const db = require('../db/database');

class Maskapai {
  static findAll() {
    const stmt = db.prepare('SELECT * FROM maskapai');
    return stmt.all();
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM maskapai WHERE id = ?');
    return stmt.get(id);
  }
}

module.exports = Maskapai;