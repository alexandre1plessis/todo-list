import Router from '@koa/router'
import * as ListControllers from './list-controllers.js'

const lists = new Router()

lists.get('/', ListControllers.getLists)
lists.get('/:id', ListControllers.getOneList)
lists.post('/', ListControllers.createList)
lists.put('/:id', ListControllers.updateList)
lists.del('/:id', ListControllers.deleteList)
lists.get('/tasks/:id', ListControllers.getTasksByListId)

export default lists