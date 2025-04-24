import axios from 'axios';
import type { User, UserCredentials, AuthResponse } from '../types/User';
import type { RegisterForm } from '../types/Auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * API instance with default configuration
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Request interceptor to add authentication token to requests
 */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  /**
   * Register a new user
   * 
   * @param {RegisterForm} userData - User registration data including email and password
   * @returns {Promise<AuthResponse>} Authentication response containing user data and token
   * @throws {Error} If registration fails
   */
  async register(userData: RegisterForm): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Authenticate a user with their credentials
   * 
   * @param {UserCredentials} credentials - User login credentials
   * @returns {Promise<AuthResponse>} Authentication response containing user data and token
   * @throws {Error} If authentication fails
   * @example
   * // Login a user
   * try {
   *   const authResponse = await authApi.login({
   *     email: 'user@example.com',
   *     password: 'password123'
   *   });
   *   console.log(`Logged in as ${authResponse.user.name}`);
   * } catch (error) {
   *   console.error('Login failed:', error);
   * }
   */
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    
    // Store token if present in the response
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  /**
   * Log out the current user
   * 
   * @returns {Promise<void>} Resolves when logout is complete
   * @throws {Error} If logout request fails
   */
  async logout(): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  /**
   * Verify if the current user is authenticated
   * 
   * @returns {Promise<User | null>} User object if authenticated, null if not
   */
  async checkAuth(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      return null;
    }
  },

  /**
   * Change the current user's password
   * 
   * @param {Object} data - Password change data
   * @param {string} data.currentPassword - Current user password
   * @param {string} data.newPassword - New password to set
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If password change fails
   */
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<any> {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
  
  /**
   * Resend verification email to the user
   * 
   * @param {Object} data - Email data
   * @param {string} data.email - Email address to send verification to
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If sending verification email fails
   */
  async resendVerificationEmail(data: { email: string }): Promise<any> {
    const response = await api.post('/auth/resend-verification-email', data);
    return response.data;
  },
  
  /**
   * Send verification code via SMS
   * 
   * @param {Object} data - Phone data
   * @param {string} data.phone - Phone number to send verification to
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If sending verification SMS fails
   */
  async sendPhoneVerification(data: { phone: string }): Promise<any> {
    const response = await api.post('/auth/send-phone-verification', data);
    return response.data;
  },
  
  /**
   * Verify SMS verification code
   * 
   * @param {Object} data - Verification data
   * @param {string} data.phone - Phone number to verify
   * @param {string} data.code - Verification code received via SMS
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If code verification fails
   */
  async verifyPhoneCode(data: { phone: string; code: string }): Promise<any> {
    const response = await api.post('/auth/verify-phone-code', data);
    return response.data;
  }
};

export const userApi = {
  /**
   * Get all users
   * 
   * @returns {Promise<User[]>} Array of user objects
   * @throws {Error} If fetching users fails
   */
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  /**
   * Get a specific user by ID
   * 
   * @param {number} id - User ID to fetch
   * @returns {Promise<User>} User object
   * @throws {Error} If user is not found or request fails
   */
  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create a new user
   * 
   * @param {UserCredentials} userData - User data to create
   * @returns {Promise<User>} Created user object
   * @throws {Error} If user creation fails
   */
  async createUser(userData: UserCredentials): Promise<User> {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Update user profile information
   * 
   * @param {any} userData - User profile data to update
   * @returns {Promise<User>} Updated user object
   * @throws {Error} If profile update fails
   */
  async updateUserProfile(userData: any): Promise<User> {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  /**
   * Update user address information
   * 
   * @param {any} addressData - Address data to update
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If address update fails
   */
  async updateUserAddress(addressData: any): Promise<any> {
    const response = await api.put('/users/address', addressData);
    return response.data;
  },
  
  /**
   * Update user contact information
   * 
   * @param {any} contactData - Contact data to update
   * @returns {Promise<any>} Response from the server
   * @throws {Error} If contact update fails
   */
  async updateUserContact(contactData: any): Promise<any> {
    const response = await api.put('/users/contact', contactData);
    return response.data;
  },
  
  /**
   * Upload user profile picture
   * 
   * @param {FormData} formData - Form data containing the image file
   * @returns {Promise<any>} Response from the server with uploaded image information
   * @throws {Error} If upload fails
   */
  async uploadProfilePicture(formData: FormData): Promise<any> {
    const response = await api.post('/users/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};


export default {
  authApi,
  userApi,
};