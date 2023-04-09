<template>
    <main>
      <div class="flex justify-between p-4">
          <h2 class="mr-4">Dashboard</h2>
          <q-avatar class="m" color="primary" text-color="white">T</q-avatar>
      </div>
        <h1>
          <span class="block" style="line-height: 0.8em;">Bonjour</span>
          <span class="block" style="line-height: 1em;">, Tom Dupont ! 👋</span>
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
    </main>
    <footer class="menu-bottom">
      <q-btn @click="() => {displayModalListTab  = true}"><q-icon name="list"></q-icon></q-btn>
      <q-btn class="addList" @click="() => {displayModalAddList = true}"><q-icon name="add"></q-icon></q-btn>
      <q-btn><q-icon name="person"></q-icon></q-btn>
    </footer>

    <addListComponent v-if="displayModalAddList" @addList="displayModalAddList = false"></addListComponent>
</template>

<script setup>
import addListComponent from 'components/AddListComponent.vue'
import CardList from 'components/CardList.vue'
import { useListStore } from 'stores/list-store'
import { onMounted, computed, ref } from 'vue'

const listStore = useListStore()
const lists = computed(() => listStore.lists)
const displayModalAddList = ref(false)

onMounted(async () => {
  await listStore.getLists()
})

</script>

<style scoped>
.listCards{
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  padding: 20px;
}

footer{
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  padding: 10px;
  height: 55px;
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

.m{
  margin: 6px;
}

.block {
  display: block;
}

.menu-bottom {
  position: fixed;
}

main {
  padding-bottom: 5em;
}

</style>
