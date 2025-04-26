import { reactive } from 'vue';

// Supported event types
export type EventType = 'auth:login' | 'auth:logout' | 'auth:register' | 'connection:status';

// Interface for event listeners
interface EventListener {
  (payload?: any): void;
}

// Reactive state to track state changes
export const eventBus = {
  state: reactive({
    authChanged: false,
    connectionStatus: true
  }),
  
  // Map to store listeners by event type
  listeners: new Map<EventType, EventListener[]>(),
  
  // Function to subscribe to an event
  on(event: EventType, callback: EventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    
    const eventListeners = this.listeners.get(event);
    eventListeners?.push(callback);
    
    // Returns a function to unsubscribe
    return () => {
      if (eventListeners) {
        const index = eventListeners.indexOf(callback);
        if (index > -1) {
          eventListeners.splice(index, 1);
        }
      }
    };
  },
  
  // Function to emit an event
  emit(event: EventType, payload?: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.forEach(callback => callback(payload));
    }
    
    // Update the appropriate state based on the event
    if (event === 'auth:login' || event === 'auth:logout' || event === 'auth:register') {
      this.state.authChanged = !this.state.authChanged;
    } else if (event === 'connection:status') {
      this.state.connectionStatus = payload?.connected ?? this.state.connectionStatus;
    }
  },
  
  // Function to emit an authentication change event (enhanced version)
  emitAuthChanged(eventType: 'auth:login' | 'auth:logout' | 'auth:register' = 'auth:login', payload?: any) {
    this.state.authChanged = !this.state.authChanged;
    this.emit(eventType, payload);
  }
};