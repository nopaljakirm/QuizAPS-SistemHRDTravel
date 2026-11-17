// src/db/database.js
// Koneksi database SQLite untuk Sistem HRD (Manajemen Cuti)

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'hrd.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

const db = new Database(DB_PATH);

// Jalankan schema.sql setiap kali server start
// (aman karena semua statement pakai IF NOT EXISTS / OR IGNORE)
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

module.exports = db;