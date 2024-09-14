<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  message: Message
}>()

const readableDate = computed(() => {
  return new Date(props.message.timestamp).toLocaleString()
})
</script>
<template>
  <div class="bg-blue-100 p-4 rounded-lg my-1">
    <div class="">
      {{ message.text }}
    </div>
    <div class="text-sm text-gray-600">{{ readableDate }}</div>
  </div>
</template>
