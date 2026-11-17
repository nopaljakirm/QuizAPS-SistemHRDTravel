// src/controllers/perbandinganController.js
// Controller untuk UC7: Melihat dan Membandingkan Penerbangan (US6)

const Penerbangan = require('../models/Penerbangan');

exports.bandingkanPenerbangan = (req, res) => {
  const { kotaTujuan, tanggal, jam } = req.query;

  if (!kotaTujuan && !tanggal && !jam) {
    return res.render('bandingkan-penerbangan', {
      error: 'Mohon masukkan preferensi pencarian (tujuan, tanggal, atau jam)',
      data: null
    });
  }

  const daftarPenerbangan = Penerbangan.findByPreferensi({ kotaTujuan, tanggal, jam });

  res.render('bandingkan-penerbangan', {
    error: null,
    data: daftarPenerbangan,
    kotaTujuan,
    tanggal,
    jam
  });
};