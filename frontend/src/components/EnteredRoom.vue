<script setup lang="ts">
defineProps<{
  message: MessageEvent<object>
}>()
</script>
<template>
  <span class="italic f">{{ message.name }} entered the room</span>
</template>
