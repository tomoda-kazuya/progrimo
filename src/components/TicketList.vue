<template>
  <div class="overflow-x-auto">
    <div class="max-h-[400px] overflow-y-auto">
      <table class="min-w-max w-full bg-white dark:bg-gray-800 rounded shadow-md">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
            <th v-for="column in columns" :key="column.key" class="p-4 whitespace-nowrap">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <TaskTableRow
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :columns="columns"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TaskTableRow from '@/components/TaskTableRow.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'タイトル' },
  { key: 'description', label: '内容' },
]);

const tasks = ref([
  { id: 1, title: 'ミーティング準備', description: 'プレゼン資料を確認する' },
  { id: 2, title: '開発作業', description: 'ログイン画面のバグ修正' },
  { id: 3, title: 'コードレビュー', description: 'PR #42 を確認する' },
]);
</script>
