import axios from 'axios';
import type { User, UserCredentials, RegisterCredentials, AuthResponse } from '../types/User';
import type { Trade, NewTrade } from '../types/Trade';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur qui ajoute le token d'authentification aux requêtes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  // Inscription d'un nouvel utilisateur
  async register(userData: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Connexion d'un utilisateur
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    
    // Stockage du token si présent dans la réponse
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  // Déconnexion
  async logout(): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  // Vérification du token (si l'utilisateur est connecté)
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

  // Changement de mot de passe
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<any> {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
  
  // Renvoyer l'email de vérification
  async resendVerificationEmail(data: { email: string }): Promise<any> {
    const response = await api.post('/auth/resend-verification-email', data);
    return response.data;
  },
  
  // Envoyer un code de vérification par SMS
  async sendPhoneVerification(data: { phone: string }): Promise<any> {
    const response = await api.post('/auth/send-phone-verification', data);
    return response.data;
  },
  
  // Vérifier le code reçu par SMS
  async verifyPhoneCode(data: { phone: string; code: string }): Promise<any> {
    const response = await api.post('/auth/verify-phone-code', data);
    return response.data;
  }
};

export const userApi = {
  // Récupérer tous les utilisateurs
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  // Récupérer un utilisateur par son ID
  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Créer un nouvel utilisateur
  async createUser(userData: UserCredentials): Promise<User> {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Mettre à jour les informations du profil
  async updateUserProfile(userData: any): Promise<User> {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  // Mettre à jour l'adresse
  async updateUserAddress(addressData: any): Promise<any> {
    const response = await api.put('/users/address', addressData);
    return response.data;
  },
  
  // Mettre à jour les informations de contact
  async updateUserContact(contactData: any): Promise<any> {
    const response = await api.put('/users/contact', contactData);
    return response.data;
  },
  
  // Uploader une photo de profil
  async uploadProfilePicture(formData: FormData): Promise<any> {
    const response = await api.post('/users/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export const tradeApi = {
  // Récupérer toutes les transactions
  async getTrades(): Promise<Trade[]> {
    const response = await api.get('/trades');
    return response.data;
  },

  // Récupérer les transactions d'un utilisateur
  async getTradesByUserId(userId: number): Promise<Trade[]> {
    const response = await api.get(`/trades/user/${userId}`);
    return response.data;
  },

  // Récupérer une transaction par son ID
  async getTradeById(id: number): Promise<Trade> {
    const response = await api.get(`/trades/${id}`);
    return response.data;
  },

  // Créer une nouvelle transaction
  async createTrade(tradeData: NewTrade): Promise<Trade> {
    const response = await api.post('/trades', tradeData);
    return response.data;
  },

  // Supprimer une transaction
  async deleteTrade(id: number): Promise<void> {
    await api.delete(`/trades/${id}`);
  }
};

export default {
  authApi,
  userApi,
  tradeApi
};