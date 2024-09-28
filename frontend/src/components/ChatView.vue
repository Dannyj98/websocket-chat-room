<script setup lang="ts">
import Message from './Message.vue'
import EnteredRoom from './EnteredRoom.vue'
import LeftRoom from './LeftRoom.vue'
defineProps<{
  allMessage: Message[]
  myId: string
}>()
</script>
<template>
  <div v-for="msg in allMessage" :key="msg.id" class="chat-message">
    <Message v-if="msg.type === 'message'" :message="msg" :myMessage="msg.id === myId" />
    <EnteredRoom v-else-if="msg.type === 'entered_room' && msg.id !== myId" :message="msg" />
    <LeftRoom v-else-if="msg.type === 'left_room' && msg.id !== myId" :message="msg" />
  </div>
</template>
<style scoped lang="scss">
.chat-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
