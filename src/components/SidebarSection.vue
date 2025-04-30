<template>
  <div class="mb-2">
    <button
      @click="toggle"
      class="w-full text-left py-2 font-bold flex items-center space-x-2"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </button>
    <transition @enter="enter" @leave="leave">
      <ul v-show="isOpen" class="ml-4 overflow-hidden">
        <li v-for="link in links" :key="link.label">
          <a :href="link.href" class="block py-2">{{ link.label }}</a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { enter, leave } from "../utils/slideTransition";

interface Props {
  title?: string;
  links: { label: string; href: string }[];
  open: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:open"]);

const isOpen = computed(() => props.open);
const toggle = () => emit("update:open", !props.open);
</script>
