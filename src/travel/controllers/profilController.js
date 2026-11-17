// src/travel/controllers/profilController.js
// Controller untuk UC5: Mengupdate Data Profil (US5)

const Pengguna = require('../models/Pengguna');
const Profil = require('../models/Profil');
const db = require('../db/database');

exports.showFormProfil = (req, res) => {
  const { penggunaId } = req.query;
  const daftarPengguna = db.prepare('SELECT * FROM pengguna').all();
  const pengguna = penggunaId ? Pengguna.findById(penggunaId) : null;
  const profil = penggunaId ? Profil.findByPenggunaId(penggunaId) : null;

  res.render('update-profil', { error: null, daftarPengguna, pengguna, profil, berhasil: false });
};

exports.updateProfil = (req, res) => {
  const { penggunaId, nomorIdentitas, nomorTelepon } = req.body;
  const daftarPengguna = db.prepare('SELECT * FROM pengguna').all();

  const pengguna = Pengguna.findById(penggunaId);

  if (!pengguna) {
    return res.render('update-profil', {
      error: 'Pengguna tidak ditemukan',
      daftarPengguna,
      pengguna: null,
      profil: null,
      berhasil: false
    });
  }

  const profilTersimpan = Profil.update(penggunaId, { nomorIdentitas, nomorTelepon });

  res.render('update-profil', {
    error: null,
    daftarPengguna,
    pengguna,
    profil: profilTersimpan,
    berhasil: true
  });
};