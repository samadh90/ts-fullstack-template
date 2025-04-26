import { reactive } from 'vue';

// Types d'événements supportés
export type EventType = 'auth:login' | 'auth:logout' | 'auth:register' | 'connection:status';

// Interface pour les listeners d'événements
interface EventListener {
  (payload?: any): void;
}

// State réactif pour suivre les changements d'état
export const eventBus = {
  state: reactive({
    authChanged: false,
    connectionStatus: true
  }),
  
  // Map pour stocker les listeners par type d'événement
  listeners: new Map<EventType, EventListener[]>(),
  
  // Fonction pour s'abonner à un événement
  on(event: EventType, callback: EventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    
    const eventListeners = this.listeners.get(event);
    eventListeners?.push(callback);
    
    // Retourne une fonction pour se désabonner
    return () => {
      if (eventListeners) {
        const index = eventListeners.indexOf(callback);
        if (index > -1) {
          eventListeners.splice(index, 1);
        }
      }
    };
  },
  
  // Fonction pour émettre un événement
  emit(event: EventType, payload?: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.forEach(callback => callback(payload));
    }
    
    // Mettre à jour l'état approprié en fonction de l'événement
    if (event === 'auth:login' || event === 'auth:logout' || event === 'auth:register') {
      this.state.authChanged = !this.state.authChanged;
    } else if (event === 'connection:status') {
      this.state.connectionStatus = payload?.connected ?? this.state.connectionStatus;
    }
  },
  
  // Fonction pour émettre un événement de changement d'authentification (version améliorée)
  emitAuthChanged(eventType: 'auth:login' | 'auth:logout' | 'auth:register' = 'auth:login', payload?: any) {
    this.state.authChanged = !this.state.authChanged;
    this.emit(eventType, payload);
  }
};