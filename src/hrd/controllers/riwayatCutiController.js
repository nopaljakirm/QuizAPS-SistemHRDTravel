// src/hrd/controllers/riwayatCutiController.js
// Controller untuk UC3: Melihat Riwayat dan Sisa Cuti Pegawai (US1c)

const Pegawai = require('../models/Pegawai');
const RiwayatCuti = require('../models/RiwayatCuti');

// Sesuai UC3 (US1c): HRD manajer memilih nama pegawai, sistem tampilkan riwayat & sisa cuti
exports.getRiwayatCuti = (req, res) => {
  const { nipPegawai } = req.query;
  const tahunBerjalan = new Date().getFullYear();
  const daftarPegawai = Pegawai.findAll();

  if (!nipPegawai) {
    return res.render('riwayat-cuti', {
      error: null,
      daftarPegawai,
      pegawai: null,
      riwayat: null,
      tahunBerjalan
    });
  }

  const pegawai = Pegawai.findByNip(nipPegawai);

  if (!pegawai) {
    return res.render('riwayat-cuti', {
      error: 'Pegawai tidak ditemukan',
      daftarPegawai,
      pegawai: null,
      riwayat: null,
      tahunBerjalan
    });
  }

  const riwayat = RiwayatCuti.findByNipDanTahun(pegawai.nip, tahunBerjalan);

  res.render('riwayat-cuti', {
    error: null,
    daftarPegawai,
    pegawai,
    riwayat,
    tahunBerjalan
  });
};