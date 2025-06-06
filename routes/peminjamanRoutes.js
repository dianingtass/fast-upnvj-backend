const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const uploadDisposisi = require('../middleware/disposisi');

router.put('/:id/status', uploadDisposisi.single('disposisi_file'), peminjamanController.updatePeminjaman);

module.exports = router;