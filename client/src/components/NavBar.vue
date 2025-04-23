<template>
  <nav class="bg-crypto-card shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo et navigation principale -->
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center text-crypto-primary text-xl font-bold">
            {{ $t('navbar.cryptoTradeBot') }}
          </router-link>
          
          <!-- Navigation principale (version desktop) -->
          <div class="hidden md:ml-10 md:flex md:space-x-4">
            <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium" 
              :class="[$route.path === '/' ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
              {{ $t('navbar.home') }}
            </router-link>
            <!-- Affiche les liens supplémentaires seulement si connecté -->
            <template v-if="isLoggedIn">
              <router-link to="/trades" class="px-3 py-2 rounded-md text-sm font-medium"
                :class="[$route.path.includes('/trades') ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                {{ $t('navbar.trades') }}
              </router-link>
            </template>
          </div>
        </div>
        
        <div class="flex items-center">
          <!-- Barre de recherche -->
          <div class="hidden md:block mx-4">
            <div class="relative">
              <input type="text" :placeholder="$t('navbar.search')" 
                class="bg-gray-800 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary w-64">
              <button class="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Menu utilisateur (non connecté) -->
          <div class="hidden md:flex items-center" v-if="!isLoggedIn">
            <router-link to="/login" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('navbar.login') }}
            </router-link>
            <router-link to="/register" class="bg-crypto-primary hover:bg-crypto-secondary text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ $t('navbar.register') }}
            </router-link>
          </div>
          
          <!-- Menu utilisateur (connecté) -->
          <div class="hidden md:flex items-center space-x-2" v-else>
            <div class="relative user-menu">
              <button @click.stop="toggleUserMenu" class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-crypto-primary">
                <span class="text-white border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                  {{ user?.username?.charAt(0) || 'U' }}
                </span>
              </button>
              <!-- Dropdown menu -->
              <div v-show="userMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-crypto-card ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-10">
                <router-link to="/dashboard" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" @click="userMenuOpen = false">
                  {{ $t('navbar.dashboard') }}
                </router-link>
                <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" @click="userMenuOpen = false">
                  {{ $t('navbar.profile') }}
                </router-link>
                <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" @click="userMenuOpen = false">
                  {{ $t('navbar.settings') }}
                </router-link>
                <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  {{ $t('navbar.logout') }}
                </a>
              </div>
            </div>
          </div>
          
          <!-- Sélecteur de langue -->
          <div class="ml-3 relative lang-menu">
            <button @click.stop="toggleLangMenu" class="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ currentLanguage }}
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-show="langMenuOpen" class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-crypto-card ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-10">
              <a href="#" @click.prevent="changeLocale('fr')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Français
              </a>
              <a href="#" @click.prevent="changeLocale('en')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                English
              </a>
            </div>
          </div>
          
          <!-- Bouton menu mobile -->
          <div class="flex md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <svg class="h-6 w-6" :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Menu mobile -->
    <div class="md:hidden" :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/" class="block px-3 py-2 rounded-md text-base font-medium" 
          :class="[$route.path === '/' ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
          {{ $t('navbar.home') }}
        </router-link>
        <!-- Affiche les liens supplémentaires seulement si connecté -->
        <template v-if="isLoggedIn">
          <router-link to="/trades" class="block px-3 py-2 rounded-md text-base font-medium"
            :class="[$route.path.includes('/trades') ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
            {{ $t('navbar.trades') }}
          </router-link>
          <router-link to="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium"
            :class="[$route.path === '/dashboard' ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
            {{ $t('navbar.dashboard') }}
          </router-link>
        </template>
      </div>
      
      <!-- Barre de recherche mobile -->
      <div class="px-4 pt-2 pb-4">
        <div class="relative">
          <input type="text" :placeholder="$t('navbar.search')" 
            class="bg-gray-800 w-full rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-crypto-primary">
          <button class="absolute right-0 top-0 mt-2 mr-4 text-gray-400 hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Menu utilisateur mobile -->
      <div class="pt-4 pb-3 border-t border-gray-700" v-if="!isLoggedIn">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <router-link to="/login" class="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              {{ $t('navbar.login') }}
            </router-link>
          </div>
          <div class="ml-3">
            <router-link to="/register" class="block bg-crypto-primary hover:bg-crypto-secondary text-white px-3 py-2 rounded-md text-base font-medium">
              {{ $t('navbar.register') }}
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Menu utilisateur mobile (connecté) -->
      <div class="pt-4 pb-3 border-t border-gray-700" v-else>
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <span class="text-white border border-gray-600 rounded-full h-10 w-10 flex items-center justify-center bg-gray-700">
              {{ user?.username?.charAt(0) || 'U' }}
            </span>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user?.username || 'Utilisateur' }}</div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <router-link to="/profile" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            {{ $t('navbar.profile') }}
          </router-link>
          <router-link to="/settings" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            {{ $t('navbar.settings') }}
          </router-link>
          <a href="#" @click.prevent="logout" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            {{ $t('navbar.logout') }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { authApi } from '../services/api';
import type { User } from '../types/User';

// État de connexion avec l'API
const isLoggedIn = ref(false);
const user = ref<User | null>(null);
const { t, locale } = useI18n();
const router = useRouter();

// États des menus déroulants
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const langMenuOpen = ref(false);

// Langue actuelle
const currentLanguage = computed(() => {
  return locale.value === 'fr' ? 'FR' : 'EN';
});

// Vérification de l'état d'authentification au chargement
onMounted(async () => {
  await checkAuthentication();
  
  // Charger la langue depuis le localStorage si disponible
  const savedLocale = localStorage.getItem('userLocale');
  if (savedLocale) {
    locale.value = savedLocale;
  }
  
  // Ajouter l'écouteur d'événements pour les clics sur le document
  document.addEventListener('click', handleClickOutside);
});

// Supprimer l'écouteur d'événements quand le composant est détruit
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Vérification de l'état d'authentification
const checkAuthentication = async () => {
  try {
    const userData = await authApi.checkAuth();
    if (userData) {
      isLoggedIn.value = true;
      user.value = userData;
    } else {
      isLoggedIn.value = false;
      user.value = null;
    }
  } catch (error) {
    isLoggedIn.value = false;
    user.value = null;
  }
};

// Changement de langue
const changeLocale = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('userLocale', lang);
  langMenuOpen.value = false; // Fermer le menu après sélection
};

