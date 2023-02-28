<template>
  <p>{{ title }}</p>
  <slot name="default">
    <p v-if="tasks.length == 0" >Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
    <p v-else>
      <TaskComponant
        v-for="task in tasks"
        :key="task.id"
        :isChecked="task.status"
        :description="task.description"
      ></TaskComponant>
    </p>
  </slot>
  <p>Voir la liste complète</p>
</template>

<script setup>
import TaskComponant from 'components/TaskComponant.vue'
defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  tasks: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>

</style>
