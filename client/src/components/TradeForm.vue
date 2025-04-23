<template>
  <div class="card">
    <h3 class="text-xl font-bold mb-4">Ajouter une transaction</h3>
    <form @submit.prevent="submitTrade">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block mb-2" for="asset">Crypto-monnaie</label>
          <input
            id="asset"
            v-model="trade.asset"
            type="text"
            class="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="BTC, ETH, DOGE..."
            required
          />
        </div>
        <div>
          <label class="block mb-2" for="type">Type</label>
          <select
            id="type"
            v-model="trade.type"
            class="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            required
          >
            <option value="buy">Achat</option>
            <option value="sell">Vente</option>
          </select>
        </div>
        <div>
          <label class="block mb-2" for="amount">Montant</label>
          <input
            id="amount"
            v-model.number="trade.amount"
            type="number"
            step="0.00000001"
            class="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="1.0"
            required
          />
        </div>
        <div>
          <label class="block mb-2" for="price">Prix (€)</label>
          <input
            id="price"
            v-model.number="trade.price"
            type="number"
            step="0.01"
            class="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="30000.00"
            required
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn-primary">
          Ajouter la transaction
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { NewTrade } from '../types/Trade';

export default defineComponent({
  name: 'TradeForm',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  emits: ['add-trade'],
  setup(props, { emit }) {
    const trade = reactive<NewTrade>({
      userId: props.userId,
      asset: '',
      type: 'buy',
      amount: 0,
      price: 0
    });

    const submitTrade = () => {
      emit('add-trade', { ...trade });
      // Réinitialiser le formulaire
      trade.asset = '';
      trade.type = 'buy';
      trade.amount = 0;
      trade.price = 0;
    };

    return { trade, submitTrade };
  }
});
</script>