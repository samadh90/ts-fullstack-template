<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- Main content blur wrapper that activates when modal is shown -->
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
    <!-- Modal overlay that appears when connection is lost -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div class="bg-crypto-card rounded-lg shadow-xl p-6 max-w-md mx-4 w-full border border-gray-700">
        <div class="flex items-center mb-4">
          <!-- Animated icon based on connection status -->
          <div class="mr-4 rounded-full h-12 w-12 flex items-center justify-center" :class="iconBackgroundClass">
            <svg v-if="status === ConnectionStatus.DISCONNECTED" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path>
            </svg>
            <svg v-else-if="status === ConnectionStatus.CONNECTING" class="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
            </svg>
          </div>
          
          <!-- Modal title -->
          <h2 class="text-xl font-bold text-white" v-if="status === ConnectionStatus.DISCONNECTED">
            {{ $t('connection.disconnected') }}
          </h2>
          <h2 class="text-xl font-bold text-white" v-else-if="status === ConnectionStatus.CONNECTING">
            {{ $t('connection.reconnecting', { attempt: currentAttempts }) }}
          </h2>
          <h2 class="text-xl font-bold text-white" v-else>
            {{ $t('connection.connected') }}
          </h2>
        </div>
        
        <!-- Explanation message -->
        <div class="mb-6 text-gray-300">
          <p v-if="status === ConnectionStatus.DISCONNECTED">
            {{ $t('connection.disconnectedMessage') }}
          </p>
          <p v-else-if="status === ConnectionStatus.CONNECTING">
            {{ $t('connection.reconnectingMessage') }}
          </p>
          <p v-else>
            {{ $t('connection.connectedMessage') }}
          </p>
        </div>
        
        <!-- Available actions -->
        <div class="flex justify-end gap-2">
          <button 
            v-if="status === ConnectionStatus.DISCONNECTED"
            @click="manualReconnect" 
            class="bg-crypto-primary hover:bg-crypto-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:ring-opacity-50 transition-colors"
          >
            {{ $t('connection.tryReconnect') }}
          </button>
          
          <button 
            v-if="status === ConnectionStatus.CONNECTED"
            @click="dismiss" 
            class="bg-crypto-secondary hover:bg-crypto-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-crypto-secondary focus:ring-opacity-50 transition-colors"
          >
            {{ $t('connection.continue') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { socketService, ConnectionStatus } from '../services/socketService';

// Connect to socket immediately to set up connection monitoring
onMounted(() => {
  socketService.connect();
});

const status = computed(() => socketService.connectionStatus.value);
// Use a ref instead of a computed to ensure it updates properly
const currentAttempts = ref(0);
const showModal = ref(false);
let connectionTimeout: number | null = null;

// Computed class for the icon background
const iconBackgroundClass = computed(() => {
  switch (status.value) {
    case ConnectionStatus.CONNECTED:
      return 'bg-green-600';
    case ConnectionStatus.CONNECTING:
      return 'bg-yellow-600';
    case ConnectionStatus.DISCONNECTED:
      return 'bg-red-600';
    default:
      return 'bg-gray-600';
  }
});

// Watch for status changes
watch(status, (newStatus, oldStatus) => {
  // Clear any existing timeout
  if (connectionTimeout) {
    window.clearTimeout(connectionTimeout);
    connectionTimeout = null;
  }

  // Show modal for disconnected or connecting statuses
  if (newStatus === ConnectionStatus.DISCONNECTED || newStatus === ConnectionStatus.CONNECTING) {
    showModal.value = true;
  } 
  // For connected status, show briefly then dismiss
  else if (newStatus === ConnectionStatus.CONNECTED && oldStatus !== undefined) {
    showModal.value = true;
    connectionTimeout = window.setTimeout(() => {
      showModal.value = false;
    }, 2000);
  }
}, { immediate: true });

// Setup a deep watcher on socketService's reconnectAttempts directly
const intervalId = setInterval(() => {
  // Update current attempts from the socket service
  if (status.value === ConnectionStatus.CONNECTING) {
    currentAttempts.value = socketService.reconnectAttempts.value;
  }
}, 500);

// Clean up on component unmount
onUnmounted(() => {
  if (connectionTimeout) {
    window.clearTimeout(connectionTimeout);
  }
  clearInterval(intervalId);
});

// Function to manually trigger a reconnection attempt
const manualReconnect = () => {
  socketService.disconnect();
  currentAttempts.value = 0; // Reset attempt counter
  socketService.connect();
};

// Function to dismiss the modal
const dismiss = () => {
  showModal.value = false;
};
</script>