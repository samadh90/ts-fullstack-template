<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="w-full max-w-md">
      <div class="bg-crypto-card shadow-lg rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="p-6 border-b border-gray-700">
          <h2 class="text-2xl font-bold text-white text-center">{{ $t('auth.registerTitle') }}</h2>
          <p class="text-gray-400 text-center mt-1">{{ $t('auth.registerSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="p-6 space-y-6">
          <!-- Error message -->
          <div v-if="errorMessage" class="bg-red-900 bg-opacity-40 text-crypto-red p-4 rounded-md text-sm mb-4">
            {{ errorMessage }}
          </div>
          
          <!-- Success message (for testing) -->
          <div v-if="successMessage" class="bg-green-900 bg-opacity-40 text-green-400 p-4 rounded-md text-sm mb-4">
            {{ successMessage }}
          </div>
          
          <!-- Username -->
          <div>
            <label for="username" class="block text-gray-300 text-sm font-medium mb-2">
              {{ $t('auth.username') }}
            </label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              required
              class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent"
              :placeholder="$t('auth.usernamePlaceholder')"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-crypto-red">{{ errors.username }}</p>
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
            <p v-if="errors.email" class="mt-1 text-sm text-crypto-red">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-gray-300 text-sm font-medium mb-2">
              {{ $t('auth.password') }}
            </label>
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
            <p class="mt-1 text-sm text-gray-400">
              {{ $t('auth.passwordRequirements') }}
            </p>
            <p v-if="errors.password" class="mt-1 text-sm text-crypto-red">{{ errors.password }}</p>
          </div>

          <!-- Confirm password -->
          <div>
            <label for="confirmPassword" class="block text-gray-300 text-sm font-medium mb-2">
              {{ $t('auth.confirmPassword') }}
            </label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                required
                class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-crypto-primary focus:border-transparent"
                :placeholder="$t('auth.confirmPasswordPlaceholder')"
              />
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-crypto-red">
              {{ passwordError }}
            </p>
          </div>

          <!-- Terms of service -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="acceptTerms" 
                required
                class="h-4 w-4 bg-gray-800 border-gray-700 rounded text-crypto-primary focus:ring-crypto-primary focus:ring-offset-gray-900"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-400">
                {{ $t('auth.agreeToTerms') }} 
                <a href="#" class="text-crypto-primary hover:text-crypto-secondary">{{ $t('auth.termsOfService') }}</a> 
                {{ $t('auth.and') }} 
                <a href="#" class="text-crypto-primary hover:text-crypto-secondary">{{ $t('auth.privacyPolicy') }}</a>
              </label>
            </div>
          </div>

          <!-- Registration button -->
          <div>
            <button 
              type="submit" 
              :disabled="loading || !isFormValid"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors"
              :class="isFormValid ? 'bg-crypto-primary hover:bg-crypto-secondary' : 'bg-gray-600 cursor-not-allowed'"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? $t('common.loading') : $t('auth.registerButton') }}
            </button>
          </div>
        </form>

        <!-- Link to login -->
        <div class="px-6 py-4 bg-gray-800 bg-opacity-40 border-t border-gray-700 text-center">
          <p class="text-sm text-gray-400">
            {{ $t('auth.alreadyAccount') }}
            <router-link to="/login" class="text-crypto-primary hover:text-crypto-secondary font-medium">
              {{ $t('auth.loginHere') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '../services/api';
import type { RegisterForm } from '../types/Auth';
import { eventBus } from '../services/eventBus';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const passwordError = ref('');
const errors = ref({
  username: '',
  email: '',
  password: '',
});

// Password validation
watch(() => [password.value, confirmPassword.value], () => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
  } else {
    passwordError.value = "";
  }
});

// Field validation
watch(() => username.value, () => {
  if (username.value.length > 0 && username.value.length < 3) {
    errors.value.username = "Username must be at least 3 characters";
  } else {
    errors.value.username = "";
  }
});

watch(() => password.value, () => {
  if (password.value.length > 0 && password.value.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
  } else {
    errors.value.password = "";
  }
});

const isFormValid = computed(() => {
  return (
    username.value.length >= 3 &&
    email.value.length > 0 &&
    password.value.length >= 8 &&
    password.value === confirmPassword.value &&
    acceptTerms.value &&
    !errors.value.username &&
    !errors.value.email &&
    !errors.value.password
  );
});

const handleRegister = async () => {
  if (!isFormValid.value) return;

  try {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    // Get form data with UpperCamelCase format
    const registerData: RegisterForm = {
      Username: username.value,
      Email: email.value,
      Password: password.value
    };

    // Call API for registration
    const response = await authApi.register(registerData);
    
    // Display success message
    successMessage.value = response.Message || "Registration successful!";
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/login?registered=true');
    }, 1500);
    
  } catch (error: any) {
    // Handle specific backend errors
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage.value = error.response.data.error.message || "An error occurred during registration";
      
      // Handle specific validation errors
      if (error.response.data.error.message.includes('email')) {
        errors.value.email = "This email is already in use";
      } else if (error.response.data.error.message.includes('username')) {
        errors.value.username = "This username is already taken";
      }
    } else {
      errorMessage.value = error.message || "A server error occurred during registration";
    }
  } finally {
    loading.value = false;
  }
};
</script>