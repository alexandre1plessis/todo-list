<template>
  <li>
    <input type="checkbox" :id="task._id" v-model="isChecked" @change="saveChange()"/>
    <label :for="task._id">{{ task.title }}</label>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { useListStore } from 'stores/list-store'

const props = defineProps({
  task: {
    type: Object,
    default: () => { return { _id: 0, title: '', state: false } }
  }
})

const listStore = useListStore()
const task = ref(props.task)
const isChecked = ref(props.task.state)

function saveChange () {
  task.value.state = isChecked.value
  listStore.updateTask(task.value)
}

</script>

<style scoped>

</style>
