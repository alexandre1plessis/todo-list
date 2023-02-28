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
      try {
        const list = { title: title }
        await api.post('/', list)
        await this.getLists()
      } catch (error) {
        Notify.create('Error during create a list')
      }
    },

    increment () {
      this.counter++
    }
  }
})
