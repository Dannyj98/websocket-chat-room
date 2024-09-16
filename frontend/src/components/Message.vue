<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  message: MessageEvent<object>
}>()

const messageType = computed(() => {
  switch (props.message.type) {
    case 'message':
      return 'text'
    case 'connection':
      return 'image'
    case 'disconnection':
      return ''
    default:
      return 'text'
  }
})

const readableDate = computed(() => {
  return new Date(props.message.createdAt).toLocaleString()
})
</script>
<template>
  <div class="bg-blue-100 p-4 rounded-lg my-1">
    <div class="text-lg font-semibold">{{ props.message.name }}</div>
    <div class="">
      {{ message.content }}
    </div>
    <div class="text-sm text-gray-600">{{ readableDate }}</div>
  </div>
</template>
