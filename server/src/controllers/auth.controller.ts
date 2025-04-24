/**
 * @file controllers/auth.controller.ts
 * @description Authentication controller managing login, register, token operations.
 */

import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { authModel } from "../models/auth.model";
import { isValidEmail, formatError } from "../utils";
import { generateSecurityStamp, hashPassword, generateJwtToken } from "../utils";
import { 
    ILoginRequest, 
    IRegisterRequest,
    ILoginResponse, 
    IRegisterResponse,
    IForgotPasswordRequest, 
    IResetPasswordRequest,
    IVerifyEmailRequest,
    IResendEmailVerificationRequest,
    IRefreshTokenRequest,
    IRefreshTokenResponse
} from "../interfaces/IAuth";

import { IUserCreateRequest } from "../interfaces/IUser";

export const authController = {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { Email, Password } = req.body as ILoginRequest;

            // Data validation
            if (!Email || !Password) {
                res.status(400).json(formatError("Email and password required", 400));
                return;
            }

            // User authentication
            const user = await authModel.authenticateUser(Email, Password);
            if (!user) {
                res.status(401).json(formatError("Incorrect email or password", 401));
                return;
            }

            // Token generation
            const token = generateJwtToken({
                userId: user.ID,
                email: user.Email,
                isAdmin: user.IsAdmin || false
            });

            // Optional: Generate refresh token
            const refreshToken = await authModel.generateRefreshToken(user.ID);

            // Response with token
            const response: ILoginResponse = {
                Token: token,
                User: {
                    ID: user.ID,
                    Username: user.Username,
                    Email: user.Email,
                    IsAdmin: user.IsAdmin
                }
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json(formatError("Server error", 500));
        }
    },
    
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { Email, Password, Username } = req.body as IRegisterRequest;
            
            // Data validation
            if (!Email || !Password || !Username) {
                res.status(400).json(formatError("Email, password and username are required", 400));
                return;
            }
            
            if (!isValidEmail(Email)) {
                res.status(400).json(formatError("Invalid email format", 400));
                return;
            }
            
            // Check if email already exists
            const existingUser = await userModel.getUserByEmail(Email);
            if (existingUser) {
                res.status(409).json(formatError("This email is already in use", 409));
                return;
            }

            // Check if username already exists
            const existingUsername = await userModel.usernameExists(Username);
            if (existingUsername) {
                res.status(409).json(formatError("This username is already in use", 409));
                return;
            }
            
            // Create password hash with bcrypt
            const passwordHash = await hashPassword(Password);
            const securityStamp = generateSecurityStamp();
            
            // Create user
            const newUser: IUserCreateRequest = {
                Username,
                Email,
                PasswordHash: passwordHash,
                SecurityStamp: securityStamp
            };
            
            const createdUser = await userModel.createUser(newUser);
            
            // Token generation
            const token = generateJwtToken({
                userId: createdUser.ID,
                email: createdUser.Email,
                isAdmin: createdUser.IsAdmin || false
            });
            
            // Response with token
            const response: IRegisterResponse = {
                Token: token,
                User: {
                    ID: createdUser.ID,
                    Email: createdUser.Email,
                    Username: createdUser.Username,
                    IsAdmin: createdUser.IsAdmin
                }
            };
            
            res.status(201).json(response);
        } catch (error) {
            console.error("Register error:", error);
            res.status(500).json(formatError("Server error", 500));
        }
    },

    async logout(req: Request, res: Response): Promise<void> {
        try {
            // For JWT, client-side logout is usually sufficient
            // In a real app with refresh tokens, you would invalidate tokens here
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ message: "Server error during logout" });
        }
    },

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { RefreshToken } = req.body as IRefreshTokenRequest;
            
            if (!RefreshToken) {
                res.status(400).json(formatError("Refresh token is required", 400));
                return;
            }
            
            // Verify refresh token
            const userId = await authModel.verifyRefreshToken(RefreshToken);
            
            if (!userId) {
                res.status(401).json(formatError("Invalid refresh token", 401));
                return;
            }
            
            // Get user details
            const user = await userModel.getUserById(userId);
            
            if (!user) {
                res.status(401).json(formatError("User not found", 401));
                return;
            }
            
            // Generate new tokens
            const token = generateJwtToken({
                userId: user.ID,
                email: user.Email,
                isAdmin: user.IsAdmin || false
            });
            
            const newRefreshToken = await authModel.generateRefreshToken(user.ID);
            
            const response: IRefreshTokenResponse = {
                Token: token,
                RefreshToken: newRefreshToken
            };
            
            res.status(200).json(response);
        } catch (error) {
            console.error("Error refreshing token:", error);
            res.status(500).json(formatError("Server error during token refresh", 500));
        }
    },

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { Email } = req.body as IForgotPasswordRequest;

            if (!Email) {
                res.status(400).json(formatError("Email is required", 400));
                return;
            }

            // Check if user exists
            const user = await userModel.getUserByEmail(Email);
            
            if (!user) {
                // For security reasons, don't reveal if email exists
                res.status(200).json({ message: "If your email exists in our system, you will receive a password reset link" });
                return;
            }

            // In a real application:
            // 1. Generate a secure password reset token
            // 2. Save it to the database with expiration
            // 3. Send an email to the user with the reset link

            res.status(200).json({ message: "If your email exists in our system, you will receive a password reset link" });
        } catch (error) {
            console.error("Error during password reset request:", error);
            res.status(500).json(formatError("Server error during password reset request", 500));
        }
    },

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { Token, NewPassword } = req.body as IResetPasswordRequest;

            if (!Token || !NewPassword) {
                res.status(400).json(formatError("Token and new password are required", 400));
                return;
            }

            // In a real application:
            // 1. Verify the token from the database
            // 2. Check if it's expired
            // 3. Hash the new password
            // 4. Update the user's password
            // 5. Remove the used token

            res.status(200).json({ message: "Password reset successful" });
        } catch (error) {
            console.error("Error during password reset:", error);
            res.status(500).json(formatError("Server error during password reset", 500));
        }
    },

    async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { Token } = req.params as unknown as IVerifyEmailRequest;

            if (!Token) {
                res.status(400).json(formatError("Token is required", 400));
                return;
            }

            // In a real application:
            // 1. Verify the token from the database
            // 2. Set user's email as verified
            // 3. Remove the used token

            res.status(200).json({ message: "Email verified successfully" });
        } catch (error) {
            console.error("Error during email verification:", error);
            res.status(500).json(formatError("Server error during email verification", 500));
        }
    },

    async resendVerificationEmail(req: Request, res: Response): Promise<void> {
        try {
            const { Email } = req.body as IResendEmailVerificationRequest;

            if (!Email) {
                res.status(400).json(formatError("Email is required", 400));
                return;
            }

            // Check if user exists
            const user = await userModel.getUserByEmail(Email);
            
            if (!user) {
                // For security reasons, don't reveal if email exists
                res.status(200).json({ message: "If your email exists in our system, you will receive a verification email" });
                return;
            }

            // In a real application:
            // 1. Generate a new verification token
            // 2. Save it to the database
            // 3. Send a new verification email

            res.status(200).json({ message: "If your email exists in our system, you will receive a verification email" });
        } catch (error) {
            console.error("Error resending verification email:", error);
            res.status(500).json(formatError("Server error during verification email resend", 500));
        }
    },
};

export default authController;