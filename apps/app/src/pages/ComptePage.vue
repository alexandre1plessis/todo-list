<template>
  <header class="flex justify-between p-4">
    <div class="row items-center p-4">
      <q-btn icon="chevron_left" class="button-retour" @click="goBack()"/>
      <h2> Votre compte </h2>
    </div>
  </header>
  <main>
    <h2>Nom</h2>
    <div v-if="!modNom">
      <span> {{ user.name }}</span>
      <q-btn @click="modNom = true">Modifier votre nom</q-btn>
    </div>
    <div v-if="modNom">
      <q-input outlined v-model="user.name" required/>
      <q-btn @click="saveNom">Enregistrer</q-btn>
      <q-btn @click="annulerNom">Annuler</q-btn>
    </div>
    <h2>Modifier Mot de passe</h2>
    <span>nouveau mdp</span>
    <q-input class="" v-model="newPassword" type="password" hint="Password"/>
    <span>ancien mot de passe</span>
    <q-input class="" v-model="password" type="password" hint="Password"/>
    <q-btn @click="saveMDP">Modifier votre mdp</q-btn>

  </main>
</template>

<script setup>
import { useUserStore } from 'stores/user-store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = ref(userStore.user)
const saveName = ref(userStore.user.name)
const router = useRouter()
const modNom = ref(false)
const error = ref('')
const password = ref()
const newPassword = ref()

function goBack () {
  router.go(-1)
}

function saveNom () {
  if (user.value.name.trim() === '') {
    error.value = 'Le nom utilisateur ne doit pas être vide'
    return
  }
  userStore.updateUser(user.value)
  saveName.value = user.value.name
  modNom.value = false
  userStore.setUserLocal(user.value)
}

function saveMDP () {
  if (password.value.trim() === '' || newPassword.value.trim() === '') {
    error.value = 'Le mot de passe ne doit pas être vide'
    return
  }
  userStore.updateUserMdp(password.value, newPassword.value)
}

function annulerNom () {
  modNom.value = false
  user.value.name = saveName.value
}

</script>

<style scoped>

</style>
