const express = require('express');
const router = express.Router();
const fasilitasController = require('../controllers/fasilitasController');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });

/**
 * @swagger
 * tags:
 *   name: Fasilitas
 *   description: Manajemen data fasilitas
 */

/**
 * @swagger
 * /fasilitas:
 *   get:
 *     summary: Ambil semua fasilitas yang aktif
 *     tags: [Fasilitas]
 *     responses:
 *       200:
 *         description: List fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fasilitas'
 */
router.get('/', fasilitasController.getAllFasilitas);

/**
 * @swagger
 * /fasilitas/{id}:
 *   get:
 *     summary: Ambil fasilitas berdasarkan ID
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data fasilitas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fasilitas'
 *       404:
 *         description: Fasilitas tidak ditemukan
 */
router.get('/:id', fasilitasController.getFasilitasById);

/**
 * @swagger
 * /fasilitas:
 *   post:
 *     summary: Tambah fasilitas baru
 *     tags: [Fasilitas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nama_fasilitas
 *               - lokasi
 *               - pic
 *               - foto_uri
 *             properties:
 *               nama_fasilitas:
 *                 type: string
 *                 example: "Lab Komputer"
 *               lokasi:
 *                 type: string
 *                 example: "Gedung A, Lantai 2"
 *               pic:
 *                 type: string
 *                 example: "Dian Sastro"
 *               foto_uri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Fasilitas berhasil dibuat
 *       400:
 *         description: Foto wajib diupload
 */
router.post(
  '/',
  upload.single('foto_uri'),
  fasilitasController.createFasilitas
);

/**
 * @swagger
 * /fasilitas/{id}:
 *   put:
 *     summary: Update data fasilitas
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_fasilitas:
 *                 type: string
 *               lokasi:
 *                 type: string
 *               pic:
 *                 type: string
 *               foto_uri:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data fasilitas berhasil diupdate
 *       404:
 *         description: Fasilitas tidak ditemukan
 */
router.put(
  '/:id',
  upload.single('foto_uri'),
  fasilitasController.updateFasilitas
);

/**
 * @swagger
 * /fasilitas/{id}:
 *   delete:
 *     summary: Soft delete fasilitas
 *     tags: [Fasilitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fasilitas berhasil dihapus
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete('/:id', fasilitasController.deleteFasilitas);

module.exports = router;
