import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// Type pour les fonctions de référence des composants
type ErrorHandlerRef = {
  showError: (message: string) => void;
};

// État réactif pour stocker la référence au composant ErrorHandler
const state = reactive({
  errorHandlerRef: null as ErrorHandlerRef | null,
});

/**
 * Enregistre la référence au composant ErrorHandler
 * @param ref - Référence au composant ErrorHandler
 */
const registerErrorHandler = (ref: ErrorHandlerRef) => {
  state.errorHandlerRef = ref;
};

/**
 * Affiche un message d'erreur dans le modal
 * @param messageKey - Clé de traduction pour le message d'erreur
 * @param params - Paramètres optionnels pour la traduction
 */
const showError = (messageKey: string, params?: Record<string, any>) => {
  // Si le composant ErrorHandler n'est pas encore référencé, on log dans la console
  if (!state.errorHandlerRef) {
    console.error(`ErrorHandler non initialisé. Message: ${messageKey}`);
    return;
  }

  try {
    // Obtenir la fonction de traduction
    const { t } = useI18n();
    
    // Traduire le message et l'afficher
    const translatedMessage = t(messageKey, params || {});
    state.errorHandlerRef.showError(translatedMessage);
  } catch (error) {
    // Fallback en cas d'erreur dans la traduction
    console.error('Erreur lors de la traduction du message d\'erreur:', error);
    state.errorHandlerRef.showError(messageKey);
  }
};

/**
 * Gère une erreur et affiche un message approprié
 * @param error - L'erreur à traiter
 * @param defaultMessageKey - Clé de traduction pour le message d'erreur par défaut
 */
const handleError = (error: any, defaultMessageKey: string) => {
  console.error('Erreur détectée:', error);
  
  // Déterminer le message d'erreur approprié
  let messageKey = defaultMessageKey;
  
  // Si l'erreur est une réponse API avec un message spécifique
  if (error?.response?.data?.message) {
    // On pourrait avoir une logique pour mapper les messages d'erreur API aux clés de traduction
    showError(defaultMessageKey);
    return;
  }
  
  showError(messageKey);
};

export const errorService = {
  registerErrorHandler,
  showError,
  handleError
};