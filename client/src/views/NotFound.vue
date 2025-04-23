<template>
  <div class="container text-center mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-5">
            <h1 class="display-1 text-danger">404</h1>
            <h2 class="mb-4">{{ $t('notFound.title') }}</h2>
            <p class="mb-4">{{ $t('notFound.message') }}</p>
            <router-link to="/" class="btn btn-primary">
              {{ $t('notFound.backToHome') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pas de logique supplémentaire nécessaire
</script>