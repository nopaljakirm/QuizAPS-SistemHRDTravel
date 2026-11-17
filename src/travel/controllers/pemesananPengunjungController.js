// src/controllers/pemesananPengunjungController.js
// Controller untuk UC9, UC10, UC11: Mencari & Memesan Tiket untuk Pengunjung (US8)
// UC9 meng-<<include>> UC10 dan UC11 secara mandatory

const Penerbangan = require('../models/Penerbangan');
const Pengunjung = require('../models/Pengunjung');
const Pemesanan = require('../models/Pemesanan');
const Tiket = require('../models/Tiket');

// UC9 (bagian pencarian): manajer travel mencari tiket penerbangan tertentu
exports.searchTiketUntukPengunjung = (req, res) => {
  const { kotaAsal, kotaTujuan } = req.query;

  if (!kotaAsal || !kotaTujuan) {
    return res.render('pesan-untuk-pengunjung', {
      error: 'Mohon masukkan kota asal dan kota tujuan',
      data: null,
      konfirmasi: null
    });
  }

  const daftarPenerbangan = Penerbangan.findByRute(kotaAsal, kotaTujuan);

  res.render('pesan-untuk-pengunjung', {
    error: null,
    data: daftarPenerbangan,
    konfirmasi: null,
    kotaAsal,
    kotaTujuan
  });
};

// UC9 (bagian pemesanan) + <<include>> UC10 + <<include>> UC11
exports.pesanUntukPengunjung = (req, res) => {
  const { penerbanganId, namaPengunjung, emailPengunjung, nomorIdentitas } = req.body;

  const penerbangan = Penerbangan.findById(penerbanganId);

  if (!penerbangan) {
    return res.render('pesan-untuk-pengunjung', {
      error: 'Penerbangan tidak ditemukan',
      data: null,
      konfirmasi: null
    });
  }

  const tersedia = Penerbangan.cekKetersediaan(penerbanganId);
  if (!tersedia) {
    return res.render('pesan-untuk-pengunjung', {
      error: 'Kursi untuk penerbangan ini sudah habis',
      data: null,
      konfirmasi: null
    });
  }

  // Simpan data pengunjung (bagian dari task a US8)
  const pengunjung = Pengunjung.create({ nama: namaPengunjung, email: emailPengunjung, nomorIdentitas });

  // Buat pemesanan atas nama pengunjung
  const pemesananId = Pemesanan.create({
    penggunaId: null,
    pengunjungId: pengunjung.id,
    penerbanganId,
    jumlahPenumpang: 1,
    totalHarga: penerbangan.harga
  });

  Penerbangan.kurangiKursi(penerbanganId);

  const tiket = Tiket.generate(pemesananId);

  // <<include>> UC10: tiket otomatis tampil di akun pengunjung (tidak perlu aksi tambahan,
  // karena query findTiketByPengunjungId sudah menghubungkan lewat pemesanan.pengunjung_id)

  // <<include>> UC11: kirim e-tiket (simulasi - tandai terkirim)
  Tiket.kirimEtiket(tiket.kode_booking_reference);

  res.render('pesan-untuk-pengunjung', {
    error: null,
    data: null,
    konfirmasi: { ...tiket, pengunjung, penerbangan }
  });
};

// UC10: Pengunjung melihat tiket yang telah terpesan di akunnya
exports.lihatTiketPengunjung = (req, res) => {
  const { pengunjungId } = req.query;

  if (!pengunjungId) {
    return res.render('akun-pengunjung', { error: 'Mohon masukkan ID pengunjung', data: null });
  }

  const pengunjung = Pengunjung.findById(pengunjungId);

  if (!pengunjung) {
    return res.render('akun-pengunjung', { error: 'Pengunjung tidak ditemukan', data: null });
  }

  const daftarTiket = Pengunjung.findTiketByPengunjungId(pengunjungId);

  res.render('akun-pengunjung', {
    error: null,
    pengunjung,
    data: daftarTiket
  });
};