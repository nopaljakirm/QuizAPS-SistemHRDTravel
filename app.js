// app.js
// Entry point gabungan: Sistem HRD + Sistem Travel
// Pendekatan: Modular Monolith - 1 server, 2 modul terpisah dengan prefix path berbeda

const express = require('express');
const path = require('path');

const hrdRoutes = require('./src/hrd/routes/hrdRoutes');
const travelRoutes = require('./src/travel/routes/travelRoutes');

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

// Middleware untuk membaca data form (POST request) - dibutuhkan Sistem Travel
app.use(express.urlencoded({ extended: true }));

// Setup view engine EJS dengan multiple views directory
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'src/views'),
  path.join(__dirname, 'src/hrd/views'),
  path.join(__dirname, 'src/travel/views')
]);

// Halaman utama (landing page)
app.get('/', (req, res) => {
  res.render('home');
});

// Modul HRD - semua route diawali /hrd
app.use('/hrd', hrdRoutes);

// Modul Travel - semua route diawali /travel
app.use('/travel', travelRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`- Sistem HRD: http://localhost:${PORT}/hrd`);
  console.log(`- Sistem Travel: http://localhost:${PORT}/travel`);
});