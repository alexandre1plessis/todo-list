<template>
  <div class="flex justify-between p-4">
    <div class="row items-center p-4">
      <q-btn icon="chevron_left" class="button-retour" @click="goBack()"/>
      <h2 >{{nameList}}</h2>
    </div>
    <q-btn flat icon="more_horiz" >
      <q-menu auto-close anchor="bottom start" self="top left">
        <q-item clickable @click="displayModalSuprr = true">
          <q-item-section><span class="red">Supprimer</span></q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
    <div>
      <h2>Tasks - {{ tasksIncompleted.length }}</h2>
      <div class="tasksList">
            <div v-for="task in tasksIncompleted" :key="task._id">
                <input type="checkbox" :id="task._id" v-model="task.state" @change="editStatusTask(task)">
                <label :for="task._id" @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">{{ task.title }}</label>
            </div>
      </div>

        <div>
            <h2>Tasks completed - {{ tasksCompleted.length }}</h2>

            <div class="tasksList">
              <div v-for="task in tasksCompleted" :key="task._id">
                <input type="checkbox" :id="task._id" v-model="task.state" @change="editStatusTask(task)">
                <label :for="task._id" @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">{{ task.title }}</label>
              </div>
            </div>
        </div>
        <addEditTask v-if="displayModalAddTask" @addList="displayModalAddList = false"></addEditTask>
        <q-btn class="addList" @click="() => router.push({ name: 'add-edit-task', params:{ id: 0, idList: id }})"><q-icon name="add"></q-icon></q-btn>
    </div>
  <modal-supression v-if="displayModalSuprr" :id="id" @closeModal="goBack()" ></modal-supression>
</template>

<script setup>
import { useListStore } from 'src/stores/list-store'
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ModalSupression from 'components/ModalSupression.vue'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const tasksIncompleted = computed(() => listStore.tasksI)
const tasksCompleted = computed(() => listStore.tasksC)
const nameList = computed(() => listStore.list.name)
const displayModalSuprr = ref(false)

const id = computed(() => route.params.id)

onMounted(async () => {
  const id = computed(() => route.params.id)
  await listStore.getLists()
  await listStore.getTasksIncomplet(id.value)
  await listStore.getTasksComplete(id.value)
  await listStore.getList(id.value)
})

async function editStatusTask (task) {
  await listStore.updateTask(task)
  await listStore.getTasksIncomplet(id.value)
  await listStore.getTasksComplete(id.value)
}

function goBack () {
  this.router.go(-1)
}
</script>

<style scoped>
.addList {
    position: fixed;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%);
}

.addList:before {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  transform: translate(8px, -2px);
  background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
}
.addList i{
  color: white;
  font-size: 3.215em !important;
}

.tasksList{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-bottom: 35px;
}

.task {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 20px;
    width: 80%;
    background: #F2F2F2;
    padding: 10px;
    border-radius: 10px;
}
.task input {
    height: 15px;
}
.task p {
    margin: unset;
}

.m{
  margin: 6px;
}

.button-retour {
  display: inline-block;
  width: auto;
  height: auto;
  min-height: 0;
  padding: 0.2em;
  margin-left: 10px;
  background-color: #F2F2F2;
}
.red {
  color: #C10707;
}
</style>
