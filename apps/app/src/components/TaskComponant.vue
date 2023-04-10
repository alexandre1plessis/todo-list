<template>
  <div>
   <q-checkbox color="green"  class="c" :label="task.title" v-model="task.state" @update:model-value="(value, evt) => saveChange()"/>
  </div>
</template>

<script setup>
import { useListStore } from 'stores/list-store'
import { ref, defineProps } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => { return { _id: 0, title: '', state: false } }
  }
})
const task = ref(props.task)
const listStore = useListStore()

function saveChange () {
  listStore.updateTask(task.value)
}

</script>

<style scoped>

  .c {
    width: 100%;
  }

</style>
