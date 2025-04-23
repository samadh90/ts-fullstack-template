/**
 * @file services/languageService.ts
 * @description Service to manage language preferences and detection
 */

import { useI18n } from 'vue-i18n';
import axios from 'axios';

// List of supported languages
const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'userLocale';

/**
 * Gets the user's preferred language
 * Order of priority:
 * 1. User stored preference (localStorage)
 * 2. Server-side stored preference (if user is logged in)
 * 3. Browser language
 * 4. Default language (en)
 */
export async function detectUserLanguage(): Promise<string> {
  // 1. Check localStorage first (fastest)
  const storedLanguage = localStorage.getItem(STORAGE_KEY);
  if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage;
  }
  
  // 2. If user is logged in, try to get language from server
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/users/preferences', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userLang = response.data?.language;
      if (userLang && SUPPORTED_LANGUAGES.includes(userLang)) {
        // Save to localStorage for future visits
        localStorage.setItem(STORAGE_KEY, userLang);
        return userLang;
      }
    } catch (error) {
      console.error('Error fetching user language preference:', error);
    }
  }
  
  // 3. Use browser language
  const browserLocale = navigator.language.split('-')[0];
  if (browserLocale && SUPPORTED_LANGUAGES.includes(browserLocale)) {
    localStorage.setItem(STORAGE_KEY, browserLocale);
    return browserLocale;
  }
  
  // 4. Fallback to default
  return DEFAULT_LANGUAGE;
}

/**
 * Sets the user's preferred language
 * @param language - The language code to set (e.g. 'en', 'fr')
 * @param saveToServer - Whether to save the preference to the server (requires login)
 */
export async function setUserLanguage(language: string, saveToServer = true): Promise<void> {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    console.error(`Unsupported language: ${language}`);
    return;
  }
  
  // Always save to localStorage
  localStorage.setItem(STORAGE_KEY, language);
  
  // Get i18n instance to update current application language
  const i18n = useI18n();
  i18n.locale.value = language;
  
  // If user is logged in and saveToServer is true, update server preference
  if (saveToServer) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('/api/users/preferences', 
          { language },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Error saving language preference to server:', error);
      }
    }
  }
}

/**
 * Gets the current active language
 */
export function getCurrentLanguage(): string {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
}

/**
 * Gets list of supported languages
 */
export function getSupportedLanguages(): string[] {
  return SUPPORTED_LANGUAGES;
}

export default {
  detectUserLanguage,
  setUserLanguage,
  getCurrentLanguage,
  getSupportedLanguages
};