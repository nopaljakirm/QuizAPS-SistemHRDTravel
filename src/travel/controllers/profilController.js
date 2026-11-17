// src/controllers/profilController.js
// Controller untuk UC5: Mengupdate Data Profil (US5)

const Pengguna = require('../models/Pengguna');
const Profil = require('../models/Profil');

exports.showFormProfil = (req, res) => {
  const { penggunaId } = req.query;
  const pengguna = penggunaId ? Pengguna.findById(penggunaId) : null;
  const profil = penggunaId ? Profil.findByPenggunaId(penggunaId) : null;

  res.render('update-profil', { error: null, pengguna, profil, berhasil: false });
};

// Sesuai UC5 (US5): update data profil member
exports.updateProfil = (req, res) => {
  const { penggunaId, nomorIdentitas, nomorTelepon } = req.body;

  const pengguna = Pengguna.findById(penggunaId);

  if (!pengguna) {
    return res.render('update-profil', {
      error: 'Pengguna tidak ditemukan',
      pengguna: null,
      profil: null,
      berhasil: false
    });
  }

  const profilTersimpan = Profil.update(penggunaId, { nomorIdentitas, nomorTelepon });

  res.render('update-profil', {
    error: null,
    pengguna,
    profil: profilTersimpan,
    berhasil: true
  });
};