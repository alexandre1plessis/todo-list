<template>
  <div>
    <a  @click="goBack()">Retour</a>
  </div>
    <div>
        <h1>List name</h1>
        <div class="tasksList">
            <h2>Tasks - {{ tasksIncompleted.length }}</h2>

            <div v-for="task in tasksIncompleted" :key="task._id">
              <div v-if="!task.state">
                <input type="checkbox" :id="task._id" v-model="task.state" @change="editStatusTask(task)">
                <label :for="task._id" @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">{{ task.title }}</label>
              </div>
            </div>
        </div>

        <div class="tasksList">
            <h2>Tasks completed - {{ tasksCompleted.length }}</h2>

            <div v-for="task in tasksCompleted" :key="task._id">
                <input type="checkbox" :id="task._id" v-model="task.state" @change="editStatusTask(task)">
                <label :for="task._id" @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">{{ task.title }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useListStore } from 'src/stores/list-store'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const tasksIncompleted = computed(() => listStore.tasksI)
const tasksCompleted = computed(() => listStore.tasksC)

const id = computed(() => route.params.id)

onMounted(async () => {
  const id = computed(() => route.params.id)
  await listStore.getLists()
  await listStore.getTasksIncomplet(id.value)
  await listStore.getTasksComplete(id.value)
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

<style>
.addListComponent{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
}
</style>
