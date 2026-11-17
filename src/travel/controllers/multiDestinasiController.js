// src/controllers/multiDestinasiController.js
// Controller untuk UC4: Mencari Penerbangan Multi-destinasi (US4)

const Penerbangan = require('../models/Penerbangan');

exports.searchMultiDestinasi = (req, res) => {
  const { tanggal, kotaAsal, kotaTujuan } = req.query;

  if (!tanggal && !kotaAsal && !kotaTujuan) {
    return res.render('multi-destinasi', {
      error: 'Mohon masukkan minimal satu kriteria (tanggal, kota asal, atau tujuan)',
      data: null
    });
  }

  const daftarPenerbangan = Penerbangan.findByKombinasiKriteria({ tanggal, kotaAsal, kotaTujuan });

  res.render('multi-destinasi', {
    error: null,
    data: daftarPenerbangan,
    tanggal,
    kotaAsal,
    kotaTujuan
  });
};