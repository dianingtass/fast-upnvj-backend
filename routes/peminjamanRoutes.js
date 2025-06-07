const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });

/**
 * @swagger
 * tags:
 *   name: Peminjaman
 *   description: Manajemen pengajuan peminjaman fasilitas
 */

/**
 * @swagger
 * /peminjaman:
 *   get:
 *     summary: Ambil semua data peminjaman aktif
 *     tags: [Peminjaman]
 *     responses:
 *       200:
 *         description: Daftar peminjaman
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Peminjaman'
 */
router.get('/', peminjamanController.getAllPeminjaman);

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
 *             required:
 *               - id_user
 *               - id_fasilitas
 *               - tgl_pengajuan
 *               - tgl_pinjam
 *               - jam_mulai
 *               - jam_selesai
 *               - kak_uri
 *             properties:
 *               id_user:
 *                 type: integer
 *                 example: 1
 *               id_fasilitas:
 *                 type: integer
 *                 example: 2
 *               tgl_pengajuan:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-10"
 *               tgl_pinjam:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *               jam_mulai:
 *                 type: string
 *                 example: "08:00"
 *               jam_selesai:
 *                 type: string
 *                 example: "12:00"
 *               kak_uri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Peminjaman berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peminjaman'
 *       400:
 *         description: File KAK wajib diupload
 */
router.post('/', upload.single('kak_uri'), peminjamanController.createPeminjaman);

/**
 * @swagger
 * /peminjaman/{id}:
 *   get:
 *     summary: Ambil detail peminjaman berdasarkan ID
 *     tags: [Peminjaman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail peminjaman
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Peminjaman'
 *       404:
 *         description: Data tidak ditemukan
 */
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
 *             required:
 *               - proses
 *             properties:
 *               proses:
 *                 type: string
 *                 enum: [Diproses, Diterima, Ditolak, Dibatalkan]
 *                 example: "Diterima"
 *               notes:
 *                 type: string
 *                 example: "Approved by admin"
 *               disposisi:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Status berhasil diperbarui
 *       400:
 *         description: Status tidak valid
 *       404:
 *         description: Data tidak ditemukan
 */
router.put('/:id/status', upload.single('disposisi'), peminjamanController.updatePeminjaman);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Peminjaman
 *   description: Endpoint untuk peminjaman fasilitas
 */

/**
 * @swagger
 * /peminjaman:
 *   get:
 *     summary: Mendapatkan semua data peminjaman
 *     tags: [Peminjaman]
 *     responses:
 *       200:
 *         description: Daftar peminjaman
 */
