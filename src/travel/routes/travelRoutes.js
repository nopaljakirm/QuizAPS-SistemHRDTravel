// src/routes/travelRoutes.js
// Boundary layer: routing untuk Sistem Travel
// Sesuai Use Case Diagram Travel (UC1-UC12)

const express = require('express');
const router = express.Router();

const penerbanganController = require('../controllers/penerbanganController');
const pemesananController = require('../controllers/pemesananController');
const tiketSayaController = require('../controllers/tiketSayaController');
const multiDestinasiController = require('../controllers/multiDestinasiController');
const profilController = require('../controllers/profilController');
const validasiTiketController = require('../controllers/validasiTiketController');
const perbandinganController = require('../controllers/perbandinganController');
const statusBookingController = require('../controllers/statusBookingController');
const pemesananPengunjungController = require('../controllers/pemesananPengunjungController');
const otorisasiController = require('../controllers/otorisasiController');

// Halaman utama (menu navigasi)
router.get('/', (req, res) => {
  res.render('travel-index');
});

// UC1 (US2, US3): Mencari Jadwal Penerbangan
router.get('/cari-penerbangan', penerbanganController.searchPenerbangan);

// UC2 (US2b): Memesan Tiket Pesawat
router.get('/pesan-tiket', pemesananController.showFormPemesanan);
router.post('/pesan-tiket', pemesananController.pesanTiket);

// UC3 (US2c): Melihat & Membatalkan Tiket Pesawat
router.get('/tiket-saya', tiketSayaController.lihatTiketSaya);
router.post('/batalkan-tiket', tiketSayaController.batalkanTiket);

// UC4 (US4): Mencari Penerbangan Multi-destinasi
router.get('/multi-destinasi', multiDestinasiController.searchMultiDestinasi);

// UC5 (US5): Mengupdate Data Profil
router.get('/update-profil', profilController.showFormProfil);
router.post('/update-profil', profilController.updateProfil);

// UC6 (US5b): Melakukan Validasi Tiket (dengan <<extend>> ke UC5)
router.get('/validasi-tiket', validasiTiketController.showFormValidasi);
router.post('/validasi-tiket', validasiTiketController.validasiTiket);

// UC7 (US6): Melihat dan Membandingkan Penerbangan
router.get('/bandingkan-penerbangan', perbandinganController.bandingkanPenerbangan);

// UC8 (US7): Memeriksa dan Memfilter Status Booking
router.get('/status-booking', statusBookingController.getStatusBooking);

// UC9, UC10, UC11 (US8): Mencari & Memesan Tiket untuk Pengunjung
router.get('/pesan-untuk-pengunjung', pemesananPengunjungController.searchTiketUntukPengunjung);
router.post('/pesan-untuk-pengunjung', pemesananPengunjungController.pesanUntukPengunjung);
router.get('/akun-pengunjung', pemesananPengunjungController.lihatTiketPengunjung);

// UC12 (US9): Melakukan Otorisasi Tiket
router.get('/otorisasi-tiket', otorisasiController.showFormOtorisasi);
router.post('/otorisasi-tiket', otorisasiController.otorisasiTiket);

module.exports = router;