<template>
  <aside
    class="w-64 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 shadow-lg flex flex-col overflow-y-auto"
  >
    <nav class="flex flex-col gap-y-2">
      <SidebarSection
        :links="[
          { label: 'リリース追加', href: '/release/add' },
          { label: 'リリース一覧', href: '/release/list' },
          { label: 'v2025.05.14', href: '/v2025.05.14' },
          { label: 'タスク2', href: '/tasks2' },
          { label: 'タスク3', href: '/tasks3' },
        ]"
        v-model:open="openSections.tasks"
      >
        <template #title>
          <div class="flex items-center gap-2">
            <RocketLaunchIcon class="w-5 h-5" />
            <span>リリース</span>
          </div>
        </template>
      </SidebarSection>

      <SidebarSection
        :links="[
          { label: 'チケット追加', href: '/ticket/add' },
          { label: 'チケット一覧', href: '/ticket/list' },
        ]"
        v-model:open="openSections.progress"
      >
        <template #title>
          <div class="flex items-center gap-2">
            <TicketIcon class="w-5 h-5" />
            <span>チケット</span>
          </div>
        </template>
      </SidebarSection>
    </nav>

    <div class="mt-auto pt-6 border-t border-gray-300 dark:border-gray-700">
      <a href="/settings" class="block py-2 font-semibold">
        <div class="flex items-center">
          <CogIcon class="w-5 h-5 mr-2" />
          <span>設定</span>
        </div>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  RocketLaunchIcon,
  TicketIcon,
  CogIcon,
} from "@heroicons/vue/24/outline";
import SidebarSection from "./SidebarSection.vue";

const openSections = ref({
  tasks: false,
  progress: false,
});
</script>
