<template>
  <header class="flex justify-between p-4">
    <q-btn  icon="chevron_left" class="button-retour" @click="goBack()"/>
    <q-btn flat icon="more_horiz" >
      <q-menu auto-close anchor="bottom start" self="top left">
        <q-item clickable  @click="() => router.push({ name: 'add-edit-task', params:{ id: task._id, idList: id }})">
          <q-item-section><span>Modifier</span></q-item-section>
        </q-item>
        <q-item clickable  @click="() => dispalyModalDeplacer = true">
          <q-item-section><span>Déplacer</span></q-item-section>
        </q-item>
        <q-item clickable @click="displayModalSuprr = true">
          <q-item-section><span class="red">Supprimer</span></q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </header>
  <main>
    <h5>Task</h5>
    <h2>{{task.title}}</h2>
    <div>
      <h5>Description</h5>
      <p>{{task.description}}</p>
    </div>
    <div>
      <h5>Terminée</h5>
      <p v-if="task.state === false">Non</p>
      <p v-else>Oui</p>
    </div>
  </main>
  <modal-supression v-if="displayModalSuprr" :id="task._id" :type="'tâche'" @closeModal="suprr" ></modal-supression>
  <move-task-component v-if="dispalyModalDeplacer" :id="task._id" @closeModal="dispalyModalDeplacer = false"></move-task-component>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from 'stores/list-store'
import ModalSupression from 'components/ModalSupression.vue'
import MoveTaskComponent from 'components/MoveTaskComponent.vue'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const dispalyModalDeplacer = ref(false)
const displayModalSuprr = ref(false)
const id = route.params.idList

const task = computed(() => listStore.task)

onMounted(async () => {
  await listStore.getTask(route.params.id)
})

function goBack () {
  router.go(-1)
}
function suprr () {
  displayModalSuprr.value = false
  goBack()
}
</script>

<style scoped>
.button-retour {
  display: inline-block;
  width: auto;
  height: auto;
  min-height: 0;
  padding: 0.2em;
  margin-left: 10px;
  background-color: #F2F2F2;
}
header > h5 {
  cursor: pointer;
}
main{
  text-align: left;
}
h3 {
  text-align: left;
  margin-bottom: 1em;
  margin-left: 0.5em;
}
h2 {
  width: 100%;
  font-weight: 400;
}
.width {
  width: 90%;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 2em;
}
header {
  margin-top: 1em;
}
.red {
  color: #C10707;
}
h5 {
  margin-bottom: 0;
  margin-left: 0.5em;
}
p {
  margin-top: 0.5em;
  margin-left: 1em;
  font-size: 1.5em;
}
</style>
