<template>
  <h2 v-if="id == 0">Crée une tâche</h2>
  <h2 v-else>Modifier une tâche</h2>
  <div>
    <div>
      <p class="legend"></p>
      <h1>Titre de la tâche</h1>
    </div>
    <div>
      <p class="legend">Description</p>
      <p>Titre de la description</p>
    </div>

    <div>
      <p class="legend">Terminée</p>
      <p v-if="true">Oui</p>
      <p v-else>Non</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => route.params.id)

onMounted(async () => {
})

</script>
