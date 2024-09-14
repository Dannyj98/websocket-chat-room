<script setup lang="ts">
defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

// Function to handle input event and emit the updated value
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    @input="handleInput"
    :value="modelValue"
    type="text"
    name="message"
    id="message"
    class="block w-full border-gray-30 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-3 p-3"
    placeholder="Enter message here..."
  />
</template>
