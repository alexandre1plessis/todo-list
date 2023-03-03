<template>
  <div>
    <h1>Home</h1>
    <div class="listCards">
      <CardList
        v-for="list in lists"
        :key="list.id"
        :title="list.title"
      ></CardList>
    </div>
    <q-btn label="+" @click="() => {displayModal = true}"></q-btn>

    <div v-show="displayModal" class="modalAddList">
      <h2>Créer une nouvelle liste</h2>

      <fieldset>
        <legend>List name</legend>
        <input v-model="titre" :placeholder="'Ex: Courses'">
      </fieldset>

      <div class="modalButtons">
      <q-btn label="Annuler" @click="() => {displayModal = false}"></q-btn>
      <q-btn label="Créer" @click="save()"></q-btn>

      </div>
    </div>
  </div>

</template>

<script setup>
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted, computed, ref } from 'vue'

const titre = ref()
const listStore = useListStore()
const lists = computed(() => listStore.lists)
const displayModal = ref(false)

onMounted(async () => {
  await listStore.getLists()
})

function save () {
  if (titre.value) {
    listStore.addList(titre.value)
  }
  titre.value = ''
  AddList()
}

function AddList () {
  displayModal.value = false
}

</script>
<style scoped>
.listCards{
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
