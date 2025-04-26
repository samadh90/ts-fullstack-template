<template>
  <div class="flex flex-col items-center justify-start bg-gray-900 text-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-crypto-primary to-crypto-secondary rounded-lg shadow-lg p-8 mb-10 text-center">
      <h1 class="text-4xl font-bold mb-4">{{ $t('home.welcome') }}</h1>
      <p class="text-lg mb-6">A modern, scalable foundation for your web applications with Vue 3, Express, and Prisma.</p>
      <router-link to="/register" class="bg-white hover:bg-gray-100 text-crypto-primary font-bold py-2 px-6 rounded transition-colors">
        Get Started
      </router-link>
    </div>

    <!-- Features Section -->
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

    <!-- Game Section -->
    <div class="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
      <h2 class="text-2xl font-bold mb-4">Guess the Number</h2>
      <p class="text-lg mb-4">Try to guess the number between 1 and 100!</p>

      <div class="flex flex-col items-center space-y-4">
        <input
          type="number"
          v-model.number="userGuess"
          placeholder="Enter your guess"
          class="w-64 p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-crypto-primary"
        />
        <button
          @click="checkGuess"
          class="bg-crypto-primary hover:bg-crypto-secondary text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Guess
        </button>

        <p v-if="message" class="text-lg mt-4">{{ message }}</p>
      </div>

      <button
        @click="resetGame"
        class="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Reset Game
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const randomNumber = ref(Math.floor(Math.random() * 100) + 1);
const userGuess = ref<number | null>(null);
const message = ref('');

const checkGuess = () => {
  if (userGuess.value === null) {
    message.value = 'Please enter a number!';
    return;
  }

  if (userGuess.value < randomNumber.value) {
    message.value = 'Too low! Try again.';
  } else if (userGuess.value > randomNumber.value) {
    message.value = 'Too high! Try again.';
  } else {
    message.value = 'Congratulations! You guessed the number!';
  }
};

const resetGame = () => {
  randomNumber.value = Math.floor(Math.random() * 100) + 1;
  userGuess.value = null;
  message.value = '';
};
</script>

<style scoped>
body {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  background-color: #1a202c;
  color: #fff;
}
</style>