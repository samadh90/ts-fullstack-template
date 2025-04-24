<template>
  <div class="version-info">
    <span>v{{ version }}</span>
  </div>
</template>

<script setup lang="ts">
import { version } from '../version';
</script>

<style scoped>
.version-info {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 0.5rem;
}
</style>