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
import { ref, onMounted } from 'vue';
import TaskTableRow from '@/components/TaskTableRow.vue';
import axios from 'axios';

const columns = ref([
  { key: 'title', label: 'タイトル' },
  { key: 'description', label: '内容' },
  { key: 'priority', label: '優先度' },
  { key: 'dueDate', label: '期限' },
]);

const tasks = ref<Task[]>([]);

interface Task {
  id: number;
  title: string;
  description: string;
}

// APIからticketsを取得
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tickets');
    tasks.value = response.data as Task[];
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
});
</script>
