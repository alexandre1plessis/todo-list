<template>
  <div>
    <q-card>
      <q-card-section>
        <h5 class="text-bold">Component one</h5>
        <p>{{ counterStore.counter }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useCounterStore } from 'stores/example-store'

const counterStore = useCounterStore()
</script>
