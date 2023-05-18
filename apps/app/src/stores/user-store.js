import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { Preferences } from '@capacitor/preferences'

export const useUserStore = defineStore('user', {
  state: () => ({ }),

  actions: {
    async setUser (name, email, password) {
      const errors = []
      if (name === '') errors.push('Le nom d\'utilisateur ne doit pas être vide')
      if (password === '') errors.push('Le mot de passe ne doit pas être vide')
      if (errors.length !== 0) return errors
      const data = { name: name, email: email, password: password }
      const user = await api.post('/users/', data)
        .then(() => {
          return false
        })
        .catch(error => { return error.response.data.message })
      if (user) {
        errors.push('L\'adresse email existe déjà veuillez vous connecter')
        return errors
      }
      return false
    },

    async authUser (email, password) {
      const data = { email: email, password: password }
      const auth = await api.post('/users/authenticate', data)
        .then(rep => { return rep.data })
        .catch(error => { return error.response.data.message })
      if (typeof auth === 'object') {
        localStorage.setItem('user_todo', JSON.stringify(auth.user))
        localStorage.setItem('token_todo', JSON.stringify(auth.token))
        await this.setObject('user_todo', auth.user)
        await this.setObject('token_todo', auth.token)
        return false
      }
      return auth
    },

    async updateUser (user) {
      const data = { user: user }
      const u = await api.put('/users/', data)
        .then(() => {
          return false
        })
        .catch(error => { return error.response.data.message })
      if (!u) Notify.create('Nom Modifier')
      else Notify.create(`Error during change user: ${u}`)
    },

    async setObject (key, value) {
      await Preferences.set({
        key: key,
        value: JSON.stringify(value)
      })
    },

    async getObject (key) {
      const ret = await Preferences.get({ key: key })
      return JSON.parse(ret.value)
    },

    async getUser () {
      return this.getObject('user_todo')
    },

    async setUserLocal (user) {
      localStorage.setItem('user_todo', JSON.stringify(user))
      await this.setObject('user_todo', user)
    },

    firstLettre (string) {
      return string.charAt(0).toUpperCase()
    }
  }
})
