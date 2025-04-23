import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

// Events for Socket.io communication
export enum SocketEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  USER_ACTIVITY = 'user_activity',
  ERROR = 'error'
}

export class SocketService {
  /**
   * SocketService class for managing Socket.io connections and events.
   * This class is responsible for initializing the Socket.io server and handling events.
   */
  private io: Server;

  /**
   * Constructor for the SocketService class.
   * @param server - The HTTP server instance to attach the Socket.io server to.
   */
  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
      }
    });

    this.setupEventHandlers();
  }

  // Setup event handlers for socket events
  // This is where you can add more event listeners for different events

  /**
   * Setup event handlers for socket events.
   * This method is called in the constructor to initialize the event listeners.
   * @returns {void}
   */
  private setupEventHandlers(): void {
    this.io.on(SocketEvents.CONNECT, (socket: Socket) => {
      console.log(`Nouvelle connexion socket: ${socket.id}`);

      // Écouter les déconnexions
      socket.on(SocketEvents.DISCONNECT, () => {
        console.log(`Socket déconnecté: ${socket.id}`);
      });
    });
  }

  /**
   * Emit a user activity event to all connected clients.
   * This method can be used to notify clients about user activities such as login, logout, etc.
   * @param userId - The ID of the user whose activity is being emitted.
   * @param activity - The activity being emitted (e.g., 'login', 'logout').
   * @returns {void}
   */
  public emitUserActivity(userId: number, activity: string): void {
    this.io.emit(SocketEvents.USER_ACTIVITY, { userId, activity });
  }

  /**
   * Emit a custom event to all connected clients.
   * This method can be used to send custom events to clients.
   * @param event - The name of the event to emit.
   * @param data - The data to send with the event.
   * @returns {void}
   */
  public emit(event: string, data: any): void {
    this.io.emit(event, data);
  }

  /**
   * Get the Socket.io server instance.
   * This method can be used to access the Socket.io server instance for further configuration or usage.
   * @returns {Server} - The Socket.io server instance.
   */
  public getIO(): Server {
    return this.io;
  }
}

let socketService: SocketService | null = null;

/**
 * Initialize the SocketService with the provided HTTP server.
 * This function creates a new instance of SocketService if it doesn't already exist.
 * @param server - The HTTP server instance to attach the Socket.io server to.
 * @returns {SocketService} - The SocketService instance.
 */
export const initSocketService = (server: HttpServer): SocketService => {
  if (!socketService) {
    socketService = new SocketService(server);
  }
  return socketService;
};

/**
 * Get the SocketService instance.
 * This function returns the existing SocketService instance if it has been initialized.
 * If it hasn't been initialized, it returns null.
 * @returns {SocketService | null} - The SocketService instance or null if not initialized.
 */
export const getSocketService = (): SocketService | null => {
  return socketService;
};