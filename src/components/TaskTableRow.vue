<template>
  <tr
    class="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <td
      v-for="column in columns"
      :key="column.key"
      class="p-4"
    >
      {{ task[column.key] }}
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  task: Record<string, any>;
  columns: {
    key: string;
    label: string;
  }[];
}>();
</script>
