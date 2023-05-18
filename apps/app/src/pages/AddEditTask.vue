<template>
  <header class="flex justify-between p-4">
    <q-btn  icon="chevron_left" class="button-retour" @click="goBack()"/>
  </header>
  <main>
    <h2>{{ pageType }} une tâche</h2>
    <form>
      <div v-if="errors.length > 0">
        <div v-for="(currError, index) in errors" :key="index">
          <p>{{ currError }}</p>
        </div>
      </div>
      <h3>Titre</h3>
      <q-input class="width q-mx-auto" outlined v-model="taskForm.title" placeholder="Tâche 1" required/>
      <h3>Description</h3>
      <q-input class="width q-mx-auto" v-model="taskForm.description" filled type="textarea" placeholder="Description de la tâche..."/>
    </form>
  </main>
  <footer>
      <q-btn class="btn q-mx-auto" type="submit" v-if="pageType === 'Modifier'" label="Modifier" @click="save(pageType)"></q-btn>
      <q-btn class="btn q-mx-auto" type="submit" v-else label="Créer" @click="save(pageType)"></q-btn>
  </footer>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from 'stores/list-store'
import { Notify } from 'quasar'
import { AdMob } from '@capacitor-community/admob'
import { interstitial } from 'boot/addMob'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const pageType = ref('')
const errors = ref([])

if (route.params.id !== '0') {
  pageType.value = 'Modifier'
} else {
  pageType.value = 'Créer'
}

const task = computed(() => {
  if (route.params.id !== '0') {
    return listStore.task
  } else {
    return taskForm
  }
})

const taskForm = ref({ title: '', description: '', state: false, list: route.params.idList })

onMounted(async () => {
  if (route.params.id !== '0') {
    await listStore.getTask(route.params.id)
    taskForm.value = task.value
  }
  await interstitial()
})

async function save (pageType) {
  errors.value = []
  if (taskForm.value.title === '') {
    errors.value.push('Veuillez mettre un titre')
    return
  }
  if (pageType === 'Créer') {
    try {
      await listStore.createTask(taskForm.value)
      Notify.create('Tâche enregistrée')
      this.goBack()
    } catch (e) {
      errors.value.push(e.message)
    }
  }
  if (pageType === 'Modifier') {
    try {
      await listStore.updateTask(taskForm.value)
      Notify.create('Tâche modifiée')
    } catch (e) {
      errors.value.push(e.message)
    }
  }
  AdMob.showInterstitial()
}

function goBack () {
  router.go(-1)
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
.btn {
  width: 90%;
  color: #FFFFFF;
  background: #613973;
  display: block;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 2em;
}
header {
  margin-top: 1em;
}
</style>
