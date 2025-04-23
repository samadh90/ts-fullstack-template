/**
 * @file routes/auth.routes.ts
 * @description Authentication routes for login, register, token operations
 */

import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticateJWT } from '../utils'; // Import from utils index

const router = Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/logout', authenticateJWT, authController.logout);

router.post('/refresh-token', authController.refreshToken);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);

router.get('/verify-email/:Token', authController.verifyEmail);

router.post('/resend-verification-email', authController.resendVerificationEmail);

export default router;