// src/routes/hrdRoutes.js
// Boundary layer: routing untuk Sistem HRD
// Sesuai Use Case Diagram HRD (UC1, UC2, UC3)

const express = require('express');
const router = express.Router();

const pengajuanCutiController = require('../controllers/pengajuanCutiController');
const riwayatCutiController = require('../controllers/riwayatCutiController');

// Halaman utama (menu navigasi)
router.get('/', (req, res) => {
  res.render('index');
});

// UC1 (US1): Melihat pengajuan cuti berdasarkan periode
router.get('/pengajuan-periode', pengajuanCutiController.getPengajuanByPeriode);

// UC2 (US1b): Melihat detail pengajuan cuti
router.get('/detail-pengajuan', pengajuanCutiController.getDetailPengajuan);

// UC3 (US1c): Melihat riwayat dan sisa cuti pegawai
router.get('/riwayat-cuti', riwayatCutiController.getRiwayatCuti);

module.exports = router;