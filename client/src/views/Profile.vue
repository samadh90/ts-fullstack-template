<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-8">{{ $t('profile.title') }}</h1>
      
      <!-- Alerte pour les messages système -->
      <div v-if="successMessage" class="bg-green-700 text-white p-4 mb-6 rounded-md">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="bg-red-700 text-white p-4 mb-6 rounded-md">
        {{ errorMessage }}
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Bloc 1: Informations personnelles -->
        <div class="bg-crypto-card p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-crypto-primary mb-4">{{ $t('profile.personalInfo') }}</h2>
          <form @submit.prevent="updatePersonalInfo">
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="firstName">
                {{ $t('profile.firstName') }}
              </label>
              <input 
                type="text" 
                id="firstName" 
                v-model="personalInfo.firstName" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="lastName">
                {{ $t('profile.lastName') }}
              </label>
              <input 
                type="text" 
                id="lastName" 
                v-model="personalInfo.lastName" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
                {{ $t('profile.username') }}
              </label>
              <input 
                type="text" 
                id="username" 
                v-model="personalInfo.username" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="birthDate">
                {{ $t('profile.birthDate') }}
              </label>
              <input 
                type="date" 
                id="birthDate" 
                v-model="personalInfo.birthDate" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <button 
              type="submit" 
              class="bg-crypto-primary hover:bg-crypto-secondary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-primary"
              :disabled="isUpdatingPersonal"
            >
              {{ isUpdatingPersonal ? $t('common.updating') : $t('common.update') }}
            </button>
          </form>
        </div>
        
        <!-- Bloc 2: Adresse -->
        <div class="bg-crypto-card p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-crypto-primary mb-4">{{ $t('profile.address') }}</h2>
          <form @submit.prevent="updateAddress">
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="street">
                {{ $t('profile.street') }}
              </label>
              <input 
                type="text" 
                id="street" 
                v-model="address.street" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="city">
                {{ $t('profile.city') }}
              </label>
              <input 
                type="text" 
                id="city" 
                v-model="address.city" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="zipCode">
                {{ $t('profile.zipCode') }}
              </label>
              <input 
                type="text" 
                id="zipCode" 
                v-model="address.zipCode" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="country">
                {{ $t('profile.country') }}
              </label>
              <input 
                type="text" 
                id="country" 
                v-model="address.country" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <button 
              type="submit" 
              class="bg-crypto-primary hover:bg-crypto-secondary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-primary"
              :disabled="isUpdatingAddress"
            >
              {{ isUpdatingAddress ? $t('common.updating') : $t('common.update') }}
            </button>
          </form>
        </div>
        
        <!-- Bloc 3: Informations de contact -->
        <div class="bg-crypto-card p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-crypto-primary mb-4">{{ $t('profile.contactInfo') }}</h2>
          <form @submit.prevent="updateContactInfo">
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="email">
                {{ $t('profile.email') }}
              </label>
              <div class="flex items-center">
                <input 
                  type="email" 
                  id="email" 
                  v-model="contactInfo.email" 
                  class="bg-gray-800 text-white rounded-l-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                >
                <span class="bg-gray-700 text-sm px-3 py-2 rounded-r-md">
                  <span v-if="contactInfo.emailVerified" class="text-green-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    {{ $t('profile.verified') }}
                  </span>
                  <span v-else class="text-yellow-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ $t('profile.notVerified') }}
                  </span>
                </span>
              </div>
              <button 
                v-if="!contactInfo.emailVerified" 
                @click.prevent="resendVerificationEmail"
                type="button"
                class="mt-2 text-sm text-crypto-primary hover:text-crypto-secondary"
              >
                {{ $t('profile.resendVerification') }}
              </button>
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="phone">
                {{ $t('profile.phone') }}
              </label>
              <div class="flex items-center">
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="contactInfo.phone" 
                  class="bg-gray-800 text-white rounded-l-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                >
                <span class="bg-gray-700 text-sm px-3 py-2 rounded-r-md">
                  <span v-if="contactInfo.phoneVerified" class="text-green-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    {{ $t('profile.verified') }}
                  </span>
                  <span v-else class="text-yellow-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ $t('profile.notVerified') }}
                  </span>
                </span>
              </div>
              <button 
                v-if="!contactInfo.phoneVerified" 
                @click.prevent="sendPhoneVerification"
                type="button"
                class="mt-2 text-sm text-crypto-primary hover:text-crypto-secondary"
              >
                {{ $t('profile.sendVerificationCode') }}
              </button>
            </div>
            <button 
              type="submit" 
              class="bg-crypto-primary hover:bg-crypto-secondary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-primary"
              :disabled="isUpdatingContact"
            >
              {{ isUpdatingContact ? $t('common.updating') : $t('common.update') }}
            </button>
          </form>
        </div>
        
        <!-- Bloc 4: Changement de mot de passe -->
        <div class="bg-crypto-card p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-crypto-primary mb-4">{{ $t('profile.changePassword') }}</h2>
          <form @submit.prevent="updatePassword">
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="currentPassword">
                {{ $t('profile.currentPassword') }}
              </label>
              <input 
                type="password" 
                id="currentPassword" 
                v-model="passwordForm.currentPassword" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="newPassword">
                {{ $t('profile.newPassword') }}
              </label>
              <input 
                type="password" 
                id="newPassword" 
                v-model="passwordForm.newPassword" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2" for="confirmPassword">
                {{ $t('profile.confirmPassword') }}
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="passwordForm.confirmPassword" 
                class="bg-gray-800 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
              >
              <p v-if="passwordForm.newPassword && passwordForm.newPassword !== passwordForm.confirmPassword" class="text-red-500 text-sm mt-1">
                {{ $t('profile.passwordsDoNotMatch') }}
              </p>
            </div>
            <button 
              type="submit" 
              class="bg-crypto-primary hover:bg-crypto-secondary text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crypto-primary"
              :disabled="isUpdatingPassword || (passwordForm.newPassword !== passwordForm.confirmPassword)"
            >
              {{ isUpdatingPassword ? $t('common.updating') : $t('common.update') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { authApi, userApi } from '../services/api';

const { t } = useI18n();

// États pour les messages
const successMessage = ref('');
const errorMessage = ref('');

// États pour les indicateurs de chargement
const isUpdatingPersonal = ref(false);
const isUpdatingAddress = ref(false);
const isUpdatingContact = ref(false);
const isUpdatingPassword = ref(false);

// États pour les formulaires
const personalInfo = ref({
  firstName: '',
  lastName: '',
  username: '',
  birthDate: ''
});

const address = ref({
  street: '',
  city: '',
  zipCode: '',
  country: ''
});

const contactInfo = ref({
  email: '',
  emailVerified: false,
  phone: '',
  phoneVerified: false
});

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Charger les données de l'utilisateur
onMounted(async () => {
  try {
    const userData = await authApi.checkAuth();
    if (!userData) {
      showError(t('profile.notAuthenticated'));
      return;
    }
    
    // Exemple de chargement des données (remplacer par l'appel API réel)
    const userDetails = await userApi.getUserById(userData.id);
    
    // Remplir les formulaires avec les données utilisateur
    personalInfo.value = {
      firstName: userDetails.FirstName || '',
      lastName: userDetails.LastName || '',
      username: userDetails.Username || '',
      birthDate: userDetails.BirthDate || ''
    };
    
    address.value = {
      street: userDetails.address?.street || '',
      city: userDetails.address?.city || '',
      zipCode: userDetails.address?.zipCode || '',
      country: userDetails.address?.country || ''
    };
    
    contactInfo.value = {
      email: userDetails.Email || '',
      emailVerified: userDetails.EmailVerified || false,
      phone: userDetails.Phone || '',
      phoneVerified: userDetails.PhoneVerified || false
    };
    
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    showError(t('profile.errorLoadingData'));
  }
});

// Fonctions de mise à jour
const updatePersonalInfo = async () => {
  isUpdatingPersonal.value = true;
  try {
    // Appel API pour mettre à jour les informations personnelles
    await userApi.updateUserProfile({ 
      ...personalInfo.value
    });
    showSuccess(t('profile.personalInfoUpdated'));
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations personnelles:', error);
    showError(t('profile.errorUpdatingPersonalInfo'));
  } finally {
    isUpdatingPersonal.value = false;
  }
};

const updateAddress = async () => {
  isUpdatingAddress.value = true;
  try {
    // Appel API pour mettre à jour l'adresse
    await userApi.updateUserAddress({
      ...address.value
    });
    showSuccess(t('profile.addressUpdated'));
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'adresse:', error);
    showError(t('profile.errorUpdatingAddress'));
  } finally {
    isUpdatingAddress.value = false;
  }
};

const updateContactInfo = async () => {
  isUpdatingContact.value = true;
  try {
    // Appel API pour mettre à jour les informations de contact
    await userApi.updateUserContact({
      email: contactInfo.value.email,
      phone: contactInfo.value.phone
    });
    showSuccess(t('profile.contactInfoUpdated'));
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations de contact:', error);
    showError(t('profile.errorUpdatingContactInfo'));
  } finally {
    isUpdatingContact.value = false;
  }
};

const updatePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showError(t('profile.passwordsDoNotMatch'));
    return;
  }
  
  isUpdatingPassword.value = true;
  try {
    // Appel API pour mettre à jour le mot de passe
    await authApi.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    });
    
    // Réinitialiser le formulaire
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    showSuccess(t('profile.passwordUpdated'));
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    showError(t('profile.errorUpdatingPassword'));
  } finally {
    isUpdatingPassword.value = false;
  }
};

// Fonctions de vérification
const resendVerificationEmail = async () => {
  try {
    // Appel API pour renvoyer l'email de vérification
    await authApi.resendVerificationEmail({ email: contactInfo.value.email });
    showSuccess(t('profile.verificationEmailSent'));
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
    showError(t('profile.errorSendingVerificationEmail'));
  }
};

const sendPhoneVerification = async () => {
  try {
    // Appel API pour envoyer le code de vérification par SMS
    await authApi.sendPhoneVerification({ phone: contactInfo.value.phone });
    showSuccess(t('profile.verificationCodeSent'));
  } catch (error) {
    console.error('Erreur lors de l\'envoi du code de vérification:', error);
    showError(t('profile.errorSendingVerificationCode'));
  }
};

// Fonctions utilitaires pour les messages
const showSuccess = (message: string) => {
  successMessage.value = message;
  errorMessage.value = '';
  setTimeout(() => {
    successMessage.value = '';
  }, 5000);
};

const showError = (message: string) => {
  errorMessage.value = message;
  successMessage.value = '';
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000);
};
</script>

<style scoped>
/* Styles spécifiques au besoin */
</style>