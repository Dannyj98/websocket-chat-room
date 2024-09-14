<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
<style scoped lang="scss">
main {
  background-color: #f9f9f9;
  height: 100vh;
}
.container {
  width: 80%;
  margin: auto;
  padding-top: 50px;
}
</style>
