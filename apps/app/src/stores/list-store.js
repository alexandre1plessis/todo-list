import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export const useListStore = defineStore('list', {
  state: () => ({
    lists: []
  }),

  getters: {

  },

  actions: {
    async getLists () {
      const lists = await api.get('/lists')
        .then()
        .catch(error => Notify.create(`Error during loading lists: ${error.message}`))
      this.lists = lists.data
      for (const list of this.lists) {
        list.tasks = await api.get(`/lists/tasks/${list._id}`)
          .then(reponse => {
            return reponse.data
          })
          .catch(error => Notify.create(`Error during loading tasks: ${error.message}`))
      }
    },

    async addList (title) {
      const list = { title: title }
      await api.post('/lists/', list)
        .then(() => (Notify.create('La liste a été crée ')))
        .catch(error => Notify.create(`Error during create a list: ${error.message}`))
      await this.getLists()
    },

    async updateTask (task) {
      const newTask = { title: task.title, description: task.description, state: task.state, list: task.list }
      await api.put(`/tasks/${task._id}`, newTask)
        .then(Notify.create('La tache a été mit à jour '))
        .catch(error => Notify.create(`Error during update a task: ${error.message}`))
    }
  }
})
