// src/travel/controllers/penerbanganController.js
// Controller untuk UC1: Mencari Jadwal Penerbangan (US2, US3)

const Penerbangan = require('../models/Penerbangan');

exports.searchPenerbangan = (req, res) => {
  const { kotaAsal, kotaTujuan } = req.query;

  if (!kotaAsal || !kotaTujuan) {
    return res.render('cari-penerbangan', {
      error: 'Mohon masukkan kota asal dan kota tujuan',
      data: null
    });
  }

  const daftarPenerbangan = Penerbangan.findByRute(kotaAsal, kotaTujuan);

  res.render('cari-penerbangan', {
    error: null,
    data: daftarPenerbangan,
    kotaAsal,
    kotaTujuan
  });
};