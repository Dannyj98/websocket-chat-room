<script setup lang="ts">
import { ref } from 'vue'
import TextBox from '@/components/TextBox.vue'
import SendButton from '@/components/SendButton.vue'
import ChatView from '@/components/ChatView.vue'

const message = ref<string>('')
const allMessage = ref<Message[]>([])

const handleSendMessage = () => {
  // Check there is a message before sending
  if (!message.value) {
    return
  }
  // Send the message
  console.log(message.value)
  allMessage.value.push({
    id: allMessage.value.length + 1,
    text: message.value,
    timestamp: new Date().toISOString()
  })

  // Clear the message after sending
  message.value = ''
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-messages">
      <ChatView :allMessage="allMessage" />
    </div>
    <div class="chat-input">
      <TextBox v-model="message" />
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
