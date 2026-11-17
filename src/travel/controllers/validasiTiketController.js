// src/travel/controllers/validasiTiketController.js
// Controller untuk UC6: Melakukan Validasi Tiket (US5b)
// <<extend>> ke UC5 jika profil pengguna belum lengkap
// Pakai dropdown (pengguna + tiket), bukan ketik ID/kode manual

const db = require('../db/database');
const Pengguna = require('../models/Pengguna');
const Profil = require('../models/Profil');
const Pemesanan = require('../models/Pemesanan');

exports.showFormValidasi = (req, res) => {
  const { penggunaId } = req.query;

  const daftarPengguna = db.prepare('SELECT * FROM pengguna').all();
  const pengguna = penggunaId ? Pengguna.findById(penggunaId) : null;

  // Daftar tiket milik pengguna terpilih, untuk dropdown tiket
  const daftarTiket = penggunaId
    ? Pemesanan.findByEmailPenumpang(pengguna ? pengguna.email : '')
    : [];

  res.render('validasi-tiket', {
    error: null,
    daftarPengguna,
    pengguna,
    daftarTiket,
    hasil: null
  });
};

exports.validasiTiket = (req, res) => {
  const { penggunaId, kodeBooking } = req.body;

  const daftarPengguna = db.prepare('SELECT * FROM pengguna').all();
  const pengguna = Pengguna.findById(penggunaId);

  if (!pengguna) {
    return res.render('validasi-tiket', {
      error: 'Pengguna tidak ditemukan', daftarPengguna, pengguna: null, daftarTiket: [], hasil: null
    });
  }

  const daftarTiket = Pemesanan.findByEmailPenumpang(pengguna.email);

  // Sesuai Robustness Diagram UC5/UC6: alt fragment - profil tidak lengkap -> <<extend>> ke UC5
  const profilLengkap = Profil.cekKelengkapan(pengguna.id);

  if (!profilLengkap) {
    return res.render('validasi-tiket', {
      error: null,
      daftarPengguna,
      pengguna,
      daftarTiket,
      hasil: { status: 'profil_tidak_lengkap', kodeBooking }
    });
  }

  res.render('validasi-tiket', {
    error: null,
    daftarPengguna,
    pengguna,
    daftarTiket,
    hasil: { status: 'sukses', kodeBooking }
  });
};