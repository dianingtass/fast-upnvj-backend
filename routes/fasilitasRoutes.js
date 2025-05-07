const express = require('express');
const router = express.Router();
const fasilitasController = require('../controllers/fasilitasController');

router.get('/', fasilitasController.getAllFasilitas);
router.get('/:id', fasilitasController.getFasilitasById);
router.post('/', fasilitasController.createFasilitas);
router.put('/:id', fasilitasController.updateFasilitas);
router.delete('/:id', fasilitasController.deleteFasilitas);

module.exports = router;
