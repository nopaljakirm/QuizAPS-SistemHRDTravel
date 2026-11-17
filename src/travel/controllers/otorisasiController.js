// src/controllers/otorisasiController.js
// Controller untuk UC12: Melakukan Otorisasi Tiket (US9)

const Tiket = require('../models/Tiket');

exports.showFormOtorisasi = (req, res) => {
  res.render('otorisasi-tiket', { error: null, hasil: null });
};

// Sesuai UC12 (US9): cek status booking via kode booking reference, dengan alur gagal jika kode tidak sesuai
exports.otorisasiTiket = (req, res) => {
  const { kodeBooking } = req.body;

  const tiket = Tiket.findByKodeBooking(kodeBooking);

  // Sesuai Robustness/Sequence Diagram UC12: alt fragment - kode tidak sesuai
  if (!tiket) {
    return res.render('otorisasi-tiket', {
      error: 'Kode booking reference tidak sesuai. Mohon ulangi input.',
      hasil: null
    });
  }

  res.render('otorisasi-tiket', {
    error: null,
    hasil: tiket
  });
};