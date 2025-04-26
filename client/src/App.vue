<template>
  <div class="min-h-screen bg-crypto-bg">
    <!-- Notifications de connexion -->
    <ConnectionStatus />
    
    <!-- Gestionnaire d'erreurs global -->
    <ErrorHandler ref="errorHandlerRef" />
    
    <!-- Barre de navigation -->
    <NavBar />
    
    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view />
    </main>

    <!-- Pied de page -->
    <footer class="border-t border-gray-700 mt-10 py-6 text-center text-gray-400 text-sm">
      <div>&copy; {{ new Date().getFullYear() }} Template - {{ $t('footer.allRightsReserved') }}</div>
      <AppVersion />
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import AppVersion from './components/AppVersion.vue';
import ConnectionStatus from './components/ConnectionStatus.vue';
import ErrorHandler from './components/ErrorHandler.vue';
import { onMounted, ref } from 'vue';
import { socketService } from './services/socketService';
import { errorService } from './services/errorService';

// Référence au composant ErrorHandler
const errorHandlerRef = ref(null);

// Initialisation au montage du composant
onMounted(() => {
  // Initialiser la connexion socket
  socketService.connect();
  
  // Enregistrer la référence du gestionnaire d'erreurs
  if (errorHandlerRef.value) {
    errorService.registerErrorHandler(errorHandlerRef.value);
  }
});
</script>
