<template>
  <h1>{{ pageType }} une tâche</h1>

  <form>
    <div v-if="errors.length > 0">
      <div v-for="(currError, index) in errors" :key="index">
        <p>{{ currError }}</p>
      </div>
    </div>
    <fieldset>
        <legend>Task</legend>
        <input type="text" v-model="task.title" placeholder="Describe your task" required>
    </fieldset>

    <fieldset>
        <legend>description</legend>
        <textarea type="text" v-model="task.description" placeholder="Describe your task..."></textarea>
    </fieldset>
  </form>

  <div class="buttons">
      <q-btn label="Annuler" @click="() => router.push('/')"></q-btn>
      <q-btn type="submit" v-if="pageType === 'Modifier'" label="Modifier" @click="save(pageType)"></q-btn>
      <q-btn type="submit" v-else label="Créer" @click="save(pageType)"></q-btn>
  </div>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from 'stores/list-store'
import { Notify } from 'quasar'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const pageType = ref('')
const errors = ref([])

if (route.params.id > 0) {
  pageType.value = 'Modifier'
} else {
  pageType.value = 'Créer'
}

const task = computed(() => {
  if (route.params.id !== '0') {
    return listStore.task
  } else {
    return { title: '', description: '', state: false, list: route.params.idList }
  }
})

onMounted(async () => {
  if (route.params.id !== '0') {
    await listStore.getTask(route.params.id)
  }
})

async function save (pageType) {
  errors.value = []
  if (task.value.title === '') {
    errors.value.push('Le titre ne doit pas être vide')
    return
  }
  if (pageType === 'Créer') {
    try {
      await listStore.createTask(task.value)
      Notify.create('Tache enregistrer')
      this.router.go(-1)
    } catch (e) {
      errors.value.push(e.message)
    }
  }
  if (pageType === 'Modifier') {
    try {
      await listStore.updateTask(task.value)
      Notify.create('Tache modifier')
      this.router.go('/')
    } catch (e) {
      errors.value.push(e.message)
    }
  }
}
</script>

<style scoped>
  fieldset {
    border: none;
    padding-bottom: 30px;
  }
  legend {
    font-size: 16px;
    font-weight: bold;
  }
</style>