// Déconnexion
const logout = async () => {
  try {
    await authApi.logout();
    isLoggedIn.value = false;
    user.value = null;
    userMenuOpen.value = false; // Fermer le menu après déconnexion
    router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

// Fonctions de basculement des menus
const toggleUserMenu = (event: Event) => {
  event.stopPropagation(); // Empêche la propagation de l'événement
  userMenuOpen.value = !userMenuOpen.value;
  // Si nous ouvrons le menu utilisateur, fermons le menu de langue
  if (userMenuOpen.value) {
    langMenuOpen.value = false;
  }
};

const toggleLangMenu = (event: Event) => {
  event.stopPropagation(); // Empêche la propagation de l'événement
  langMenuOpen.value = !langMenuOpen.value;
  // Si nous ouvrons le menu de langue, fermons le menu utilisateur
  if (langMenuOpen.value) {
    userMenuOpen.value = false;
  }
};

// Fermeture des menus si on clique en dehors
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  
  // Vérifier si le clic est en dehors du menu utilisateur
  const userMenuElement = document.querySelector('.user-menu');
  if (userMenuOpen.value && userMenuElement && !userMenuElement.contains(target)) {
    userMenuOpen.value = false;
  }
  
  // Vérifier si le clic est en dehors du menu de langue
  const langMenuElement = document.querySelector('.lang-menu');
  if (langMenuOpen.value && langMenuElement && !langMenuElement.contains(target)) {
    langMenuOpen.value = false;
  }
};
</script>