<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['enter-chat'])

const name = ref<string>('')
const handleEnterChat = () => {
  if (!name.value) {
    return
  }
  console.log(name.value)
  // Emit the event to enter the chat
  emit('enter-chat', name.value)
}
</script>
<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h1>Welcome to the Chat App</h1>
      <p>This is a simple chat application built with Vue 3 and WebSockets.</p>
      <div class="form">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="name"
          type="text"
          name="message"
          id="message"
          class="block w-full border-gray-30 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-3 p-3 my-3"
          placeholder="Enter name here..."
        />
        <button
          @click="handleEnterChat"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Enter Chat
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
