// src/controllers/pemesananController.js
// Controller untuk UC2: Memesan Tiket Pesawat (US2b)

const Penerbangan = require('../models/Penerbangan');
const Pemesanan = require('../models/Pemesanan');
const Tiket = require('../models/Tiket');

// Form pemilihan tiket (ditampilkan sebelum konfirmasi pesan)
exports.showFormPemesanan = (req, res) => {
  const { penerbanganId } = req.query;
  const penerbangan = Penerbangan.findById(penerbanganId);

  if (!penerbangan) {
    return res.render('pesan-tiket', { error: 'Penerbangan tidak ditemukan', penerbangan: null, konfirmasi: null });
  }

  res.render('pesan-tiket', { error: null, penerbangan, konfirmasi: null });
};

// Sesuai UC2 (US2b): proses pemesanan tiket
exports.pesanTiket = (req, res) => {
  const { penerbanganId, namaPenumpang } = req.body;

  const penerbangan = Penerbangan.findById(penerbanganId);

  if (!penerbangan) {
    return res.render('pesan-tiket', { error: 'Penerbangan tidak ditemukan', penerbangan: null, konfirmasi: null });
  }

  const tersedia = Penerbangan.cekKetersediaan(penerbanganId);

  if (!tersedia) {
    return res.render('pesan-tiket', {
      error: 'Mohon maaf, kursi untuk penerbangan ini sudah habis',
      penerbangan,
      konfirmasi: null
    });
  }

  // Controller mengoordinasikan beberapa entity (sesuai Sequence Diagram UC2)
  const pemesananId = Pemesanan.create({
    penggunaId: null, // sementara belum ada sistem login, bisa dikembangkan
    pengunjungId: null,
    penerbanganId,
    jumlahPenumpang: 1,
    totalHarga: penerbangan.harga
  });

  Penerbangan.kurangiKursi(penerbanganId);

  const tiket = Tiket.generate(pemesananId);

  res.render('pesan-tiket', {
    error: null,
    penerbangan,
    konfirmasi: { ...tiket, namaPenumpang }
  });
};