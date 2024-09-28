<script setup lang="ts">
defineProps<{
  message: MessageEvent<object>
}>()
</script>
<template>
  <span class="italic f">{{ message.name }} left the room</span>
</template>
