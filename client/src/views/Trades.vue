<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">{{ $t('trade.title') }}</h1>
    
    <!-- Actions et filtres -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <button class="btn-primary flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        {{ $t('trade.newTrade') }}
      </button>
      
      <!-- Filtres -->
      <div class="flex flex-wrap gap-3">
        <select class="bg-gray-800 text-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-primary">
          <option value="">{{ $t('trade.filterByType') }}</option>
          <option value="buy">{{ $t('trade.buy') }}</option>
          <option value="sell">{{ $t('trade.sell') }}</option>
        </select>
        <select class="bg-gray-800 text-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crypto-primary">
          <option value="">{{ $t('trade.filterByStatus') }}</option>
          <option value="completed">{{ $t('trade.completed') }}</option>
          <option value="pending">{{ $t('trade.pending') }}</option>
          <option value="cancelled">{{ $t('trade.cancelled') }}</option>
        </select>
      </div>
    </div>
    
    <!-- Liste des transactions -->
    <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden">
      <!-- Table des transactions -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-800 bg-opacity-50">
            <tr>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">ID</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.type') }}</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.currency') }}</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.amount') }}</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.date') }}</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.status') }}</th>
              <th class="py-3 px-4 text-right text-sm font-medium text-gray-400">{{ $t('trade.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-if="loading">
              <td colspan="7" class="py-8 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-crypto-primary"></div>
                <p class="mt-2 text-gray-400">{{ $t('common.loading') }}</p>
              </td>
            </tr>
            <tr v-else-if="trades.length === 0">
              <td colspan="7" class="py-8 text-center text-gray-400">{{ $t('trade.noTrades') }}</td>
            </tr>
            <tr v-for="trade in trades" :key="trade.id" class="hover:bg-gray-800 hover:bg-opacity-30 transition-colors">
              <td class="py-3 px-4 text-white">{{ trade.id }}</td>
              <td class="py-3 px-4" :class="trade.type === 'buy' ? 'text-crypto-green' : 'text-crypto-red'">
                {{ trade.type === 'buy' ? $t('trade.buy') : $t('trade.sell') }}
              </td>
              <td class="py-3 px-4 font-medium text-white">{{ trade.asset }}</td>
              <td class="py-3 px-4 text-white">{{ trade.amount }} €</td>
              <td class="py-3 px-4 text-gray-400">{{ new Date(trade.createdAt).toLocaleString() }}</td>
              <td class="py-3 px-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" 
                      :class="{
                        'bg-green-900 bg-opacity-40 text-crypto-green': trade.status === 'completed',
                        'bg-yellow-900 bg-opacity-40 text-yellow-300': trade.status === 'pending',
                        'bg-red-900 bg-opacity-40 text-crypto-red': trade.status === 'cancelled'
                      }">
                  {{ $t(`trade.${trade.status}`) }}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <div class="inline-flex items-center space-x-3">
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-crypto-red transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="py-4 px-6 border-t border-gray-700 flex items-center justify-between">
        <div class="text-sm text-gray-400">
          Affichage de <span class="font-medium text-white">1</span> à <span class="font-medium text-white">{{ trades.length }}</span> sur <span class="font-medium text-white">{{ trades.length }}</span> transactions
        </div>
        <div class="flex space-x-2">
          <button disabled class="px-3 py-1 rounded bg-gray-800 bg-opacity-50 text-gray-500 cursor-not-allowed">
            &laquo; Précédent
          </button>
          <button disabled class="px-3 py-1 rounded bg-gray-800 bg-opacity-50 text-gray-500 cursor-not-allowed">
            Suivant &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Exemple de données pour la démo
const loading = ref(false);
const trades = ref([
  { 
    id: 1, 
    type: 'buy', 
    asset: 'Bitcoin', 
    amount: 1200, 
    createdAt: new Date(), 
    status: 'completed',
    userId: 1
  },
  { 
    id: 2, 
    type: 'sell', 
    asset: 'Ethereum', 
    amount: 800, 
    createdAt: new Date(), 
    status: 'pending',
    userId: 1
  },
  { 
    id: 3, 
    type: 'buy', 
    asset: 'Solana', 
    amount: 500, 
    createdAt: new Date(), 
    status: 'cancelled',
    userId: 1
  }
]);
</script>