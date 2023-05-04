<template>
  <main>
    <div class="card">
      <h1>Inscription</h1>
      <div class="card-body">
        <q-input class="input" v-model="name" type="text" hint="Nom d'utilisateur"/>
        <q-input class="input" v-model="email" type="email" hint="Email"/>
        <q-input class="input" v-model="password" :type="isPwd ? 'password' : 'text'" hint="Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <q-btn @click="inscription" class="btn q-mx-auto" type="submit" label="Inscription"></q-btn>
      <span>déjà un compte ? connectez-vous <a @click="() => router.push( '/')">ici</a></span>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const name = ref('')
const isPwd = ref(true)
const error = ref([])

async function inscription () {
  const retour = userStore.setUser(name.value, email.value, password.value)
  if (retour) {
    error.value.push(retour)
  }
}

</script>
<style lang="scss">
 main {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
 }
 .card {
  background-color: #f2f2f2;
  padding: 16px;
  border-radius: 8px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin: auto;
  width: 90%;
   text-align: center;
}

.card > h1 {
  font-size: 20px;
  font-weight: bold;
  margin: auto;
}

.card-body {
  .input {
    width: 90%;
  }
}

.btn {
 width: 90%;
 color: #FFFFFF;
 background: #613973;
 display: block;
  margin-top: 3em;
  margin-bottom: 1em;
}

a {
  color: #613973;
  cursor: pointer;
  border-bottom: 2px solid #613973;
}

</style>
