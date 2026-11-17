// app.js
// Entry point Sistem Travel/Tiket Pesawat

const express = require('express');
const path = require('path');

const travelRoutes = require('./src/routes/travelRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware untuk membaca data form (POST request)
app.use(express.urlencoded({ extended: true }));

// Setup view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
app.use('/', travelRoutes);

app.listen(PORT, () => {
  console.log(`Sistem Travel berjalan di http://localhost:${PORT}`);
});