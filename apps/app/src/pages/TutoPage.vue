<template>
  <div class="q-pa-md">
    <h1>Tutorial page</h1>
    <p>{{ reactiveData }}</p>

    <h2>Counter vue 2</h2>
    <p>{{ counter }}</p>
    <p>Counter x2: {{ counterX2 }}</p>
    <q-btn label="add" @click="increment()"/>
    <h2>Computed</h2>
    <p>{{ fullName }}</p>

    <h2>Conditional rendering</h2>
    <div v-if="firstName === 'John'">
      My name is "John"
    </div>
    <div v-else>
      My name has changed now im {{ firstName }}
    </div>

    <h2>Form & input bindings</h2>
    <q-input label="Firstname" outlined v-model="firstName" ref="inputFirstName"/>

    <h2>Components</h2>
    <TestComponent
      description="lorem ipsum ...."
      :title="firstName"
      @save="increment"
    >
      <p>Override du slot par défaut</p>
      <template #namedSlot>
        On override un slot nommé
      </template>
    </TestComponent>

    <h2>Pinia</h2>
    <CompOne />
    <CompTwo />
    <q-btn label="increment from store" @click="() => counterStore.increment()"/>

    <h2>Async call</h2>
    {{ listStore.lists }}
  </div>
</template>
<script setup>
import TestComponent from 'components/TestComponent.vue'
import CompOne from 'components/CompOne.vue'
import CompTwo from 'components/CompTwo.vue'
import { useCounterStore } from 'stores/example-store'
import { useListStore } from 'stores/list-store'
import { ref, computed, watch, onMounted } from 'vue'

const counterStore = useCounterStore()
const listStore = useListStore()

const inputFirstName = ref()
const firstName = ref('John')
const lastName = ref('Doe')
const reactiveData = ref('Test')
const counter = ref(0)
const counterX2 = computed(() => counter.value * 2)
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

const increment = () => {
  counter.value++
}

onMounted(() => {
  console.log(inputFirstName.value)
  listStore.getLists()
  inputFirstName.value.select()
})

watch(counter, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
</script>
<!-- SYNTAXE VUE 2
<script>
export default {
  data: () => ({
    reactiveData: 'Test',
    counter: 0,
    firstName: 'John',
    lastName: 'Doe'
  }),
  computed: {
    fullName () {
      return `${this.firstName} ${this.lastName}`
    },
    counterX2 () {
      return this.counter * 2
    }
  },
  methods: {
    increment () {
      this.counter++
    }
  },
  watch: {
    counter (newVal, oldVal) {
      console.log(oldVal, newVal)
    }
  }
}
</script> -->
<style lang="scss">
</style>
