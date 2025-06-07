const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: '/tmp', limits: {fileSize: 50 * 1024 * 1024}});

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/profile/:id', userController.getUserProfile);
router.put('/profile/:id', upload.single('foto_profil'), userController.updateUserProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoint untuk user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Daftar user
 */
