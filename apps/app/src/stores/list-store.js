import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export const useListStore = defineStore('list', {
  state: () => ({
    lists: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    async getLists () {
      try {
        const lists = await api.get('/lists')
        this.lists = lists.data
      } catch (error) {
        Notify.create('Error during loading lists')
      }
    },

    async addList (title) {
      const list = { title: title }
      await api.post('/lists/', list)
        .then(() => (Notify.create('La liste a été crée ')))
        .catch(error => Notify.create(`Error during create a list: ${error.message}`))
      await this.getLists()
    },

    increment () {
      this.counter++
    }
  }
})
