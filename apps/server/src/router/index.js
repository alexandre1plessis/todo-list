import Router from '@koa/router'
import listRoutes from '../components/list/list-routes.js'
import taskRoutes from '../components/task/task-routes.js'
import userRoutes from '../components/user/user-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())
API_V1_ROUTER.use('/tasks', taskRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())

export { API_V1_ROUTER }