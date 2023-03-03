<template>
    <div>
        <h1>{{ pageType }} une tâche</h1>

        <fieldset>
            <legend>Task</legend>
            <input type="text" @input="event => taskName = event.target.value">
        </fieldset>

        <fieldset>
            <legend>description</legend>
            <input type="text" @input="event => taskDescription = event.target.value">
        </fieldset>

        <div class="buttons">
            <q-btn label="Annuler" @click="() => router.push('/')"></q-btn>
            <q-btn v-if="pageType === 'Modifier'" label="Modifier" @click="editTask()"></q-btn>
            <q-btn v-else label="Créer" @click="createTask()"></q-btn>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { TaskModel } from

// const pageType = ref('Créer')
let pageType
const route = useRoute()
const router = useRouter()

const task = computed(() => {
  console.log(route.params)
  if (route.params.id) {
    pageType = 'Modifier'
    // pageType.value = 'Modifier'
    // return getTask
  } else {
    pageType = 'Créer'
    // pageType.value = 'Créer'
    // return new TaskModel()
  }
  return true
})
console.log(task)

onMounted(async () => {
})

function createTask () {

}
function editTask () {

}
</script>
