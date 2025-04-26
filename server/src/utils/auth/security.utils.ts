/**
 * @file utils/auth/security.utils.ts
 * @description Security utilities for authentication, password hashing and JWT management.
 * @author Samad Hatsijev
 */

import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
    userId: number;
    email: string;
    username: string;
    isAdmin: boolean;
}

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

/**
 * Generates a random salt for password hashing.
 * @param length - Length of the salt in bytes (default is 16).
 * @returns {string} - Salt generated in hexadecimal format.
 */
export function generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString("hex");
}

/**
 * Generates a random security stamp for account security.
 * @returns {string} - Security stamp generated in hexadecimal format.
 */
export function generateSecurityStamp(): string {
    return crypto.randomBytes(32).toString("hex");
}

/**
 * Hashes a password using bcrypt.
 * @param password - Plain text password.
 * @returns {Promise<string>} - Hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifies if a password matches the stored hash.
 * @param password - Plain text password to verify.
 * @param storedHash - Stored hash of the password.
 * @returns {Promise<boolean>} - True if the password is correct, false otherwise.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    if (!password || !storedHash) {
        return false;
    }

    return await bcrypt.compare(password, storedHash);
}

/**
 * Generates a JWT token for authentication.
 * @param payload - Data to include in the token.
 * @returns {string} - Signed JWT token.
 */
export function generateJwtToken(payload: JwtPayload): string {
    const secret = process.env.JWT_SECRET as jwt.Secret;
    const expiresIn: string | number = process.env.JWT_EXPIRES_IN || "12h";

    // @ts-ignore
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

/**
 * Verifies and decodes a JWT token.
 * @param token - JWT token to verify.
 * @returns {JwtPayload | null} - Decoded payload or null if token is invalid.
 */
export function verifyJwtToken(token: string): JwtPayload | null {
    try {
        const secret = process.env.JWT_SECRET as jwt.Secret;
        const decoded = jwt.verify(token, secret) as JwtPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Middleware for authenticating requests with JWT.
 * @param req - Express request.
 * @param res - Express response.
 * @param next - Next function.
 * @returns {void}
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
        
        try {
            const decoded = verifyJwtToken(token);
            
            if (!decoded) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }
            
            // Add decoded user information to the request
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "Authorization required" });
    }
}

/**
 * Transition function to migrate users from old system to bcrypt.
 * @param oldHash - Hash from the old password system.
 * @param oldSalt - Salt from the old password system.
 * @param plainPassword - Plain text password to verify and migrate.
 * @returns {Promise<string | null>} - New bcrypt hash if successful, null otherwise.
 */
export async function migratePasswordToBcrypt(oldHash: string, oldSalt: string, plainPassword: string): Promise<string | null> {
    // Verify with the old MD5 method
    const oldHashCheck = crypto.createHash('md5').update(plainPassword + oldSalt).digest('hex');
    
    // If old password matches, create a new hash with bcrypt
    if (oldHashCheck === oldHash) {
        return await hashPassword(plainPassword);
    }
    
    return null; // Password doesn't match
}