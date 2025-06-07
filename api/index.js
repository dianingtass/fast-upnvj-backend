const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const fasilitasRoutes = require('../routes/fasilitasRoutes');
const peminjamanRoutes = require('../routes/peminjamanRoutes');
const riwayatPeminjamanRoutes = require('../routes/riwayatPeminjamanRoutes');
const adminDashboardRoutes = require('../routes/adminDashboardRoutes');

const app = express();

app.get("/", (req, res) => {
  res.send("Back-End FAST UPNVJ\nCapstone Project\nStudy Club KSM Android 2025");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fasilitas', fasilitasRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/riwayat-peminjaman', riwayatPeminjamanRoutes);
app.use('/api/admin', adminDashboardRoutes);

module.exports = app;