// src/models/Pengguna.js
// Entity: Pengguna (calon penumpang / member frequent traveller)

const db = require('../db/database');

class Pengguna {
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM pengguna WHERE id = ?');
    return stmt.get(id);
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM pengguna WHERE email = ?');
    return stmt.get(email);
  }
}

module.exports = Pengguna;