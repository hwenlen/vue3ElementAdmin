import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { createRouterGuard } from './routerGuard'

const router = createRouter({
  history: createWebHistory('./'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

createRouterGuard(router)


export default router