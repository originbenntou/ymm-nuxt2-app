<template>
  <main class="main">
    <Prefecture />
    <Population />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',
})
</script>

<style lang="scss" scoped>
.main {
  width: 90%;
  margin: auto;
}
</style>
