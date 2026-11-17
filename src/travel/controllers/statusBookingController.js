// src/travel/controllers/statusBookingController.js
// Controller untuk UC8: Memeriksa dan Memfilter Status Booking (US7)

const Tiket = require('../models/Tiket');

exports.getStatusBooking = (req, res) => {
  const { filter } = req.query;

  // Sesuai Robustness Diagram UC8: tanpa filter -> tampilkan semua, dengan filter -> cari sesuai status
  const daftarTiket = filter ? Tiket.findByStatus(filter) : Tiket.findAll();

  res.render('status-booking', {
    error: null,
    data: daftarTiket,
    filterAktif: filter || null
  });
};