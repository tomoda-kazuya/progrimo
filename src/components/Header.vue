<template>
  <header class="bg-[#003366] text-white p-4 dark:bg-[#1a202c] dark:text-gray-300 fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold">
        <a href="/" class="text-white">Progrimo</a>
      </h1>
      <!-- <nav class="ml-auto">
        <a href="/todaytasks" class="text-white px-4 hover:text-opacity-70 transition-all">今日のタスク</a>
      </nav> -->
      <DarkModeToggle client:load />
    </div>
  </header>
</template>

<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
</script>

