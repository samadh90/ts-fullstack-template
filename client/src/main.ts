import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { detectUserLanguage } from './services/languageService'

// Initialize the app
const app = createApp(App)

// Use router
app.use(router)

// Use i18n
app.use(i18n)

// Detect and set user language before mounting
function initApp() {
    // Detect user language and set it in i18n
    detectUserLanguage()
        .then(detectedLanguage => {
            i18n.global.locale.value = detectedLanguage
        })
        .catch(error => {
            console.error('Error initializing language:', error)
        })
        .finally(() => {
            // Mount the application
            app.mount('#app')
        });
}

// Start the app
initApp()
