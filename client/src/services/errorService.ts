import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// Type for component reference functions
type ErrorHandlerRef = {
  showError: (message: string) => void;
};

// Reactive state to store the ErrorHandler component reference
const state = reactive({
  errorHandlerRef: null as ErrorHandlerRef | null,
});

/**
 * Register the reference to the ErrorHandler component
 * @param ref - Reference to the ErrorHandler component
 */
const registerErrorHandler = (ref: ErrorHandlerRef) => {
  state.errorHandlerRef = ref;
};

/**
 * Display an error message in the modal
 * @param messageKey - Translation key for the error message
 * @param params - Optional parameters for translation
 */
const showError = (messageKey: string, params?: Record<string, any>) => {
  // If the ErrorHandler component is not yet referenced, log to the console
  if (!state.errorHandlerRef) {
    console.error(`ErrorHandler not initialized. Message: ${messageKey}`);
    return;
  }

  try {
    // Get the translation function
    const { t } = useI18n();
    
    // Translate the message and display it
    const translatedMessage = t(messageKey, params || {});
    state.errorHandlerRef.showError(translatedMessage);
  } catch (error) {
    // Fallback in case of error during translation
    console.error('Error while translating error message:', error);
    state.errorHandlerRef.showError(messageKey);
  }
};

/**
 * Handle an error and display an appropriate message
 * @param error - The error to process
 * @param defaultMessageKey - Translation key for the default error message
 */
const handleError = (error: any, defaultMessageKey: string) => {
  console.error('Error detected:', error);
  
  // Determine the appropriate error message
  let messageKey = defaultMessageKey;
  
  // If the error is an API response with a specific message
  if (error?.response?.data?.message) {
    // We could have logic to map API error messages to translation keys
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