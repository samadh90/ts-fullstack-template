/**
 * @file routes/user.routes.ts
 * @description User management routes
 */

import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticateJWT } from '../utils'; // Import from utils index


const router = Router();

// Route to get all users
router.get('/', userController.getAllUsers);

router.get('/me', authenticateJWT, userController.me); // /me route protected by JWT

// Route to get user by ID
router.get('/:id', userController.getUserById);

export default router;