import Router from '@koa/router'
import * as ListControllers from './list-controllers.js'
import authMiddleware from '../../middleware/auth.js';

const lists = new Router()

lists.get('/', authMiddleware, ListControllers.getLists)
lists.get('/:id', authMiddleware, ListControllers.getOneList)
lists.post('/', authMiddleware, ListControllers.createList)
lists.put('/:id', authMiddleware, ListControllers.updateList)
lists.del('/:id', authMiddleware, ListControllers.deleteList)
lists.get('/tasks/:id', authMiddleware, ListControllers.getTasksByListId)
lists.get('/tasks/done/:id', authMiddleware, ListControllers.getCompletedTasksByListId)
lists.get('/tasks/undone/:id', authMiddleware, ListControllers.getUncompletedTasksByListId)

export default lists
