<template>
    <div>
        <h1>List name</h1>
        <div>
            <h2>Tasks - {{ tasks.length }}</h2>

            <div class="tasksList">
                <div class="task" v-for="task in tasks" :key="task._id"  @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">
                    <input type="checkbox" @input="event => editStatusTask(event.target.value)">
                    <p>{{ task.title }}</p>
                </div>
            </div>
        </div>

        <div>
            <h2>Tasks completed - {{ tasksCompleted.length }}</h2>

            <div class="tasksList">
                <div class="task"  v-for="task in tasksCompleted" :key="task._id"  @click="() => router.push({ name: 'detail-task', params:{ id: task._id }})">
                    <input type="checkbox" @input="event => editStatusTask(event.target.value)" checked>
                    <s>{{ task.title }}</s>
                </div>
            </div>
        </div>
        <addEditTask v-if="displayModalAddTask" @addList="displayModalAddList = false"></addEditTask>
        <q-btn class="addList" @click="() => router.push({ name: 'add-edit-task', params:{ id: false }})"><q-icon name="add"></q-icon></q-btn>
    </div>
</template>

<script setup>
import { useListStore } from 'src/stores/list-store'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const tasks = computed(() => listStore.lists)
const tasksCompleted = []

const id = computed(() => route.params.id)

onMounted(async () => {
  await listStore.getLists()
})

function editStatusTask (event) {
  console.log(id)
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
</style>
