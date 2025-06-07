const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const multer = require('multer');
const upload = multer({dest: '/tmp'});

router.get('/', peminjamanController.getAllPeminjaman);
router.post('/', upload.single('kak_uri'), peminjamanController.createPeminjaman);
router.get('/:id', peminjamanController.getPeminjamanById);
router.put('/:id/status', upload.single('disposisi'), peminjamanController.updatePeminjaman);

module.exports = router;