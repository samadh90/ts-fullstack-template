/**
 * @file models/userModel.ts
 * @description User model with database operations
 */

import prisma from '../config/db';
import { IUser, IUserCreateInput, IUserResponse } from '../interfaces/IUser';

export const userModel = {
  // Get all users
  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await prisma.user.findMany({
      select: {
        ID: true,
        Username: true,
        Email: true,
        IsAdmin: true,
        PasswordHash: true,
        CreatedAt: true
      }
    });
    return users;
  },

  // Get user by ID
  async getUserById(id: number): Promise<IUserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        passwordHash: true,
        createdAt: true
      }
    });
    return user;
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<IUserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        passwordHash: true,
        createdAt: true
      }
    });
    return user;
  },

  // Create a new user
  async createUser(userData: IUserCreateInput): Promise<IUserResponse> {
    const newUser = await prisma.user.create({
      data: {
        Username: userData.Username,
        Email: userData.Email,
        PasswordHash: userData.PasswordHash,
        SecurityStamp: userData.SecurityStamp,
        IsAdmin: userData.isAdmin || false,
        EmailVerified: false, // By default, email is not verified
        PhoneVerified: false,
        F2aEnabled: false
      },
      select: {
        ID: true,
        Username: true,
        Email: true,
        IsAdmin: true,
        PasswordHash: true,
        CreatedAt: true
      }
    });
    return newUser;
  },

  // Check if email already exists
  async emailExists(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email }
    });
    return count > 0;
  },

  // Check if username already exists
  async usernameExists(username: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { username }
    });
    return count > 0;
  },

  // Check if phone number already exists
  async phoneExists(phone: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { phone }
    });
    return count > 0;
  },

  // Count total number of users
  async countUsers(): Promise<number> {
    const count = await prisma.user.count();
    return count;
  },
};

export default userModel;