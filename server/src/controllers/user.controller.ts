/**
 * @file controllers/user.controller.ts
 * @description User management controller for retrieving and managing user data.
 */

import { Request, Response } from "express";
import userModel from "../models/user.model";
import { formatError } from "../utils";

export const userController = {
    async me(req: Request, res: Response): Promise<void> {
        try {
            // User is already authenticated via authentication middleware
            if (!req.user) {
                res.status(401).json(formatError("Not authenticated", 401));
                return;
            }

            // Get user details from database
            const user = await userModel.getUserById(req.user.userId);

            if (!user) {
                res.status(404).json(formatError("User not found", 404));
                return;
            }

            // Return user information without sensitive data
            res.status(200).json({
                User: {
                    ID: user.ID,
                    Email: user.Email,
                    Username: user.Username,
                    IsAdmin: user.IsAdmin,
                },
            });
        } catch (error) {
            console.error("Error retrieving profile:", error);
            res.status(500).json(formatError("Server error", 500));
        }
    },

    // Get all users
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error retrieving users:", error);
            res.status(500).json({ message: "Server error while retrieving users" });
        }
    },

    // Get user by ID
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);

            if (isNaN(userId)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }

            const user = await userModel.getUserById(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({ message: "Server error while retrieving user" });
        }
    },
};

export default userController;
