<template>
  <nav class="bg-crypto-card shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo et navigation principale -->
        <div class="flex items-center">
          <router-link to="/" class="flex-shrink-0 flex items-center text-crypto-primary text-xl font-bold">
            {{ $t('navbar.title') }}
          </router-link>
          
          <!-- Navigation principale (version desktop) -->
          <div class="hidden md:ml-10 md:flex md:space-x-4">
            <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium" 
              :class="[$route.path === '/' ? 'bg-crypto-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
              {{ $t('navbar.home') }}
            </router-link>
            <!-- Affiche les liens supplémentaires seulement si connecté - lien profil déplacé dans le menu utilisateur -->
            <template v-if="isAuthenticated">
              <!-- Le lien profil a été retiré d'ici et laissé uniquement dans le menu utilisateur -->
            </template>
          </div>
        </div>

        <!-- Menu utilisateur -->
        <div class="flex items-center">
          <!-- Sélection de langue -->
          <div class="ml-3 relative lang-menu">
            <button @click="langMenuOpen = !langMenuOpen" class="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              {{ locale }}
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-show="langMenuOpen" class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-crypto-card ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-10">
              <a href="#" @click.prevent="changeLanguage('fr')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Français
              </a>
              <a href="#" @click.prevent="changeLanguage('en')" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                English
              </a>
            </div>
          </div>

          <!-- Menu utilisateur -->
          <div class="ml-3 relative user-menu" v-if="isAuthenticated">
            <button @click="userMenuOpen = !userMenuOpen" class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-crypto-primary">
              <span class="text-white border border-gray-600 rounded-full h-8 w-8 flex items-center justify-center bg-gray-700">
                {{ userName.charAt(0) || 'U' }}
              </span>
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

          <!-- Bouton de connexion (si non connecté) -->
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

const router = useRouter();
const { t, locale } = useI18n();
const isAuthenticated = ref(false);
const userMenuOpen = ref(false);
const langMenuOpen = ref(false);
const userName = ref('');
const userEmail = ref('');

// Fonction pour vérifier si l'utilisateur est connecté
const checkAuthentication = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  isAuthenticated.value = !!token;
  
  if (isAuthenticated.value) {
    // Récupérer les infos utilisateur depuis le localStorage si disponible
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        userName.value = userData.username || '';
        userEmail.value = userData.email || '';
      } catch (e) {
        console.error('Erreur lors du parsing des données utilisateur:', e);
      }
    }
  }
};

// Surveiller les changements d'authentification via eventBus
watch(() => eventBus.state.authChanged, () => {
  checkAuthentication();
});

// Fermer les menus déroulants quand on clique ailleurs
const closeMenus = (e: MouseEvent) => {
  // Ne pas fermer si on clique sur le menu lui-même ou ses boutons
  const langMenuElement = document.querySelector('.lang-menu');
  const userMenuElement = document.querySelector('.user-menu');
  
  if (langMenuElement && !langMenuElement.contains(e.target as Node)) {
    langMenuOpen.value = false;
  }
  
  if (userMenuElement && !userMenuElement.contains(e.target as Node)) {
    userMenuOpen.value = false;
  }
};

// Vérifier l'authentification au chargement du composant et ajouter le listener pour fermer les menus
onMounted(() => {
  checkAuthentication();
  document.addEventListener('click', closeMenus);
});

// Nettoyer les écouteurs d'événements lorsque le composant est détruit
onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenus);
});

// Fonction de déconnexion
const handleLogout = () => {
  // Supprimer le token d'authentification
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem('userData');
  
  // Mettre à jour l'état d'authentification
  isAuthenticated.value = false;
  userMenuOpen.value = false;
  
  // Émettre un événement pour informer les autres composants
  eventBus.emit('auth:logout');
  
  // Rediriger vers la page de connexion
  router.push('/login');
};

// Fonction pour changer de langue
const changeLanguage = (lang: string) => {
  locale.value = lang;
  
  // Enregistrer la préférence de langue en localStorage pour la conserver
  localStorage.setItem('preferredLanguage', lang);
  
  // Fermer le menu de langues après la sélection
  langMenuOpen.value = false;
};
</script>

<style scoped>
.lang-menu, .user-menu {
  position: relative;
}
</style>