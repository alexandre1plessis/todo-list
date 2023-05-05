
<template>
  <div class="addListComponent">
    <div class="content">
        <h3>Créer une nouvelle liste</h3>

        <div>
            <q-input outlined v-model="titre" label="List name" />
        </div>

        <div class="modalButtons">
            <q-btn label="Annuler" @click="closeModal()"></q-btn>
            <q-btn label="Créer" @click="save()" class="createBtn"></q-btn>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useListStore } from 'stores/list-store'
import { ref, onMounted } from 'vue'
import { AdMob } from '@capacitor-community/admob'
import { interstitial } from 'boot/addMob'

onMounted(async () => {
  await interstitial()
})
const listStore = useListStore()
const titre = ref()
const emit = defineEmits(['addList'])

function closeModal () {
  emit('addList')
  AdMob.showInterstitial()
}

async function save () {
  const retour = await listStore.addList(titre.value)
  if (retour) closeModal()
}
</script>

<style scoped>

.addListComponent{
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc( 100vh - 55px);
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

.modalButtons {
    margin-top: 0.5em;
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

fieldset {
  border: none;
  padding-bottom: 30px;
}
legend {
  font-size: 16px;
  font-weight: bold;
}
fieldset input {
    width: 100%;
}
</style>
