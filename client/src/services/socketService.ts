import { io, Socket } from 'socket.io-client';
import { ref } from 'vue';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

/**
 * Socket.io event types enumeration
 */
export enum SocketEvents {
  USER_ACTIVITY = 'user_activity',
  ERROR = 'error',
  CONNECTION_CHANGE = 'connection_change' // New event for connection status changes
}

/**
 * Connection status types
 */
export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting'
}

/**
 * Service for managing Socket.io connections and event listeners
 * Provides a unified interface for real-time communication
 */
class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();
  private reconnectionTimer: number | null = null;
  private reconnectionInterval = 5000; // Augmenté à 5 secondes entre les tentatives de reconnexion
  
  // Reactive connection status that components can watch
  public connectionStatus = ref<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  public reconnectAttempts = ref<number>(0);
  
  /**
   * Initialize Socket.io connection
   * 
   * @returns {Socket | null} The socket instance
   */
  connect() {
    if (!this.socket) {
      this.connectionStatus.value = ConnectionStatus.CONNECTING;
      
      this.socket = io(SOCKET_URL, {
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        autoConnect: false // We'll handle reconnection manually
      });
      
      this.setupDefaultListeners();
      
      // Connect the socket
      this.socket.connect();
      console.log('Socket.io: Connecting to server...');
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
      this.connectionStatus.value = ConnectionStatus.CONNECTED;
      this.reconnectAttempts.value = 0;
      
      // Clear any reconnection timer
      if (this.reconnectionTimer) {
        clearTimeout(this.reconnectionTimer);
        this.reconnectionTimer = null;
      }
      
      // Notify listeners about connection change
      this.notifyConnectionChange({
        status: ConnectionStatus.CONNECTED,
        timestamp: new Date()
      });
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket.io: Disconnected, reason: ${reason}`);
      this.connectionStatus.value = ConnectionStatus.DISCONNECTED;
      
      // Start reconnection process if not manually disconnected
      if (reason !== 'io client disconnect') {
        this.startReconnectionProcess();
      }
      
      // Notify listeners about connection change
      this.notifyConnectionChange({
        status: ConnectionStatus.DISCONNECTED,
        reason,
        timestamp: new Date()
      });
    });
    
    this.socket.on('connect_error', (error) => {
      console.log(`Socket.io: Connection error: ${error.message}`);
      this.connectionStatus.value = ConnectionStatus.DISCONNECTED;
      
      // Start reconnection process
      this.startReconnectionProcess();
      
      // Notify listeners about connection change
      this.notifyConnectionChange({
        status: ConnectionStatus.DISCONNECTED,
        error: error.message,
        timestamp: new Date()
      });
    });
    
    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Socket.io: Socket.io reconnection attempt ${attempt}`);
      // We'll still listen to this event, but we're handling reconnection manually
    });
    
    this.socket.on('error', (error) => {
      console.error('Socket.io: Error', error);
      
      // Notify listeners about error
      const eventListeners = this.listeners.get(SocketEvents.ERROR);
      if (eventListeners) {
        eventListeners.forEach(listener => listener(error));
      }
    });
  }
  
  /**
   * Start the manual reconnection process
   * 
   * @private
   */
  private startReconnectionProcess() {
    // Clear any existing reconnection timer
    if (this.reconnectionTimer) {
      clearTimeout(this.reconnectionTimer);
      this.reconnectionTimer = null;
    }
    
    // Set status to connecting and increment attempt counter
    this.connectionStatus.value = ConnectionStatus.CONNECTING;
    this.reconnectAttempts.value++;
    
    console.log(`Socket.io: Manual reconnection attempt ${this.reconnectAttempts.value}`);
    
    // Notify about the reconnection attempt
    this.notifyConnectionChange({
      status: ConnectionStatus.CONNECTING,
      attempt: this.reconnectAttempts.value,
      timestamp: new Date()
    });
    
    // If we've reached our maximum reconnection attempts (10)
    if (this.reconnectAttempts.value > 10) {
      console.log('Socket.io: Maximum reconnection attempts reached');
      this.connectionStatus.value = ConnectionStatus.DISCONNECTED;
      
      this.notifyConnectionChange({
        status: ConnectionStatus.DISCONNECTED,
        final: true,
        timestamp: new Date()
      });
      return;
    }
    
    // Clear any existing reconnection timer
    if (this.reconnectionTimer) {
      clearTimeout(this.reconnectionTimer);
    }
    
    // Attempt reconnection after a timeout
    this.reconnectionTimer = window.setTimeout(() => {
      if (this.socket) {
        console.log(`Socket.io: Attempting to reconnect...`);
        this.socket.connect();
        
        // If we're still not connected after the attempt, try again
        if (this.socket && !this.socket.connected) {
          this.startReconnectionProcess();
        }
      } else {
        // If socket was destroyed, create a new one
        this.socket = null;
        this.connect();
      }
    }, this.reconnectionInterval);
  }
  
  /**
   * Notify listeners about connection status changes
   * 
   * @private
   * @param {Object} data Connection status data
   */
  private notifyConnectionChange(data: any) {
    const eventListeners = this.listeners.get(SocketEvents.CONNECTION_CHANGE);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
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
    // Clear any reconnection timer
    if (this.reconnectionTimer) {
      clearTimeout(this.reconnectionTimer);
      this.reconnectionTimer = null;
    }
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
      this.connectionStatus.value = ConnectionStatus.DISCONNECTED;
      this.reconnectAttempts.value = 0;
      console.log('Socket.io: Manually disconnected');
    }
  }
}

// Export a singleton instance of the service
export const socketService = new SocketService();
export default socketService;