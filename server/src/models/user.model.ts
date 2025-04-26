/**
 * @file models/users.model.ts
 * @description User model with database operations
 */

import prisma from '../config/db';
import { IUserModel, IUserCreateRequest } from '../interfaces/IUser';

export const userModel = {
  // Get all users
  async getAllUsers(): Promise<IUserModel[]> {
    const users = await prisma.users.findMany({
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      },
      where: {
        DeletedAt: null
      }
    });
    return users;
  },

  // Get user by ID
  async getUserById(id: number): Promise<IUserModel | null> {
    const user = await prisma.users.findUnique({
      where: { 
        ID: id,
        DeletedAt: null 
      },
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      }
    });
    return user;
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<IUserModel | null> {
    const user = await prisma.users.findUnique({
      where: { 
        Email: email,
        DeletedAt: null
      },
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      }
    });
    return user;
  },

  // Create a new user
  async createUser(userData: IUserCreateRequest): Promise<IUserModel> {
    const normalizedEmail = userData.Email.toUpperCase();
    
    const newUser = await prisma.users.create({
      data: {
        Username: userData.Username,
        Email: userData.Email,
        NormalizedEmail: normalizedEmail,
        PasswordHash: userData.PasswordHash,
        SecurityStamp: userData.SecurityStamp,
        IsAdmin: false,
        EmailVerified: false,
        PhoneVerified: false,
        F2aEnabled: false,
      },
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      }
    });
    return newUser;
  },

  // Update user profile
  async updateUserProfile(id: number, profileData: { FirstName?: string; LastName?: string; DateOfBirth?: Date }): Promise<IUserModel | null> {
    const updatedUser = await prisma.users.update({
      where: { ID: id },
      data: profileData,
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      }
    });
    return updatedUser;
  },

  // Update user address
  async updateUserAddress(id: number, addressData: { Country?: string; State?: string; City?: string; Street?: string; PostalCode?: string }): Promise<IUserModel | null> {
    const updatedUser = await prisma.users.update({
      where: { ID: id },
      data: addressData,
      select: {
        ID: true,
        Username: true,
        Email: true,
        NormalizedEmail: true,
        EmailVerified: true,
        Phone: true,
        PhoneVerified: true,
        F2aEnabled: true,
        IsAdmin: true,
        FirstName: true,
        LastName: true,
        DateOfBirth: true,
        Country: true,
        State: true,
        Street: true,
        City: true,
        PostalCode: true,
        LastLogin: true,
        CreatedAt: true,
        ModifiedAt: true,
        SecurityStamp: true,
        DeletedAt: true
      }
    });
    return updatedUser;
  },

  // Soft delete user
  async softDeleteUser(id: number): Promise<void> {
    await prisma.users.update({
      where: { ID: id },
      data: { DeletedAt: new Date() }
    });
  },

  // Check if email already exists
  async emailExists(email: string): Promise<boolean> {
    const count = await prisma.users.count({
      where: { 
        Email: email,
        DeletedAt: null
      }
    });
    return count > 0;
  },

  // Check if username already exists
  async usernameExists(username: string): Promise<boolean> {
    const count = await prisma.users.count({
      where: { 
        Username: username,
        DeletedAt: null
      }
    });
    return count > 0;
  },

  // Check if phone number already exists
  async phoneExists(phone: string): Promise<boolean> {
    if (!phone) return false;
    
    const count = await prisma.users.count({
      where: { 
        Phone: phone,
        DeletedAt: null
      }
    });
    return count > 0;
  },

  // Count total number of users
  async countUsers(): Promise<number> {
    const count = await prisma.users.count({
      where: { DeletedAt: null }
    });
    return count;
  },
};

export default userModel;