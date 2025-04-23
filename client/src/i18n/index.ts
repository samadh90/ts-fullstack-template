/**
 * @file i18n/index.ts
 * @description Internationalization configuration for the application
 */

import { createI18n } from 'vue-i18n';
import fr from './fr';
import en from './en';

// Initial locale setup (will be properly initialized in main.ts)
const defaultLocale = localStorage.getItem('userLocale') || 'en';

// i18n configuration
const i18n = createI18n({
  legacy: false, // Enable Composition API mode
  globalInjection: true, // Make $t() available globally
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    fr,
    en
  }
});

export default i18n;