<template>
  <div>
    <h1>Home</h1>
    <div class="listCards">
      <CardList
        v-for="list in listStore.lists"
        :key="list.id"
        :title="list.title"
      ></CardList>
    </div>
    <q-btn label="+" @click="() => {displayModal = true}"></q-btn>

    <div v-show="displayModal" class="modalAddList">
      <h2>Créer une nouvelle liste</h2>

      <fieldset>
        <legend>List name</legend>
        <input :value="textModal" @input="event => textModal = event.target.value" :placeholder="'Ex: Courses'">
      </fieldset>

      <div class="modalButtons">
      <q-btn label="Annuler" @click="() => {displayModal = false}"></q-btn>
      <q-btn label="Créer" @click="() => AddList()"></q-btn>

      </div>
    </div>
  </div>

</template>

<script setup>
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted, ref } from 'vue'
const displayModal = ref(false)
const listStore = useListStore()
let textModal

listStore.getLists()

onMounted(() => {
})

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
