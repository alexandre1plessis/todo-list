<template>
    <div>
        <h1>List name</h1>
        <div class="tasksList">
            <h2>Tasks - {{ tasks.length }}</h2>

            <div v-for="task in tasks" :key="task._id"  @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">
              <div v-if="!task.state">
                <input type="checkbox">
                <p>{{ task.title }}</p>
              </div>
            </div>
        </div>

        <div class="tasksList">
            <h2>Tasks completed - {{ tasksCompleted.length }}</h2>

            <div v-for="task in tasksCompleted" :key="task._id"  @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">
                <input type="checkbox" @input="event => editStatusTask(event.target.value)">
                <p >{{ task.title }}</p>
            </div>
        </div>
        <add-list-component class="addListComponent"></add-list-component>
    </div>
</template>

<script setup>
import { useListStore } from 'src/stores/list-store'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const tasks = computed(() => listStore.tasks)
const tasksIncompleted = []
const tasksCompleted = []

const id = computed(() => route.params.id)

onMounted(async () => {
  const id = computed(() => route.params.id)
  await listStore.getLists()
  await listStore.getTasks(id.value)
})

function editStatusTask (event) {
  console.log(id)
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
