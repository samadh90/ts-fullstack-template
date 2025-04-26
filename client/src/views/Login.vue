<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="w-full max-w-md">
      <div class="bg-crypto-card shadow-lg rounded-lg overflow-hidden">
        <!-- En-tête -->
        <div class="p-6 border-b border-gray-700">
          <h2 class="text-2xl font-bold text-white text-center">{{ $t('auth.loginTitle') }}</h2>
          <p class="text-gray-400 text-center mt-1">{{ $t('auth.loginSubtitle') }}</p>
        </div>

        <!-- Message de succès d'inscription -->
        <div v-if="registeredSuccess" class="bg-green-900 bg-opacity-40 mx-6 mt-6 text-green-400 p-4 rounded-md text-sm">
          {{ $t('auth.registrationSuccessful') }}
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="p-6 space-y-6">
          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="bg-red-900 bg-opacity-40 text-crypto-red p-4 rounded-md text-sm mb-4">
            {{ errorMessage }}
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-gray-300 text-sm font-medium mb-2">
              {{ $t('auth.email') }}
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent"
              :placeholder="$t('auth.emailPlaceholder')"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-gray-300 text-sm font-medium">
                {{ $t('auth.password') }}
              </label>
              <router-link to="/forgot-password" class="text-crypto-primary text-sm hover:text-crypto-secondary">
                {{ $t('auth.forgotPassword') }}
              </router-link>
            </div>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                required
                class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent"
                :placeholder="$t('auth.passwordPlaceholder')"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg v-if="showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Se souvenir de moi -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                v-model="rememberMe"
                class="h-4 w-4 bg-gray-800 border-gray-700 rounded text-crypto-primary focus:ring-crypto-primary focus:ring-offset-gray-900"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-400">
                {{ $t('auth.rememberMe') }}
              </label>
            </div>
          </div>

          <!-- Bouton de connexion -->
          <div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-crypto-primary hover:bg-crypto-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-primary focus:ring-offset-gray-900 transition-colors"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? $t('common.loading') : $t('auth.loginButton') }}
            </button>
          </div>
        </form>

        <!-- Lien vers l'inscription -->
        <div class="px-6 py-4 bg-gray-800 bg-opacity-40 border-t border-gray-700 text-center">
          <p class="text-sm text-gray-400">
            {{ $t('auth.noAccount') }}
            <router-link to="/register" class="text-crypto-primary hover:text-crypto-secondary font-medium">
              {{ $t('auth.registerHere') }}
            </router-link>
          </p>
        </div>
      </div>
      
      <!-- Connectez-vous avec -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-crypto-bg text-gray-400">{{ $t('auth.orContinueWith') }}</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
            </svg>
            <span class="ml-2">Google</span>
          </button>
          <button type="button" class="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.829 17.285l.707-4.593h-4.429v-2.979c0-1.257.6-2.485 2.515-2.485H14.6V3.255S12.837 3 11.152 3c-3.51 0-5.803 2.126-5.803 5.967v3.725H1.6v4.594h3.749v11.09h5.051v-11.09h3.429z" />
            </svg>
            <span class="ml-2">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authApi } from '../services/api';
import type { UserCredentials } from '../types/User';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const registeredSuccess = ref(false);

// Vérifie si l'utilisateur vient de s'inscrire avec succès
onMounted(() => {
  const registered = route.query.registered;
  if (registered === 'true') {
    registeredSuccess.value = true;
  }
});

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    
    // Préparation des données de connexion
    const credentials: UserCredentials = {
      Email: email.value,
      Password: password.value
    };
    
    // Appel de l'API pour la connexion
    const response = await authApi.login(credentials);
    
    // Stockage du token selon la préférence de l'utilisateur
    if (response.token) {
      if (rememberMe.value) {
        localStorage.setItem('token', response.token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', response.token);
        localStorage.removeItem('token');
      }
      
      // Redirection vers le tableau de bord après connexion réussie
      router.push('/dashboard');
    }
  } catch (error: any) {
    // Gestion des erreurs
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error.message || "Email ou mot de passe incorrect";
    } else {
      errorMessage.value = "Une erreur est survenue lors de la connexion";
    }
  } finally {
    loading.value = false;
  }
};
</script>