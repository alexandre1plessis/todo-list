<template>
  <q-checkbox class="c" :label="task.title" v-model="isChecked"  @change="saveChange()" />
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

  .c {
    width: 100%;
  }

</style>
