<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">{{ $t('dashboard.title') }}</h1>
    
    <!-- Résumé des statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <h5 class="text-lg font-semibold text-gray-300 mb-2">{{ $t('dashboard.totalTrades') }}</h5>
          <div class="flex items-baseline">
            <h2 class="text-4xl font-bold text-white">15</h2>
            <span class="ml-4 text-crypto-green">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                +23% {{ $t('dashboard.thisMonth') }}
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <h5 class="text-lg font-semibold text-gray-300 mb-2">{{ $t('dashboard.profitLoss') }}</h5>
          <div class="flex items-baseline">
            <h2 class="text-4xl font-bold text-crypto-green">+€1,250</h2>
            <span class="ml-4 text-crypto-green">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                +15% {{ $t('dashboard.thisMonth') }}
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <h5 class="text-lg font-semibold text-gray-300 mb-2">{{ $t('dashboard.portfolio') }}</h5>
          <div class="flex items-baseline">
            <h2 class="text-4xl font-bold text-white">€8,750</h2>
            <span class="ml-4 text-crypto-green">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                +8% {{ $t('dashboard.thisMonth') }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Graphique de performance -->
    <div class="bg-crypto-card rounded-lg shadow-lg mb-8">
      <div class="flex justify-between items-center p-4 border-b border-gray-700">
        <h5 class="text-lg font-semibold text-white">{{ $t('dashboard.performanceChart') }}</h5>
        <div class="flex space-x-2">
          <button class="px-3 py-1 rounded text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
            {{ $t('dashboard.week') }}
          </button>
          <button class="px-3 py-1 rounded text-sm bg-crypto-primary text-white transition-colors">
            {{ $t('dashboard.month') }}
          </button>
          <button class="px-3 py-1 rounded text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
            {{ $t('dashboard.year') }}
          </button>
        </div>
      </div>
      <div class="p-4">
        <!-- Placeholder pour le graphique -->
        <div class="bg-gray-800 bg-opacity-50 rounded-lg p-16 flex items-center justify-center">
          <p class="text-gray-400">{{ $t('dashboard.chartPlaceholder') }}</p>
        </div>
      </div>
    </div>
    
    <!-- Transactions récentes et Actifs -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Transactions récentes -->
      <div class="lg:col-span-2">
        <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden h-full">
          <div class="p-4 border-b border-gray-700">
            <h5 class="text-lg font-semibold text-white">{{ $t('dashboard.recentTrades') }}</h5>
          </div>
          <div>
            <table class="w-full">
              <thead class="bg-gray-800 bg-opacity-50">
                <tr>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.type') }}</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.currency') }}</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.amount') }}</th>
                  <th class="hidden sm:table-cell py-3 px-4 text-left text-sm font-medium text-gray-400">{{ $t('trade.date') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr class="hover:bg-gray-800 hover:bg-opacity-30 transition-colors">
                  <td class="py-3 px-4"><span class="text-crypto-green">{{ $t('trade.buy') }}</span></td>
                  <td class="py-3 px-4 font-medium">Bitcoin</td>
                  <td class="py-3 px-4">€1,200</td>
                  <td class="hidden sm:table-cell py-3 px-4 text-gray-400">{{ new Date().toLocaleDateString() }}</td>
                </tr>
                <tr class="hover:bg-gray-800 hover:bg-opacity-30 transition-colors">
                  <td class="py-3 px-4"><span class="text-crypto-red">{{ $t('trade.sell') }}</span></td>
                  <td class="py-3 px-4 font-medium">Ethereum</td>
                  <td class="py-3 px-4">€800</td>
                  <td class="hidden sm:table-cell py-3 px-4 text-gray-400">{{ new Date().toLocaleDateString() }}</td>
                </tr>
                <tr class="hover:bg-gray-800 hover:bg-opacity-30 transition-colors">
                  <td class="py-3 px-4"><span class="text-crypto-green">{{ $t('trade.buy') }}</span></td>
                  <td class="py-3 px-4 font-medium">Solana</td>
                  <td class="py-3 px-4">€500</td>
                  <td class="hidden sm:table-cell py-3 px-4 text-gray-400">{{ new Date().toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-700">
            <router-link to="/trades" class="text-crypto-primary hover:text-crypto-secondary transition-colors text-sm font-medium flex items-center">
              {{ $t('dashboard.viewAllTrades') }}
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Actifs -->
      <div class="lg:col-span-1">
        <div class="bg-crypto-card rounded-lg shadow-lg overflow-hidden h-full">
          <div class="p-4 border-b border-gray-700">
            <h5 class="text-lg font-semibold text-white">{{ $t('dashboard.assets') }}</h5>
          </div>
          <div class="divide-y divide-gray-700">
            <div class="p-4 flex justify-between">
              <div>
                <div class="font-medium text-white">Bitcoin</div>
                <div class="text-sm text-gray-400">0.045 BTC</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-white">€2,250</div>
                <div class="text-sm text-crypto-green">+5.2%</div>
              </div>
            </div>
            <div class="p-4 flex justify-between">
              <div>
                <div class="font-medium text-white">Ethereum</div>
                <div class="text-sm text-gray-400">2.5 ETH</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-white">€4,500</div>
                <div class="text-sm text-crypto-green">+3.8%</div>
              </div>
            </div>
            <div class="p-4 flex justify-between">
              <div>
                <div class="font-medium text-white">Solana</div>
                <div class="text-sm text-gray-400">15 SOL</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-white">€2,000</div>
                <div class="text-sm text-crypto-red">-1.4%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script simple pour la démo
</script>