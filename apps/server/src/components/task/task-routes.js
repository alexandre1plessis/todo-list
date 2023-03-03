import Router from '@koa/router'
import * as TaskControllers from './task-controllers.js'

const tasks = new Router()

tasks.get('/', TaskControllers.getTasks)
tasks.get('/:id', TaskControllers.getOneTask)
tasks.post('/', TaskControllers.createTask)
tasks.put('/:id', TaskControllers.updateTask)
tasks.del('/:id', TaskControllers.deleteTask)
tasks.put('/', TaskControllers.addTaskToListById) // need to put listId and taskId in body

export default tasks