import Router from '@koa/router'
import * as ListControllers from './list-controllers.js'

const lists = new Router()

lists.get('/lists', ListControllers.getLists)
lists.get('/:id', ListControllers.getOneList)
lists.post('/newlist', ListControllers.createList)
lists.put('/:id', ListControllers.updateList)
lists.del('/:id', ListControllers.deleteList)
lists.get('/tasks/:id', ListControllers.getTasksByListId)
lists.get('/tasks/done/:id', ListControllers.getCompletedTasksByListId)
lists.get('/tasks/undone/:id', ListControllers.getUncompletedTasksByListId)

export default lists