const express = require('express');
const router = express.Router();
const riwayatPeminjamanController = require('../controllers/riwayatPeminjamanController');

router.get('/user/:id', riwayatPeminjamanController.getRiwayatPeminjaman);
router.get('/peminjaman/:id', riwayatPeminjamanController.getRiwayatPeminjamanById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Riwayat Peminjaman
 *   description: Endpoint untuk riwayat peminjaman user
 */

/**
 * @swagger
 * /riwayat-peminjaman/user/{id}:
 *   get:
 *     summary: Riwayat peminjaman berdasarkan user ID
 *     tags: [Riwayat Peminjaman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Daftar riwayat peminjaman
 */
