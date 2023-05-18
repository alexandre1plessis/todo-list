import Router from '@koa/router'
import * as UserControllers from './user-controllers.js'
import authMiddleware from "../../middleware/auth.js";

const users = new Router()

users.post('/', UserControllers.createUser)
users.post('/authenticate', UserControllers.authenticateUser)
users.put('/', authMiddleware, UserControllers.updateUser)

export default users
