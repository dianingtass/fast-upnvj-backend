const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: '/tmp', limits: { fileSize: 50 * 1024 * 1024 } });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen data pengguna
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Ambil semua pengguna
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Ambil detail pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data pengguna berhasil ditemukan
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Buat pengguna baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nim:
 *                 type: string
 *               nama:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               program_studi:
 *                 type: string
 *               fakultas:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pengguna berhasil dibuat
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update data pengguna
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nim:
 *                 type: string
 *               nama:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               program_studi:
 *                 type: string
 *               fakultas:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pengguna berhasil diupdate
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Hapus pengguna (soft delete)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 */
router.delete('/:id', userController.deleteUser);

router.get('/profile/:id', userController.getUserProfile);

router.put('/profile/:id', upload.single('foto_profil'), userController.updateUserProfile);

module.exports = router;