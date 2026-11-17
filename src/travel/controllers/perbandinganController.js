// src/travel/controllers/perbandinganController.js
// Controller untuk UC7: Melihat dan Membandingkan Penerbangan (US6)

const Penerbangan = require('../models/Penerbangan');

exports.bandingkanPenerbangan = (req, res) => {
  const { kotaTujuan, tanggal, jam } = req.query;

  if (!kotaTujuan && !tanggal && !jam) {
    return res.render('bandingkan-penerbangan', {
      error: null, data: null, kotaTujuan: null, tanggal: null, jam: null
    });
  }

  const daftarPenerbangan = Penerbangan.findByPreferensi({ kotaTujuan, tanggal, jam });

  res.render('bandingkan-penerbangan', {
    error: daftarPenerbangan.length === 0 ? 'Tidak ada penerbangan yang sesuai preferensi.' : null,
    data: daftarPenerbangan, kotaTujuan, tanggal, jam
  });
};