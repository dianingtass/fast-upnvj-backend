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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Email atau password salah
 */

/**
 * @swagger
 * /api/fasilitas:
 *   get:
 *     summary: Mendapatkan semua fasilitas
 *     tags: [Fasilitas]
 *     responses:
 *       200:
 *         description: List semua fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fasilitas'
 */

/**
 * @swagger
 * /api/peminjaman:
 *   post:
 *     summary: Membuat pengajuan peminjaman baru
 *     tags: [Peminjaman]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: kak_uri
 *         type: file
 *         description: File KAK (Kebutuhan Acara Kegiatan)
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
 *     responses:
 *       201:
 *         description: Peminjaman berhasil diajukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peminjaman'
 *       400:
 *         description: File KAK harus diupload
 */

/**
 * @swagger
 * /api/peminjaman/{id}/status:
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
 *     consumes:
 *       - multipart/form-data
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
 *         description: Status peminjaman berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peminjaman'
 *       404:
 *         description: Data peminjaman tidak ditemukan
 */