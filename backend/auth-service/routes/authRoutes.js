const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/user/:id', authController.getUser);
router.patch('/user/:id', authController.updateUser);
router.delete('/user/:id', authController.deleteUser);
module.exports = router;
