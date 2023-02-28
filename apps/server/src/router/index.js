import Router from '@koa/router'
import listRoutes from '../components/list/list-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())

export { API_V1_ROUTER }