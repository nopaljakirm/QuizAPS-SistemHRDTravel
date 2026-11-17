// src/controllers/pengajuanCutiController.js
// Controller untuk UC1 & UC2: Melihat Pengajuan Cuti berdasarkan Periode (US1, US1b)
// Mengikuti alur Robustness & Sequence Diagram: Boundary -> Controller -> Entity

const PengajuanCuti = require('../models/PengajuanCuti');

// UC1 (US1): HRD manajer memilih periode, sistem tampilkan data pegawai yang mengajukan cuti
exports.getPengajuanByPeriode = (req, res) => {
  const { periodeMulai, periodeSelesai } = req.query;

  if (!periodeMulai || !periodeSelesai) {
    return res.render('pengajuan-periode', {
      error: 'Mohon pilih periode terlebih dahulu',
      data: null
    });
  }

  const daftarPengajuan = PengajuanCuti.findByPeriode(periodeMulai, periodeSelesai);

  res.render('pengajuan-periode', {
    error: null,
    data: daftarPengajuan,
    periodeMulai,
    periodeSelesai
  });
};

// UC2 (US1b): HRD manajer melihat detail pengajuan cuti (nama, periode, lama cuti)
exports.getDetailPengajuan = (req, res) => {
  const { periodeMulai, periodeSelesai } = req.query;

  if (!periodeMulai || !periodeSelesai) {
    return res.render('detail-pengajuan', {
      error: 'Mohon pilih periode terlebih dahulu',
      data: null
    });
  }

  const detail = PengajuanCuti.findDetailByPeriode(periodeMulai, periodeSelesai);

  res.render('detail-pengajuan', {
    error: null,
    data: detail,
    periodeMulai,
    periodeSelesai
  });
};