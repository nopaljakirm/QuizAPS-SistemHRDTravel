// src/travel/controllers/tiketSayaController.js
// Controller untuk UC3: Melihat & Membatalkan Tiket Pesawat (US2c)
// Menggantikan pendekatan lama (ketik kode booking manual) dengan pencarian via email

const Pemesanan = require('../models/Pemesanan');
const Tiket = require('../models/Tiket');

exports.lihatTiketSaya = (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.render('tiket-saya', { error: null, data: null, email: null });
  }

  const daftarTiket = Pemesanan.findByEmailPenumpang(email);

  res.render('tiket-saya', {
    error: daftarTiket.length === 0 ? 'Tidak ditemukan tiket dengan email tersebut' : null,
    data: daftarTiket,
    email
  });
};

// Sesuai UC3 (US2c): proses pembatalan tiket, dipicu dari tombol di halaman Tiket Saya
exports.batalkanTiket = (req, res) => {
  const { kodeBooking, email } = req.body;

  const tiket = Tiket.findByKodeBooking(kodeBooking);

  if (tiket && tiket.status_booking !== 'dibatalkan') {
    Tiket.batalkan(kodeBooking);
  }

  res.redirect(`/travel/tiket-saya?email=${encodeURIComponent(email)}`);
};