import Router from '@koa/router'
import * as TaskControllers from './task-controllers.js'
import authMiddleware from "../../middleware/auth.js";

const tasks = new Router()

tasks.get('/', authMiddleware, TaskControllers.getTasks)
tasks.get('/:id', authMiddleware, TaskControllers.getOneTask)
tasks.post('/', authMiddleware, TaskControllers.createTask)
tasks.put('/:id', authMiddleware, TaskControllers.updateTask)
tasks.del('/:id', authMiddleware, TaskControllers.deleteTask)
tasks.put('/add/:taskId', authMiddleware, TaskControllers.moveTaskToListById) // need to put listId and taskId in body

export default tasks
