<template>
  <header class="header-account">
    <div>
      <q-btn icon="chevron_left" class="button-retour" @click="goBack()"/>
      <h1>Votre compte</h1>
    </div>
  </header>
  <main class="main-account">
    <div>
      <span class="title2">Nom d'utilisateur : </span>
      <span class="value2">{{ user.name }}</span>
      <img src="../assets/edit.png" class="edit-button" @click="modNom = true"/>
    </div>

    <div v-if="modNom">
      <q-input outlined v-model="user.name" required/>
      <q-btn @click="annulerNom">Annuler</q-btn>
      <q-btn @click="saveNom">Enregistrer</q-btn>
    </div>

    <div class="edit-password">
      <h2>Modifier votre mot de passe</h2>
      <span>Ancien mot de passe</span>
      <q-input class="input" v-model="password" type="password"/>
      <span>Nouveau mot de passe</span>
      <q-input class="input" v-model="newPassword" type="password"/>
      <q-btn @click="saveMDP">Modifier votre mdp</q-btn>
    </div>
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
    error.value = 'Veuillez rentrer un nom d\'utilisateur'
    return
  }
  userStore.updateUser(user.value)
  saveName.value = user.value.name
  modNom.value = false
  userStore.setUserLocal(user.value)
}

function saveMDP () {
  if (password.value.trim() === '' || newPassword.value.trim() === '') {
    error.value = 'Veuillez rentrer un mot de passe'
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

.header-account h1 {
  margin: 0 0 0 0.5em;
}

.main-account {
  padding: 20px 40px;
}
.main-account h2 {
  text-align: left;
  margin-left: unset;
}
.title2{
  font-size: 1.6em;
}
.value2 {
  font-size: 1.3em;
  font-weight: bold;
}
.edit-button {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.edit-password {
  margin-top: 30px;
}
.input {
  margin-bottom: 15px;
}
</style>
