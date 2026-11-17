// src/travel/controllers/pemesananController.js
// Controller untuk UC2: Memesan Tiket Pesawat (US2b)

const Penerbangan = require('../models/Penerbangan');
const Pemesanan = require('../models/Pemesanan');
const Tiket = require('../models/Tiket');

// Menampilkan form pemesanan dengan detail penerbangan yang sudah dipilih dari hasil pencarian
exports.showFormPemesanan = (req, res) => {
  const { penerbanganId } = req.query;

  if (!penerbanganId) {
    return res.render('pesan-tiket', {
      error: 'Mohon pilih penerbangan terlebih dahulu dari halaman pencarian',
      penerbangan: null,
      konfirmasi: null
    });
  }

  const penerbangan = Penerbangan.findById(penerbanganId);

  if (!penerbangan) {
    return res.render('pesan-tiket', { error: 'Penerbangan tidak ditemukan', penerbangan: null, konfirmasi: null });
  }

  res.render('pesan-tiket', { error: null, penerbangan, konfirmasi: null });
};

// Sesuai UC2 (US2b): proses pemesanan tiket
exports.pesanTiket = (req, res) => {
  const { penerbanganId, namaPenumpang, emailPenumpang } = req.body;

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

  const pemesananId = Pemesanan.create({
    penggunaId: null,
    pengunjungId: null,
    penerbanganId,
    namaPenumpang,
    emailPenumpang,
    jumlahPenumpang: 1,
    totalHarga: penerbangan.harga
  });

  Penerbangan.kurangiKursi(penerbanganId);

  const tiket = Tiket.generate(pemesananId);

  res.render('pesan-tiket', {
    error: null,
    penerbangan: null,
    konfirmasi: { ...tiket, namaPenumpang, penerbangan }
  });
};