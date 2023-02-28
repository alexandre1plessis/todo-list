import Router from '@koa/router'
import * as TaskControllers from './task-controllers.js'

const tasks = new Router()

tasks.get('/', ListControllers.getLists)
tasks.get('/:id', ListControllers.getOneList)
tasks.post('/', ListControllers.createList)
tasks.put('/:id', ListControllers.updateList)
tasks.del('/:id', ListControllers.deleteList)

export default tasks