<template>
    <q-card flat bordered class="listCard">
      <q-card-section class="listCardHeader">
            <div class="text-h3">{{ title }}</div>
            <q-btn class="moreBtn" round flat icon="more_horiz">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <!-- TODO: Modal suppression   -->
                    <q-item-section>Supprimer list</q-item-section>
                  </q-item>
                    <!--  TODO: modifier chemin-->
                  <q-item clickable @click="() => router.push({ name: 'list-view', params:{ id: id }})">
                    <q-item-section>Modifier list</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
      </q-card-section>

      <q-card-section>
        <div class="listCardContent">
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
        </div>

        <div v-if="tasks.length >= 0" >
            <hr class="listCardSeparator"/>
            <div class="seeMore">
                Voir la liste complète
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
.q-card__section--vert{
    padding: 0;
}
.listCard{
    width: 85%;
    border-radius: 10px;
}
.listCardHeader{
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #F2F2F2;
    padding: 15px 20px;
}
.moreBtn{
    height: 20px;
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
    padding: 10px 0 15px
}
.seeMore:hover{
    background-color: #f5f5f5;
}
</style>
