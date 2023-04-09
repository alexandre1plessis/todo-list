import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export const useListStore = defineStore('list', {
  state: () => ({
    lists: [],
    list: { id: '', name: '' },
    tasks: [],
    tasksI: [],
    tasksC: [],
    task: { title: '', description: '', state: false, list: '' }
  }),

  getters: {

  },

  actions: {
    async getLists () {
      this.tasks = []
      this.tasksI = []
      this.tasksC = []
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

    async getList (id) {
      const list = await api.get('/lists/' + id)
        .then(rep => {
          return { id: rep.data._id, name: rep.data.title }
        })
        .catch(error => Notify.create(`Error during loading list: ${error.message}`))
      this.list = list
    },

    async addList (title) {
      if (typeof title === 'undefined') {
        Notify.create('Le titre ne doit pas être vide')
        return false
      }
      const list = { title: title }
      const retour = await api.post('/lists/', list)
        .then(() => {
          Notify.create('La liste a été crée ')
          return true
        })
        .catch(error => {
          console.log(error)
          Notify.create(`Error during create a list: ${error.response.data.message}`)
          return false
        })
      await this.getLists()
      return retour
    },

    async deleteList (id) {
      await api.delete('/lists/' + id)
        .then(() => (Notify.create('La liste a été supprimer')))
        .catch(error => (Notify.create(`Error during create a list: ${error.response.data.message}`)))
      await this.getLists()
    },

    async updateTask (task) {
      const newTask = { title: task.title, description: task.description, state: task.state, list: task.list }
      await api.put(`/tasks/${task._id}`, newTask)
        .then()
        .catch(error => Notify.create(`Error during update a task: ${error.message}`))
    },

    async createTask (task) {
      const newTask = { title: task.title, description: task.description, state: task.state, list: task.list }
      console.log(newTask)
      await api.post('/tasks/', newTask)
        .then()
        // .catch(error => error)
    },

    async getTask (id) {
      this.task = await api.get(`/tasks/${id}`)
        .then(reponse => {
          return reponse.data
        })
        .catch(error => Notify.create(`Error get a task: ${error.message}`))
    },

    async getTasks (idList) {
      if (this.lists.length === 0) {
        await this.getLists()
      }
      const currList = this.lists.find(l => l._id === idList)
      if (currList) {
        this.tasks = currList.tasks
      } else {
        this.tasks = []
      }
    },
    async getTasksIncomplet (idList) {
      if (this.tasks.length === 0) {
        await this.getTasks(idList)
      }
      this.tasksI = this.tasks.filter(t => t.state === false)
    },

    async getTasksComplete (idList) {
      if (this.tasks.length === 0) {
        await this.getTasks(idList)
      }
      this.tasksC = this.tasks.filter(t => t.state === true)
    }
  }
})
