<template>
  <button @click="toggleDarkMode" class="relative w-12 h-12 bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
    <!-- 円形背景 -->
    <div :class="isDarkMode ? 'bg-[#005BAC]' : 'bg-[#00A3E0]'" class="absolute inset-0 rounded-full transition-all duration-300 ease-in-out"></div>

    <!-- アイコンの切り替え -->
    <div class="absolute transition-all duration-500 ease-in-out transform">
      <MoonIcon v-if="isDarkMode" class="w-6 h-6 text-white" />
      <SunIcon v-else class="w-6 h-6 text-white" />
    </div>

    <div v-if="isDarkMode"></div>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid';

const isDarkMode = ref(false);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('darkMode');
  }
}
</script>

<style scoped>
button {
  position: relative;
  width: 3rem;
  height: 3rem;
}

button:hover {
  background-color: #4b5563;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

@keyframes ping {
  75% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
