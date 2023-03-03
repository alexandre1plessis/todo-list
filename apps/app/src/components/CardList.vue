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

<template>
    <q-card flat bordered class="listCard">
      <q-card-section class="listCardHeader">
            <div class="text-h3">{{ title }}</div>
            <q-btn class="moreBtn" round flat icon="more_horiz">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Remove Card</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Edit Card</q-item-section>
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
