const express = require('express');
const router = express.Router();
const fasilitasController = require('../controllers/fasilitasController');
const multer = require('multer');
const upload = multer({ dest: '/tmp'});

router.get('/', fasilitasController.getAllFasilitas);
router.get('/:id', fasilitasController.getFasilitasById);
router.post('/', upload.single('foto_uri'), fasilitasController.createFasilitas);
router.put('/:id', upload.single('foto_uri'), fasilitasController.updateFasilitas);
router.delete('/:id', fasilitasController.deleteFasilitas);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Fasilitas
 *   description: Endpoint untuk pengelolaan fasilitas
 */

/**
 * @swagger
 * /fasilitas:
 *   get:
 *     summary: Mendapatkan semua fasilitas
 *     tags: [Fasilitas]
 *     responses:
 *       200:
 *         description: Daftar fasilitas
 */
