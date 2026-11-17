// src/controllers/validasiTiketController.js
// Controller untuk UC6: Melakukan Validasi Tiket (US5b)
// Menerapkan <<extend>> ke UC5 (Update Profil) jika profil belum lengkap

const Profil = require('../models/Profil');
const Tiket = require('../models/Tiket');

exports.showFormValidasi = (req, res) => {
  res.render('validasi-tiket', { error: null, hasil: null, perluLengkapiProfil: false });
};

// Sesuai UC6 (US5b): validasi tiket, dengan alur gagal jika profil tidak lengkap
exports.validasiTiket = (req, res) => {
  const { kodeBooking, penggunaId } = req.body;

  const tiket = Tiket.findByKodeBooking(kodeBooking);

  if (!tiket) {
    return res.render('validasi-tiket', {
      error: `Tiket dengan kode booking "${kodeBooking}" tidak ditemukan`,
      hasil: null,
      perluLengkapiProfil: false
    });
  }

  const profilLengkap = Profil.cekKelengkapan(penggunaId);

  // Sesuai Robustness Diagram UC5/UC6: alt fragment - profil tidak lengkap
  if (!profilLengkap) {
    return res.render('validasi-tiket', {
      error: 'Data profil tidak lengkap. Mohon lengkapi data profil Anda terlebih dahulu.',
      hasil: null,
      perluLengkapiProfil: true,
      penggunaId
    });
  }

  res.render('validasi-tiket', {
    error: null,
    hasil: { tiket, valid: true },
    perluLengkapiProfil: false
  });
};