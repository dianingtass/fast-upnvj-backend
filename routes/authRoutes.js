const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

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
 *                 example: "123456789"
 *               nama:
 *                 type: string
 *                 example: "Budi Santoso"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "budi@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User berhasil terdaftar
 *       400:
 *         description: Validasi gagal
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "budi@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login berhasil, token dikembalikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: Email atau password salah
 */
router.post('/login', authController.login);

module.exports = router;
