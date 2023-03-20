<template>
  <div>
    <h1>Bonjour,<br>Tom Dupont ! 👋
    </h1>
    <div class="listCards">
      <CardList
        v-for="list in lists"
        :key="list._id"
        :id="list._id"
        :title="list.title"
        :tasks="list.tasks"
      ></CardList>
    </div>

    <footer>
      <q-btn @click="() => {displayModalListTab  = true}"><q-icon name="list"></q-icon></q-btn>
      <q-btn class="addList" @click="() => {displayModalAddList = true}"><q-icon name="add"></q-icon></q-btn>
      <q-btn><q-icon name="person"></q-icon></q-btn>
    </footer>

    <addListComponent v-if="displayModalAddList" @addList="displayModalAddList = false"></addListComponent>

  </div>

</template>

<script setup>
import addListComponent from 'components/AddListComponent.vue'
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted, computed, ref } from 'vue'

// const titre = ref()
const listStore = useListStore()
const lists = computed(() => listStore.lists)
// let displayModalTabList = ref(false)
const displayModalAddList = ref(false)

// function closeModal (event) {
//   console.log(event)
//   switch (event) {
//     case event === 'addList':
//       displayModalAddList.value = false
//       break
//     // case event === 'tabList':
//     // displayModalTabList = false;
//     //   break;
//   }
// }

onMounted(async () => {
  await listStore.getLists()
})

// function save () {
//   if (titre.value) {
//     listStore.addList(titre.value)
//   }
//   titre.value = ''
//   AddList()
// }

</script>
<style scoped>
.listCards{
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100vw;
  padding: 20px;
}

footer{
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  padding: 10px;
  background-color: white;
  box-shadow: -5px 0 5px black;
}

footer button:before {
  box-shadow: none;
}
.addList:before {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transform: translate(8px, -2px);
  background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
}
.addList i{
  color: white;
}

</style>
