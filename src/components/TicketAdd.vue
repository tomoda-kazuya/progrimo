<template>
  <!-- フラッシュメッセージ -->
  <FlashMessage :message="flashMessage" />

  <div class="p-6 bg-white dark:bg-gray-800">
    <!-- フォーム -->
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">タイトル</label>
        <input
          v-model="ticket.title"
          type="text"
          id="title"
          class="w-full p-2 mt-1 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          required
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">詳細</label>
        <textarea
          v-model="ticket.description"
          id="description"
          rows="4"
          class="w-full p-2 mt-1 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300">優先度</label>
        <select
          v-model="ticket.priority"
          id="priority"
          class="w-full p-2 mt-1 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          required
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="dueDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">期限</label>
        <input
          v-model="ticket.dueDate"
          type="date"
          id="dueDate"
          class="w-full p-2 mt-1 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        チケットを追加
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import FlashMessage from "./FlashMessage.vue";

const flashMessage = ref<{ type: string; message: string } | null>(null);

// チケットデータの初期化
const ticket = ref({
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
});

// フォーム送信時の処理
const submitForm = async () => {
  try {
    // POSTリクエストを送信
    const response = await axios.post("http://localhost:3000/api/tickets", ticket.value);
    console.log("Ticket added:", response.data);

    // フォームリセット
    ticket.value = {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    };

    // フラッシュメッセージを設定（成功メッセージ）
    flashMessage.value = { type: "success", message: "チケットが正常に追加されました。" };

    // フラッシュメッセージを一定時間後に消す
    setTimeout(() => {
      flashMessage.value = null;
    }, 3000);
  } catch (error) {
    console.error("Error adding ticket:", error);

    // エラーメッセージをフラッシュメッセージに設定
    flashMessage.value = { type: "error", message: "チケット追加に失敗しました。" };

    // フラッシュメッセージを一定時間後に消す
    setTimeout(() => {
      flashMessage.value = null;
    }, 3000);
  }
};

// 初期ロード時にフラッシュメッセージを取得する
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/flash-message");
    flashMessage.value = response.data as { type: string; message: string };

    setTimeout(() => {
      flashMessage.value = null;
    }, 3000);
  } catch (error) {
    console.log("No flash message available");
  }
});
</script>
