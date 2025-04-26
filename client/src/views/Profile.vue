<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-8">{{ $t('profile.title') }}</h1>
      
      <!-- Alert for success messages only -->
      <div v-if="successMessage" class="bg-green-700 text-white p-4 mb-6 rounded-md">
        {{ successMessage }}
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Block 1: Personal information -->
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
        
        <!-- Block 2: Address -->
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
        
        <!-- Block 3: Contact information -->
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
        
        <!-- Block 4: Password change -->
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
import { errorService } from '../services/errorService';

const { t } = useI18n();

// State for success messages
const successMessage = ref('');

// States for loading indicators
const isUpdatingPersonal = ref(false);
const isUpdatingAddress = ref(false);
const isUpdatingContact = ref(false);
const isUpdatingPassword = ref(false);

// States for forms
const personalInfo = ref({
  firstName: '',
  lastName: '',
  username: '',
  birthDate: ''
});

const address = ref({
  street: '',
  city: '',
  state: '',
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

// Load user data
onMounted(async () => {
  try {
    const userData = await authApi.checkAuth();
    if (!userData) {
      errorService.showError('profile.notAuthenticated');
      return;
    }
    
    // Example of loading data (replace with the real API call)
    const userDetails = await userApi.getUserById(userData.ID);
    
    // Fill the forms with user data
    personalInfo.value = {
      firstName: userDetails.FirstName || '',
      lastName: userDetails.LastName || '',
      username: userDetails.Username || '',
      birthDate: userDetails.BirthDate || ''
    };
    
    address.value = {
      country: userDetails.Country || '',
      state: userDetails.State || '',
      city: userDetails.City || '',
      street: userDetails.Street || '',
      zipCode: userDetails.ZipCode || '',
    };
    
    contactInfo.value = {
      email: userDetails.Email || '',
      emailVerified: userDetails.EmailVerified || false,
      phone: userDetails.Phone || '',
      phoneVerified: userDetails.PhoneVerified || false
    };
    
  } catch (error) {
    errorService.handleError(error, 'profile.errorLoadingData');
  }
});

// Update functions
const updatePersonalInfo = async () => {
  isUpdatingPersonal.value = true;
  try {
    // API call to update personal information
    await userApi.updateUserProfile({ 
      ...personalInfo.value
    });
    showSuccess(t('profile.personalInfoUpdated'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorUpdatingPersonalInfo');
  } finally {
    isUpdatingPersonal.value = false;
  }
};

const updateAddress = async () => {
  isUpdatingAddress.value = true;
  try {
    // API call to update address
    await userApi.updateUserAddress({
      ...address.value
    });
    showSuccess(t('profile.addressUpdated'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorUpdatingAddress');
  } finally {
    isUpdatingAddress.value = false;
  }
};

const updateContactInfo = async () => {
  isUpdatingContact.value = true;
  try {
    // API call to update contact information
    await userApi.updateUserContact({
      email: contactInfo.value.email,
      phone: contactInfo.value.phone
    });
    showSuccess(t('profile.contactInfoUpdated'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorUpdatingContactInfo');
  } finally {
    isUpdatingContact.value = false;
  }
};

const updatePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    errorService.showError('profile.passwordsDoNotMatch');
    return;
  }
  
  isUpdatingPassword.value = true;
  try {
    // API call to update password
    await authApi.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    });
    
    // Reset the form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    showSuccess(t('profile.passwordUpdated'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorUpdatingPassword');
  } finally {
    isUpdatingPassword.value = false;
  }
};

// Verification functions
const resendVerificationEmail = async () => {
  try {
    // API call to resend verification email
    await authApi.resendVerificationEmail({ email: contactInfo.value.email });
    showSuccess(t('profile.verificationEmailSent'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorSendingVerificationEmail');
  }
};

const sendPhoneVerification = async () => {
  try {
    // API call to send verification code via SMS
    await authApi.sendPhoneVerification({ phone: contactInfo.value.phone });
    showSuccess(t('profile.verificationCodeSent'));
  } catch (error) {
    errorService.handleError(error, 'profile.errorSendingVerificationCode');
  }
};

// Utility function for success messages
const showSuccess = (message: string) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
  }, 5000);
};
</script>

<style scoped>
/* Specific styles as needed */
</style>