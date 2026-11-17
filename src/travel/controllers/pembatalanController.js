// src/controllers/pembatalanController.js
// Controller untuk UC3: Membatalkan Tiket Pesawat (US2c)

const Tiket = require('../models/Tiket');

exports.showFormPembatalan = (req, res) => {
  res.render('batalkan-tiket', { error: null, tiket: null, berhasil: false });
};

// Sesuai UC3 (US2c): proses pembatalan tiket berdasarkan kode booking
exports.batalkanTiket = (req, res) => {
  const { kodeBooking } = req.body;

  const tiket = Tiket.findByKodeBooking(kodeBooking);

  if (!tiket) {
    return res.render('batalkan-tiket', {
      error: `Tiket dengan kode booking "${kodeBooking}" tidak ditemukan`,
      tiket: null,
      berhasil: false
    });
  }

  if (tiket.status_booking === 'dibatalkan') {
    return res.render('batalkan-tiket', {
      error: 'Tiket ini sudah dibatalkan sebelumnya',
      tiket,
      berhasil: false
    });
  }

  Tiket.batalkan(kodeBooking);

  res.render('batalkan-tiket', {
    error: null,
    tiket: Tiket.findByKodeBooking(kodeBooking),
    berhasil: true
  });
};