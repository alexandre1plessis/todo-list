<template>
    <div v-show="displayModal" class="modalAddList">
      <h2>Déplacer la tâche dans une liste</h2>
  
      <fieldset>
        <legend>Sélectionner la liste</legend>
        <input v-model="titre" :placeholder="'Ex: Courses'">
      </fieldset>
  
      <div class="modalButtons">
        <q-btn label="Annuler" @click="() => {displayModal = false}"></q-btn>
        <q-btn label="Déplacer" @click="moveTask()"></q-btn>
      </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>