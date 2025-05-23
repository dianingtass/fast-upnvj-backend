const express = require('express');
const router = express.Router();
const fasilitasController = require('../controllers/fasilitasController');
const upload = require('../middleware/fasilitas_foto');

router.get('/', fasilitasController.getAllFasilitas);
router.get('/:id', fasilitasController.getFasilitasById);
router.post('/', upload.single('foto_uri'), fasilitasController.createFasilitas);
router.put('/:id', upload.single('foto_uri'), fasilitasController.updateFasilitas);
router.delete('/:id', fasilitasController.deleteFasilitas);

module.exports = router;
