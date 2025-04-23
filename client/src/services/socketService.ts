import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

/**
 * Socket.io event types enumeration
 */
export enum SocketEvents {
  USER_ACTIVITY = 'user_activity',
  ERROR = 'error'
}

/**
 * Service for managing Socket.io connections and event listeners
 * Provides a unified interface for real-time communication
 */
class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  /**
   * Initialize Socket.io connection
   * 
   * @returns {Socket | null} The socket instance
   */
  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      this.setupDefaultListeners();
      console.log('Socket.io: Connected to server');
    }
    return this.socket;
  }

  /**
   * Set up default event listeners for connection events
   * 
   * @private
   */
  private setupDefaultListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log(`Socket.io: Connected with ID ${this.socket?.id}`);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket.io: Disconnected, reason: ${reason}`);
    });

    this.socket.on('error', (error) => {
      console.error('Socket.io: Error', error);
    });
  }

  /**
   * Register an event listener
   * 
   * @template T Type of data received from the event
   * @param {string} event Event name to listen for
   * @param {function} callback Function to call when the event occurs
   * @returns {function} Function to remove this specific listener
   * @example
   * // Listen for user activity events
   * const unsubscribe = socketService.on('user_activity', (data) => {
   *   console.log('User activity:', data);
   * });
   * 
   * // Later, to stop listening:
   * unsubscribe();
   */
  on<T>(event: string, callback: (data: T) => void): () => void {
    if (!this.socket) {
      this.connect();
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
      
      // Configure the actual listener only once per event type
      this.socket?.on(event, (data: T) => {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
          eventListeners.forEach(listener => listener(data));
        }
      });
    }

    // Add callback to the set of listeners for this event
    this.listeners.get(event)?.add(callback);
    
    // Return a cleanup function
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
      }
    };
  }

  /**
   * Emit an event to the server
   * 
   * @template T Type of data to send with the event
   * @param {string} event Event name to emit
   * @param {T} data Data to send with the event
   * @returns {boolean} Whether the event was successfully emitted
   */
  emit<T>(event: string, data: T): boolean {
    if (!this.socket) {
      this.connect();
    }
    
    if (this.socket) {
      this.socket.emit(event, data);
      return true;
    }
    return false;
  }

  /**
   * Disconnect Socket.io connection and clear all listeners
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
      console.log('Socket.io: Manually disconnected');
    }
  }
}

// Export a singleton instance of the service
export const socketService = new SocketService();
export default socketService;