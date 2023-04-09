<template>
    <q-card flat bordered class="listCard">
      <q-card-section class="listCardHeader">
            <h2>{{ title }}</h2>
            <q-btn  round flat icon="more_horiz" >
              <q-menu auto-close anchor="bottom start" self="top left">
                  <q-item clickable @click="() => router.push({ name: 'list-view', params:{ id: id }})">
                    <q-item-section>Modifier</q-item-section>
                  </q-item>
                  <q-item clickable @click="$emit('openModalSuppr',id)">
                    <!-- TODO: Modal suppression   -->
                    <q-item-section><span class="red">Supprimer</span></q-item-section>
                  </q-item>
              </q-menu>
            </q-btn>
      </q-card-section>

      <q-card-section>
        <div class="listCardContent">
            <slot name="default">
                <p v-if="tasks.length == 0" >Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
                <div v-else >
                <TaskComponant
                    v-for="task in tasks"
                    :key="task.id"
                    :task="task"
                ></TaskComponant>
                </div>
            </slot>
        </div>
        <div>
          <hr class="listCardSeparator"/>
          <div v-if="tasks.length > 0" class="seeMore" @click="() => router.push({ name: 'list-view', params:{ id: id }})">
              Voir la liste complète
          </div>
          <div v-else class="seeMore" @click="() => router.push({ name: 'add-edit-task', params:{ id: 0, idList: id }})">
              Ajouter une tâche
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script setup>
import TaskComponant from 'components/TaskComponant.vue'
import { useRouter } from 'vue-router'

defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Title'
  },
  tasks: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
</script>

<style scoped>
.listCard{
    width: 100%;
    border-radius: 10px;
}

.listCardHeader{
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #F2F2F2;
}

.listCardContent{
    padding: 20px;
}

.listCardSeparator{
    width: calc(100% - 40px);
    padding: 0;
    margin: 0 20px;
    height: 2px;
    background-color: #F2F2F2;
    border: none;
}
.seeMore{
    width: 100%;
    text-align: center;
    padding: 10px 0 15px;
    cursor: pointer;
}
.seeMore:hover{
    background-color: #f5f5f5;
}

h2{
  margin-left: 1em;
}

.red {
  color: #C10707;
}
</style>
