<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Transactions récentes</h2>
    <div v-if="loading" class="flex justify-center p-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crypto-primary"></div>
    </div>
    <div v-else-if="trades.length === 0" class="card text-center p-8">
      <p>Aucune transaction à afficher</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-crypto-card text-left">
            <th class="p-3">Asset</th>
            <th class="p-3">Type</th>
            <th class="p-3">Montant</th>
            <th class="p-3">Prix</th>
            <th class="p-3">Date</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in trades" :key="trade.id" class="border-b border-gray-700">
            <td class="p-3 font-medium">{{ trade.asset }}</td>
            <td class="p-3">
              <span :class="trade.type === 'buy' ? 'buy' : 'sell'" class="px-2 py-1 rounded-md">
                {{ trade.type === 'buy' ? 'Achat' : 'Vente' }}
              </span>
            </td>
            <td class="p-3">{{ trade.amount }}</td>
            <td class="p-3">{{ formatPrice(trade.price) }}</td>
            <td class="p-3">{{ formatDate(trade.timestamp) }}</td>
            <td class="p-3">
              <button @click="$emit('delete', trade.id)" class="text-crypto-red hover:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Trade } from '../types/Trade';

export default defineComponent({
  name: 'TradeList',
  props: {
    trades: {
      type: Array as PropType<Trade[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['delete'],
  methods: {
    formatDate(dateString: string): string {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    formatPrice(price: number): string {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    }
  }
});
</script>