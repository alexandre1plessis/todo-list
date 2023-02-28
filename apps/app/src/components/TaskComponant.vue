<template>
  <input v-if="isChecked" type="checkbox" checked>
  <input v-else type="checkbox">
  <label>{{ description }}</label>
</template>

<script setup>
defineProps({
  isChecked: {
    type: Boolean,
    default: () => false
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>

</style>
