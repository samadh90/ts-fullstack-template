<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- Fond flouté quand le modal est affiché -->
    <div v-if="showModal" class="fixed inset-0 z-40">
      <div class="absolute inset-0 backdrop-blur-sm"></div>
    </div>
  </Transition>

  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <!-- Overlay du modal d'erreur -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-crypto-card rounded-lg shadow-xl p-6 max-w-md mx-4 w-full border border-gray-700">
        <div class="flex items-center mb-4">
          <!-- Icône d'erreur -->
          <div class="mr-4 rounded-full bg-red-600 h-12 w-12 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <!-- Titre du modal -->
          <h2 class="text-xl font-bold text-white">
            {{ $t('common.error') }}
          </h2>
        </div>
        
        <!-- Message d'erreur -->
        <div class="mb-6 text-gray-300">
          <p>{{ errorMessage }}</p>
        </div>
        
        <!-- Bouton pour fermer -->
        <div class="flex justify-end">
          <button 
            @click="dismiss" 
            class="bg-crypto-primary hover:bg-crypto-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:ring-opacity-50 transition-colors"
          >
            {{ $t('connection.continue') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

// État du modal
const showModal = ref(false);
const errorMessage = ref('');
let errorTimeout: number | null = null;
const { t } = useI18n();

// Fonction pour afficher une erreur
const showError = (message: string) => {
  errorMessage.value = t(message); // Resolve the translation key
  showModal.value = true;

  // Nettoyer tout timeout existant
  if (errorTimeout) {
    window.clearTimeout(errorTimeout);
    errorTimeout = null;
  }
};

// Fonction pour fermer le modal
const dismiss = () => {
  showModal.value = false;
};

// Nettoyer lors du démontage du composant
onUnmounted(() => {
  if (errorTimeout) {
    window.clearTimeout(errorTimeout);
  }
});

// Exposer les fonctions pour être utilisées ailleurs dans l'application
defineExpose({
  showError
});
</script>