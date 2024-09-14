<script setup lang="ts">
import Message from './Message.vue'
defineProps<{
  allMessage: Message[]
}>()
</script>
<template>
  <div v-for="msg in allMessage" :key="msg.id" class="chat-message">
    <Message :message="msg" />
  </div>
</template>
<style scoped lang="scss">
.chat-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
