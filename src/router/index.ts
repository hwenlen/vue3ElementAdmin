import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/module/user'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/settings'
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
})

const router = createRouter({
  history: createWebHistory('./'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
router.beforeEach(async (to, _from, next) => {
  window.document.title = to.meta.title as string
  NProgress.start()
  const token = useUserStore().token
  if (!token && to.name != LOGIN_ROUTE_NAME) {
    next({
      name: LOGIN_ROUTE_NAME,
      replace: true
    })
  } else if (token && to.name == LOGIN_ROUTE_NAME) {
    next({
      name: HOME_ROUTE_NAME,
      replace: true
    })
  } else {
    next()
  }

})
router.afterEach((_to) => {
  NProgress.done()
})

export default router