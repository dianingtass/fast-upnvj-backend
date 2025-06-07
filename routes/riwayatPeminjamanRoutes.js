const express = require('express');
const router = express.Router();
const riwayatPeminjamanController = require('../controllers/riwayatPeminjamanController');

/**
 * @swagger
 * tags:
 *   name: Riwayat Peminjaman
 *   description: Melihat riwayat peminjaman berdasarkan user atau ID peminjaman
 */

/**
 * @swagger
 * /riwayat-peminjaman/user/{id}:
 *   get:
 *     summary: Ambil daftar riwayat peminjaman milik user tertentu
 *     tags: [Riwayat Peminjaman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: Daftar riwayat peminjaman berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_fasilitas:
 *                     type: integer
 *                   fasilitas_nama:
 *                     type: string
 *                   tgl_pengajuan:
 *                     type: string
 *                     format: date
 *                   tgl_pinjam:
 *                     type: string
 *                     format: date
 *                   jam_mulai:
 *                     type: string
 *                   jam_selesai:
 *                     type: string
 *                   proses:
 *                     type: string
 *                   notes:
 *                     type: string
 *                     nullable: true
 *                   status:
 *                     type: integer
 *       500:
 *         description: Terjadi kesalahan di server
 */
router.get('/user/:id', riwayatPeminjamanController.getRiwayatPeminjaman);

/**
 * @swagger
 * /riwayat-peminjaman/peminjaman/{id}:
 *   get:
 *     summary: Ambil detail peminjaman berdasarkan ID
 *     tags: [Riwayat Peminjaman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID peminjaman
 *     responses:
 *       200:
 *         description: Detail peminjaman berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_fasilitas:
 *                   type: integer
 *                 fasilitas_nama:
 *                   type: string
 *                 tgl_pengajuan:
 *                   type: string
 *                   format: date
 *                 tgl_pinjam:
 *                   type: string
 *                   format: date
 *                 jam_mulai:
 *                   type: string
 *                 jam_selesai:
 *                   type: string
 *                 proses:
 *                   type: string
 *                 notes:
 *                   type: string
 *                   nullable: true
 *                 kak_uri:
 *                   type: string
 *                   nullable: true
 *                 disposisi_uri:
 *                   type: string
 *                   nullable: true
 *                 status:
 *                   type: integer
 *       404:
 *         description: Riwayat tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan di server
 */
router.get('/peminjaman/:id', riwayatPeminjamanController.getRiwayatPeminjamanById);

module.exports = router;
