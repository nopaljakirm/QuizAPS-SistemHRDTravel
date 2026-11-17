// app.js
// Entry point Sistem HRD (Manajemen Cuti)

const express = require('express');
const path = require('path');

const hrdRoutes = require('./src/routes/hrdRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
app.use('/', hrdRoutes);

app.listen(PORT, () => {
  console.log(`Sistem HRD berjalan di http://localhost:${PORT}`);
});