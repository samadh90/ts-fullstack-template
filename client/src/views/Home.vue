<template>
  <div>
    <!-- Hero section -->
    <div class="bg-crypto-card rounded-lg shadow-lg p-8 mb-10">
      <h1 class="text-4xl font-bold text-white mb-4">{{ $t('common.welcome') }}</h1>
      <p class="text-xl text-gray-300 mb-6">TypeScript Fullstack Template</p>
      <p class="text-gray-400 mb-8">A modern, scalable foundation for your web applications with Vue 3, Express, and Prisma.</p>
      <router-link to="/register" class="btn-primary">
        Get Started
      </router-link>
    </div>
    
    <!-- Features section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div class="bg-crypto-card rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
        <div class="flex items-center justify-center h-14 w-14 rounded-full bg-crypto-primary bg-opacity-20 text-crypto-primary mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Vue 3 + TypeScript</h3>
        <p class="text-gray-400">Modern frontend with Vue 3 Composition API and strong typing with TypeScript for better developer experience.</p>
      </div>
      
      <div class="bg-crypto-card rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
        <div class="flex items-center justify-center h-14 w-14 rounded-full bg-crypto-green bg-opacity-20 text-crypto-green mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Express + Prisma</h3>
        <p class="text-gray-400">Powerful backend with Express.js REST API and Prisma ORM for type-safe database operations.</p>
      </div>
      
      <div class="bg-crypto-card rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
        <div class="flex items-center justify-center h-14 w-14 rounded-full bg-crypto-secondary bg-opacity-20 text-crypto-secondary mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Ready to Scale</h3>
        <p class="text-gray-400">Complete authentication system, real-time communication via Socket.io, and multi-language support built-in.</p>
      </div>
    </div>
    
    <!-- Call to action -->
    <div class="bg-gradient-to-r from-crypto-primary to-crypto-secondary rounded-lg shadow-lg p-8 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">Start Building Today</h2>
      <p class="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">This template includes everything you need to launch your next web application quickly and efficiently.</p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <router-link to="/register" class="bg-white hover:bg-gray-100 text-crypto-primary font-bold py-2 px-6 rounded transition-colors">
          Create Account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed
</script>