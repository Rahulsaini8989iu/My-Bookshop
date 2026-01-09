const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all users (SuperAdmin only)
router.get('/all', authMiddleware, userController.getAllUsers);

// Create new user (SuperAdmin can create any type of user)
router.post('/create', authMiddleware, userController.createUser);

// Update user role
router.patch('/role/:id', authMiddleware, userController.updateUserRole);

// Update user profile (SuperAdmin can edit any user)
router.put('/:id', authMiddleware, userController.updateUser);

// Delete user
router.delete('/:id', authMiddleware, userController.deleteUser);

// Get user by ID
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;