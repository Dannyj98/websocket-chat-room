<script setup lang="ts">
import { ref } from 'vue'
import TextBox from '@/components/TextBox.vue'
import SendButton from '@/components/SendButton.vue'
import ChatView from '@/components/ChatView.vue'
import { useWebSocket } from '@/composables/websockets'

import Welcome from '@/components/Welcome.vue'

const { messages, sendMessage, setName } = useWebSocket('ws://localhost:3000')
const message = ref<string>('')
const showWelcome = ref<boolean>(true)

const handleEnterChat = (name: string) => {
  // Connect to the WebSocket server
  setName(name)
  showWelcome.value = false
}

const handleSendMessage = () => {
  // Check there is a message before sending
  if (!message.value) {
    return
  }
  // Send the message
  sendMessage(message.value)

  // Clear the message after sending
  message.value = ''
}
</script>

<template>
  <Welcome v-if="showWelcome" @enter-chat="handleEnterChat" />
  <div class="chat-container">
    <div class="chat-messages">
      <ChatView :allMessage="messages" />
    </div>
    <div class="chat-input">
      <TextBox v-model="message" @enter="handleSendMessage" />
      <SendButton @send="handleSendMessage" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.chat-container {
  background-color: white;

  display: flex;
  flex-direction: column;
  height: calc(90vh - 55px);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #d7d7d7;
}
.chat-input {
  display: flex;
  padding: 10px;
  border: 1px solid #d7d7d7;
}
</style>
