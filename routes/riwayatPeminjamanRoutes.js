const express = require('express');
const router = express.Router();
const riwayatPeminjamanController = require('../controllers/riwayatPeminjamanController');

router.get('/user/:id', riwayatPeminjamanController.getRiwayatPeminjaman);
router.get('/peminjaman/:id', riwayatPeminjamanController.getRiwayatPeminjamanById);

module.exports = router;