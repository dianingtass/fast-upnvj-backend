const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const multer = require('multer');
const upload = multer({dest: '/tmp'});

router.get('/', peminjamanController.getAllPeminjaman);

/**
 * @swagger
 * tags:
 *   name: Peminjaman
 *   description: Manajemen pengajuan peminjaman fasilitas
 */

/**
 * @swagger
 * /peminjaman:
 *   post:
 *     summary: Buat pengajuan peminjaman baru
 *     tags: [Peminjaman]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *               id_fasilitas:
 *                 type: integer
 *               tgl_pengajuan:
 *                 type: string
 *                 format: date
 *               tgl_pinjam:
 *                 type: string
 *                 format: date
 *               jam_mulai:
 *                 type: string
 *               jam_selesai:
 *                 type: string
 *               kak_uri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peminjaman'
 */
router.post('/', upload.single('kak_uri'), peminjamanController.createPeminjaman);

router.get('/:id', peminjamanController.getPeminjamanById);

/**
 * @swagger
 * /peminjaman/{id}/status:
 *   put:
 *     summary: Update status peminjaman
 *     tags: [Peminjaman]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               proses:
 *                 type: string
 *                 enum: [Diproses, Diterima, Ditolak, Dibatalkan]
 *               notes:
 *                 type: string
 *               disposisi:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id/status', upload.single('disposisi'), peminjamanController.updatePeminjaman);

module.exports = router;
