<template>
  <main>
    <div class="card">
      <h1>Connexion</h1>
      <div class="card-body">
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <q-input class="email" v-model="email" type="email" hint="Email"/>
        <q-input class="password" v-model="password" :type="isPwd ? 'password' : 'text'" hint="Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <q-btn class="btn q-mx-auto" type="submit" label="Connexion" @click="connexion"></q-btn>
      <span>pas de compte ? inscrivez vous <a @click="() => router.push( 'inscription')">ici</a></span>
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
const isPwd = ref(true)
const error = ref('')

async function connexion () {
  const err = await userStore.authUser(email.value, password.value)
  if (err) {
    error.value = err
  } else {
    router.push('/home')
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
