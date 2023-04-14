import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { Notify } from 'quasar'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    error: {}
  }),

  getters: {

  },

  actions: {
    async setUser (name, email, password) {
      const data = { name: name, email: email, password: password }
      const user = await api.post('/users/', data)
        .then(() => {

          return { name: name, email: email }
        })
        .catch(error => { return { error: error.response.data.message } })
      if (typeof user.name === 'undefined') {
        return user
      }
      this.user = user
      return false
    }
  }
})
