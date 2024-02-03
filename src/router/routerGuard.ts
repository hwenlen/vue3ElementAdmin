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
    // 没有登录，且当前不在登录页
    if (!token && to.name != LOGIN_ROUTE_NAME) {
      return next({
        name: LOGIN_ROUTE_NAME,
        replace: true
      })
    }
    // 登录了且当前在登录页，跳转首页
    if (token && to.name == LOGIN_ROUTE_NAME) {
      return next({
        name: HOME_ROUTE_NAME,
        replace: true
      })
    }
    // 动态路由权限
    if (!useStore.hasAuth && token) {
      await useStore.setUserRoutes()
      const newRoutes = generateRouter(useStore.userRoutes, Layout)
      newRoutes.forEach(item => {
        router.addRoute(item)
      })
      return next({ path: to.fullPath })
    }
    next()
  })

  router.afterEach((_to) => {
    NProgress.done()
  })
}