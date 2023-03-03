
<template>
  <div class="addListComponent">
    <div class="content">
        <h4>Créer une nouvelle liste</h4>

        <fieldset>
            <legend>List name</legend>
            <input v-model="titre" :placeholder="'Ex: Courses'">
        </fieldset>

        <div class="modalButtons">
            <q-btn label="Annuler" @click="() => {displayModal = false}"></q-btn>
            <q-btn label="Créer" @click="save()" class="createBtn"></q-btn>
        </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

.addListComponent{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
}

.content {
    position: relative;
    width: 350px;
    height: fit-content;
    min-height: 250px;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    border-radius: 14px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.close {
    position: absolute;
    top: 15px;
    right: 20px;
}

.modalButtons {
    display: flex;
    justify-content: center;
    gap: 20px;
}
.modalButtons button:before{
    content: none;
}
.createBtn {
    padding: 10px 30px;
    background: #613973;
    color: white
}
</style>
