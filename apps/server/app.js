import './src/config/database.js'
import Koa from 'koa'
import cors from '@koa/cors'
import respond from 'koa-respond'
import bodyparser from 'koa-bodyparser'
import { API_V1_ROUTER } from './src/router/index.js'

const app = new Koa()

app
  .use(cors('*'))
  .use(bodyparser())
  .use(respond())
  .use(API_V1_ROUTER.routes())
  .use(API_V1_ROUTER.allowedMethods())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`))