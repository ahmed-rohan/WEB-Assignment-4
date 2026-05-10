const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUserById,
} = require('../controllers/userController');

// User registration route
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

// Get user by ID with posts
router.get('/:id', getUserById);

module.exports = router;
