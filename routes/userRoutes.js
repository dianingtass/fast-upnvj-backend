const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });

// GET & CREATE
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

// UPDATE & DELETE
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// PROFILE
router.get('/profile/:id', userController.getUserProfile);
router.put('/profile/:id', upload.single('foto_profil'), userController.updateUserProfile);

module.exports = router;
