<template>
  <aside>
    <div class="header">
      <q-icon class="q-icon" name="close" size="1.5em" @click="$emit('closeModal')" />
    </div>
    <div>
      <h2>Mes listes</h2>
      <q-btn class="btn q-mx-auto" label="Créer une liste" @click="$emit('addList')"/>
      <div v-for="list in lists" :key="list._id">
        <h3 @click="() => router.push({ name: 'list-view', params:{ id: list._id }})">{{list.title}}</h3>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useListStore } from 'stores/list-store'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const listStore = useListStore()
const lists = computed(() => listStore.lists)
const router = useRouter()

onMounted(async () => {
  await listStore.getLists()
})
</script>

<style scoped>
aside {
  margin-top: 60px;
  text-align: left;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.header {
  width: 100%;
  margin: 0.5em;
  display: flex;
  flex-direction: row-reverse;
}
.q-icon {
  color: #828282;
  cursor: pointer;
  margin: 0.5em;
}
h2 {
  width: 100%;
}
.btn {
  width: 90%;
  color: #FFFFFF;
  background: #613973;
  display: block;
}
h3 {
  margin: 1em 0.7em;
  text-align: left;
  border-bottom: 0.1em solid #E0E0E0;
  cursor: pointer;
}
</style>
