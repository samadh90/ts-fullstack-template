import prisma from "../config/db";
import { verifyPassword } from "../utils";
import { IUserResponse } from "../interfaces/IAuth";

export const authModel = {
    /**
     * Authenticate a user with email and password
     * @param {string} email - User email address
     * @param {string} password - User password
     * @returns {Promise<IUserResponse | null>} - User data if authentication successful, null otherwise
     */
    async authenticateUser(email: string, password: string): Promise<IUserResponse | null> {
        try {
            // Find user by email
            const user = await prisma.user.findUnique({
                where: { Email: email },
                select: {
                    ID: true,
                    Username: true,
                    Email: true,
                    IsAdmin: true,
                    PasswordHash: true,
                    EmailVerified: true,
                    CreatedAt: true,
                },
            });

            if (!user) {
                return null;
            }

            // Verify password
            const isPasswordValid = await verifyPassword(password, user.PasswordHash);
            if (!isPasswordValid) {
                return null;
            }

            // Return user without password hash
            const { PasswordHash, ...userResponse } = user;
            return userResponse;
        } catch (error) {
            console.error("Authentication error:", error);
            return null;
        }
    },

    /**
     * Generate and store refresh token for a user
     * @param {number} userId - User ID to generate token for
     * @returns {Promise<string>} - Generated refresh token
     */
    async generateRefreshToken(userId: number): Promise<string> {
        // In a real app, you would store this in the database
        // For this template, we're just generating a token
        const token = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
        
        return token;
    },

    /**
     * Verify a refresh token
     * @param {string} token - Refresh token to verify
     * @returns {Promise<number | null>} - User ID if token is valid, null otherwise
     */
    async verifyRefreshToken(token: string): Promise<number | null> {
        // In a real app, you would verify the token from the database
        // For this template, we're returning null
        return null;
    }
};

export default authModel;
