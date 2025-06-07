const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoint untuk autentikasi user
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nim
 *               - nama
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               nim:
 *                 type: string
 *               nama:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil terdaftar
 *       400:
 *         description: Validasi gagal
 */