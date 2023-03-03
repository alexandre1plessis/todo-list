<template>
    <div>
        <h1>List page</h1>
        <p class="bold">Identifiant : {{ id }}</p>

        <q-btn label="to homepage"
        @click="() => router.push('/')">
        </q-btn>

        <div v-for="(list, index) in lists" :key="index">
            <q-card>
                <q-card-section>
                    <p class="text-bold">{{ list.title }}</p>
                    <q-btn label="Show list" @click="() => router.push({ name: 'list-view', params:{ id: list._id }})"></q-btn>
                </q-card-section>
            </q-card>
            <p>{{ list }}</p>
        </div>
    </div>
</template>

<script setup>
import { useListStore } from 'src/stores/list-store'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listStore = useListStore()
const lists = computed(() => listStore.lists)

onMounted(async () => {
  await listStore.getLists()
})

const id = computed(() => route.params.id)
console.log(route)
console.log(lists)
</script>
