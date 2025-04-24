<template>
  <div class="min-h-screen bg-crypto-bg">
    <!-- Barre de navigation -->
    <NavBar />
    
    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view />
    </main>

    <!-- Pied de page -->
    <footer class="border-t border-gray-700 mt-10 py-6 text-center text-gray-400 text-sm">
      <div>&copy; {{ new Date().getFullYear() }} CryptoTradeBot - {{ $t('footer.allRightsReserved') }}</div>
      <AppVersion />
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import AppVersion from './components/AppVersion.vue';
</script>
