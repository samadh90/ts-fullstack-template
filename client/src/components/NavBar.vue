<template>
  <nav class="bg-crypto-card shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and main navigation -->
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center text-crypto-primary text-xl font-bold">
            {{ $t('navbar.title') }}
          </router-link>
          
          <!-- Main navigation (desktop version) -->
          <div class="hidden md:ml-10 md:flex md:space-x-4">
            <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium" 
              :class="[$route.path === '/' ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
              {{ $t('navbar.home') }}
            </router-link>
          </div>
        </div>

        <!-- User menu -->
        <div class="flex items-center">
          <!-- Language selector -->
          <div class="ml-3 relative lang-menu">
            <button @click="langMenuOpen = !langMenuOpen" class="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              <span :class="['flag-icon', getFlagClass(locale)]" class="w-5 h-5 mr-2"></span>
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-show="langMenuOpen" class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-crypto-card ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-10">
              <a href="#" @click.prevent="changeLanguage('fr')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                <span class="flag-icon flag-icon-fr w-5 h-5 inline mr-2"></span> Français
              </a>
              <a href="#" @click.prevent="changeLanguage('en')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                <span class="flag-icon flag-icon-gb w-5 h-5 inline mr-2"></span> English
              </a>
            </div>
          </div>

          <!-- User menu -->
          <div class="ml-3 relative user-menu" v-if="isAuthenticated">
            <button @click="userMenuOpen = !userMenuOpen" class="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              <span class="mr-2 font-semibold text-white bg-gradient-to-r from-crypto-primary to-crypto-secondary px-3 py-1 rounded-lg shadow-lg">
                {{ userName }}
              </span>
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-show="userMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-crypto-card ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-10">
              <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" @click="userMenuOpen = false">
                {{ $t('navbar.profile') }}
              </router-link>
              <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" @click="userMenuOpen = false">
                {{ $t('navbar.settings') }}
              </router-link>
              <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                {{ $t('navbar.logout') }}
              </a>
            </div>
          </div>

          <!-- Login button (if not connected) -->
          <div v-else>
            <router-link to="/login" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('navbar.login') }}
            </router-link>
            <router-link to="/register" class="bg-crypto-primary hover:bg-crypto-secondary text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('navbar.register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { eventBus } from '../services/eventBus';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const { locale } = useI18n();
const isAuthenticated = ref(false);
const userMenuOpen = ref(false);
const langMenuOpen = ref(false);
const userName = ref('');

// Decode JWT token to extract username
const decodeToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    try {
      const decoded: { username: string } = jwtDecode(token);
      userName.value = decoded.username || '';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
};

// Function to check if user is logged in
const checkAuthentication = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  isAuthenticated.value = !!token;

  if (isAuthenticated.value) {
    decodeToken();
  }
};

// Watch for authentication changes via eventBus
watch(() => eventBus.state.authChanged, () => {
  checkAuthentication();
});

// Close dropdown menus when clicking elsewhere
const closeMenus = (e: MouseEvent) => {
  // Don't close if clicking on the menu itself or its buttons
  const langMenuElement = document.querySelector('.lang-menu');
  const userMenuElement = document.querySelector('.user-menu');
  
  if (langMenuElement && !langMenuElement.contains(e.target as Node)) {
    langMenuOpen.value = false;
  }
  
  if (userMenuElement && !userMenuElement.contains(e.target as Node)) {
    userMenuOpen.value = false;
  }
};

// Check authentication when component loads and add listener to close menus
onMounted(() => {
  checkAuthentication();
  document.addEventListener('click', closeMenus);
});

// Clean up event listeners when component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenus);
});

// Logout function
const handleLogout = () => {
  // Remove authentication token
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem('userData');
  
  // Update authentication state
  isAuthenticated.value = false;
  userMenuOpen.value = false;
  
  // Emit an event to inform other components
  eventBus.emit('auth:logout');
  
  // Redirect to login page
  router.push('/login');
};

// Function to change language
const changeLanguage = (lang: string) => {
  locale.value = lang;
  
  // Save language preference in localStorage to preserve it
  localStorage.setItem('preferredLanguage', lang);
  
  // Close language menu after selection
  langMenuOpen.value = false;
};

// Function to get flag class based on locale
const getFlagClass = (locale: string) => {
  const flags: Record<string, string> = {
    en: 'fi fi-gb',
    fr: 'fi fi-fr',
  };
  return flags[locale] || 'flag-icon-unknown';
};
</script>

<style scoped>
.lang-menu, .user-menu {
  position: relative;
}
</style>