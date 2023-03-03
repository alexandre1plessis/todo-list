<template>
  <div>
    <div>
      <p class="legend"></p>
      <h1>{{ task.title }}</h1>
    </div>

    <div>
      <p class="legend">Description</p>
      <p>{{ task.description }}</p>
    </div>

    <div>
      <p class="legend">Terminée</p>
      <p v-if="task.state">Oui</p>
      <p v-else>Non</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { TaskModel } from

let pageType
const route = useRoute()
const router = useRouter()

console.log(task)

onMounted(async () => {
})

</script>
