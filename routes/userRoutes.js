const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../controllers/userController');

// Register Route
router.post('/register', registerController);

// Login Route
router.post('/login', loginController);

module.exports = router;
