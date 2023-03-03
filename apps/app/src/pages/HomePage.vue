<template>
  <h1>Home</h1>
    <CardList
      v-for="list in lists"
      :key="list.id"
      :title="list.title"
    ></CardList>
  <button>+</button>
  <label>Nom de la nouvelle lists</label>
  <input v-model="titre" placeholder="edit me">
  <button @click="save()">save</button>
</template>
<script setup>
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted, computed, ref } from 'vue'

const titre = ref()
const listStore = useListStore()
const lists = computed(() => listStore.lists)

function save () {
  if (titre.value) {
    listStore.addList(titre.value)
  }
}

onMounted(async () => {
  await listStore.getLists()
})
</script>
<style scoped>

</style>
