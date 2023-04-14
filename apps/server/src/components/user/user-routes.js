import Router from '@koa/router'
import * as UserControllers from './user-controllers.js'

const users = new Router()

users.post('/', UserControllers.createUser)
users.post('/authenticate', UserControllers.authenticateUser)

export default users