<template>
  <label class="flex items-center gap-2">
    <input type="checkbox" v-model="checked" />
    <span>{{ checked ? 'ON' : 'OFF' }}</span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
</script>
