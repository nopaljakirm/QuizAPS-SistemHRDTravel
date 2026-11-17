// src/controllers/riwayatCutiController.js
// Controller untuk UC3: Melihat Riwayat dan Sisa Cuti Pegawai (US1c)

const Pegawai = require('../models/Pegawai');
const RiwayatCuti = require('../models/RiwayatCuti');

// UC3 (US1c): HRD manajer memilih nama pegawai, sistem tampilkan riwayat & sisa cuti
exports.getRiwayatCuti = (req, res) => {
  const { namaPegawai } = req.query;
  const tahunBerjalan = new Date().getFullYear();

  if (!namaPegawai) {
    return res.render('riwayat-cuti', {
      error: 'Mohon pilih nama pegawai terlebih dahulu',
      pegawai: null,
      riwayat: null
    });
  }

  const pegawai = Pegawai.findByNama(namaPegawai);

  if (!pegawai) {
    return res.render('riwayat-cuti', {
      error: `Pegawai dengan nama "${namaPegawai}" tidak ditemukan`,
      pegawai: null,
      riwayat: null
    });
  }

  const riwayat = RiwayatCuti.findByNipDanTahun(pegawai.nip, tahunBerjalan);

  res.render('riwayat-cuti', {
    error: null,
    pegawai,
    riwayat,
    tahunBerjalan
  });
};