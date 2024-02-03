import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/module/userStore'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/settings'
import { Router } from 'vue-router'
import { generateRouter } from '@/libs/routeMethod'
import Layout from '@/layout/index.vue'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
})
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    window.document.title = to.meta.title as string
    NProgress.start()
    const useStore = useUserStore()
    const token = useStore.token
    // 添加动态路由
    if (!useStore.hasAuth && token) {
      await useStore.setUserRoutes()
      const newRoutes = generateRouter(useStore.userRoutes, Layout)
      newRoutes.forEach(item => {
        router.addRoute(item)
      })
      return next(to.fullPath)
    }

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
}