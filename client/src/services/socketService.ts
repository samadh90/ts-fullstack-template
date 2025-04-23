import { io, Socket } from 'socket.io-client';
import type { Trade } from '../types/Trade';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

// Énumération des événements Socket.io
export enum SocketEvents {
  NEW_TRADE = 'new_trade',
  TRADE_UPDATED = 'trade_updated',
  TRADE_DELETED = 'trade_deleted',
  PRICE_UPDATE = 'price_update',
  USER_ACTIVITY = 'user_activity',
  ERROR = 'error'
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  // Initialiser la connexion Socket.io
  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      this.setupDefaultListeners();
      console.log('Socket.io: Connecté au serveur');
    }
    return this.socket;
  }

  // Configurer les écouteurs par défaut
  private setupDefaultListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log(`Socket.io: Connecté avec ID ${this.socket?.id}`);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket.io: Déconnecté, raison: ${reason}`);
    });

    this.socket.on('error', (error) => {
      console.error('Socket.io: Erreur', error);
    });
  }

  // Ajouter un écouteur d'événement
  on<T>(event: string, callback: (data: T) => void): () => void {
    if (!this.socket) {
      this.connect();
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
      
      // Configurer l'écouteur réel seulement une fois par type d'événement
      this.socket?.on(event, (data: T) => {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
          eventListeners.forEach(listener => listener(data));
        }
      });
    }

    // Ajouter le callback à l'ensemble des écouteurs pour cet événement
    this.listeners.get(event)?.add(callback);
    
    // Retourner une fonction de nettoyage
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
      }
    };
  }

  // Écouteur spécifique pour les nouvelles transactions
  onNewTrade(callback: (trade: Trade) => void): () => void {
    return this.on<Trade>(SocketEvents.NEW_TRADE, callback);
  }

  // Écouteur pour les transactions supprimées
  onTradeDeleted(callback: (data: { id: number }) => void): () => void {
    return this.on<{ id: number }>(SocketEvents.TRADE_DELETED, callback);
  }

  // Écouteur pour les mises à jour de prix
  onPriceUpdate(callback: (data: { asset: string, price: number }) => void): () => void {
    return this.on<{ asset: string, price: number }>(SocketEvents.PRICE_UPDATE, callback);
  }

  // Déconnecter Socket.io
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
      console.log('Socket.io: Déconnecté manuellement');
    }
  }
}

// Exporter une instance singleton du service
export const socketService = new SocketService();
export default socketService;