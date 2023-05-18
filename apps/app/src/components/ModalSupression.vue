<template>
  <div class="modal">
    <div class="content">
      <h3>Supprimer la {{type}}</h3>
      <div>
        Vous êtes sur le point de supprimer votre {{type}} êtes vous sûr de vouloir faire ça ?
      </div>

      <div class="modalButtons">
        <q-btn label="Annuler" @click="closeModalSuppr()"></q-btn>
        <q-btn label="Supprimer" @click="del(id)" color="red"></q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from 'vue'
import { useListStore } from 'stores/list-store'

const props = defineProps({
  type: {
    type: String,
    default: 'liste'
  },
  id: {
    type: String,
    default: ''
  }
})

const type = ref(props.type)
const id = ref(props.id)
const emit = defineEmits(['closeModal'])
const listStore = useListStore()

function closeModalSuppr () {
  emit('closeModal')
}

async function del (id) {
  if (type.value === 'liste') {
    await listStore.deleteList(id)
  } else {
    await listStore.deleteTask(id)
  }
  emit('delete')
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
</style>
