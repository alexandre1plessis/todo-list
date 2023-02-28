<template>
  <h1>Home</h1>
    <CardList
      v-for="list in listStore.lists"
      :key="list.id"
      :title="list.title"
    ></CardList>
</template>
<script setup>
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted } from 'vue'

const listStore = useListStore()
listStore.getLists()

onMounted(() => {
})
</script>
<style scoped>

</style>
