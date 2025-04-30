<template>
  <div
    v-if="message"
    :class="`alert alert-${message.type} slide-in`"
    class="flash-message"
  >
    {{ message.message }}
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

// フラッシュメッセージのプロパティを定義
const props = defineProps<{
  message: { type: string; message: string } | null;
}>();

const emit = defineEmits<{
  (event: 'update:message', value: { type: string; message: string } | null): void;
}>();

const timer = ref<ReturnType<typeof setTimeout> | null>(null);

import { watch } from "vue";

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      if (timer.value) {
        clearTimeout(timer.value); // 前のタイマーがあればクリア
        emit('update:message', null); // メッセージを消す
      }
      // メッセージが来たら一定時間後に消去
      timer.value = setTimeout(() => {
        emit('update:message', null); // メッセージを消す
      }, 3000);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* フラッシュメッセージのスタイル */
.flash-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  width: 80%;
  max-width: 400px;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* スライドインアニメーション */
.flash-message.slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

/* フラッシュメッセージの色 */
.alert.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.alert.warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

/* スライドインのアニメーション */
@keyframes slideIn {
  0% {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(20px);
    opacity: 1;
  }
}
</style>
