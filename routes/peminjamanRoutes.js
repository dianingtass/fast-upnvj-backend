const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const multer = require('multer');
const upload = multer({dest: '/tmp', limits: {fileSize: 50 * 1024 * 1024}});

router.post('/', upload.single('kak_uri'), peminjamanController.createPeminjaman);
router.put('/:id/status', upload.single('disposisi'), peminjamanController.updatePeminjaman);

module.exports = router;