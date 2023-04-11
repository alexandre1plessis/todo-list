<template>
  <div class="modal">
    <div class="content">
      <h3>Déplacer la tâche dans une liste</h3>
      <div>
        <q-select outlined v-model="model" :options="list" label="Selectionner la liste" />
      </div>
      <div class="modalButtons">
        <q-btn label="Annuler" @click="closeModalMove()"></q-btn>
        <q-btn label="Déplacer" @click="moveTask()" class="createBtn"></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useListStore } from 'src/stores/list-store'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const model = ref(null)
const listStore = useListStore()
const id = ref(props.id)
const list = ref([])
const emit = defineEmits(['closeModal'])

onMounted(async () => {
  await listStore.getLists()
  const lists = listStore.lists
  lists.forEach(l => list.value.push(l.title))
})

function closeModalMove () {
  emit('closeModal')
}
async function moveTask () {
  await listStore.moveTask(id.value, model.value)
  closeModalMove()
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc( 100vh - 55px);
  background-color: rgba(0, 0, 0, 0.25);
}
.modalButtons {
  margin-top: 0.5em;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.modalButtons button:before{
  content: none;
}
.content {
  position: relative;
  width: 350px;
  height: fit-content;
  min-height: 250px;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 14px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.createBtn {
  padding: 10px 30px;
  background: #613973;
  color: white
}
</style>
