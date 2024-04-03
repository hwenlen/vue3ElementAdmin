import { RouteLocationMatched, RouteRecordNormalized, RouteLocationNormalized, RouteComponent, RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/settings'
import { RouteResultModel } from '@/types'


let modules = import.meta.glob('../views/**/*.vue')
/**
 * @param {*} Routes router.getRoutes()
 * @description 获取首页route信息
 * @return {RouteLocationNormalized} 首页固定路由信息
 */
export const getHomeRoute = (Routes: RouteRecordNormalized[]) => {
  return Routes.filter(route => {
    return route.meta && route.meta.affix
  })[0] as unknown as RouteLocationNormalized
}

/**
 * @param {*} Routes router.getRoutes()
 * @description 筛选menu列表
 * @return {RouteLocationNormalized} menu列表
 */
export const filterMenus = (Routes: RouteResultModel[]) => {
  const Menus = Routes.filter(item => {
    if (item.children && item.children.length > 0) {
      item.children = filterMenus(item.children)
    }

    return item.meta && !item.meta.hideInMenu
  })
  return Menus
}

/**
 * @param {*} route
 * @description 转换route对象适配tagNav
 * @return {RouteLocationNormalized} route对象信息
 */
export const getRawRoute = (route: RouteLocationNormalized) => {
  const { matched, ...options } = route
  return {
    ...options,
    matched: (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path,
      }))
      : undefined) as RouteLocationMatched[]
  }
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @description 获取面包屑数据
 * @return {RouteLocationMatched[]} 面包屑数据
 */
export const getBreadCrumbList = (routeMetched: RouteLocationMatched[], homeRoute: RouteLocationNormalized) => {
  let res = routeMetched.filter((item: RouteLocationMatched) => {
    return item.meta?.title && item.name !== HOME_ROUTE_NAME
  })
  return [homeRoute as unknown as RouteLocationMatched, ...res]
}

/**
 * @param {Array} path 链接
 * @description 判断是否是外部链接
 * @return {boolean} 是否是外部链接
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

/**
 * @param {Array} parentPath 父级链接
 * @param {Array} path children链接
 * @description 拼接出路由FullPath
 * @return {string} 路由FullPath
 */
export function setRouteFullPath(parentPath: string, path: string) {
  return parentPath + '/' + path
}

/**
 * @param {Array} data 后端返回的路由数据
 * @description 将后端返回的路由数据做成符合router的格式
 * @return {string} routes
 */
export function formatRouterTree(data: RouteResultModel[]) {
  let parents = data.filter(item => item.pid === 0)
  let children = data.filter(item => item.pid !== 0)

  dataToTree(parents, children)
  function dataToTree(parents: RouteResultModel[], children: RouteResultModel[]) {
    parents.map(parent => {
      children.map((child, i) => {
        let _child = JSON.parse(JSON.stringify(children))
        if (child.pid === parent.id) {
          _child.splice(i, 1)
          dataToTree([child], _child)
          if (parent.children) {
            parent.children.push(child)
          } else {
            parent.children = [child]
          }
        }
      })
    })
  }

  return parents
}

/**
 * @param {Array} view router组件
 * @description 将R
 * @return {string} 获取组件
 */
export const loadView = (view: string) => { // 路由懒加载
  return modules[`../views/${view}.vue`]
}
/**
 * @param {Array} userRouters 后端返回的经过formatRouterTree处理过后的routes
 * @description 将数据转化为router数据
 * @return {string} routes
 */
export function generateRouter(userRouters: RouteResultModel[], Layout: RouteComponent) {
  const newRoutes = userRouters.map(item => {
    let route = {
      path: item.path,
      name: item.name,
      meta: item.meta,
      children: item.children,
      component: item.component === 'Layout' ? Layout : loadView(item.component)
    } as RouteRecordRaw

    if (item.children && item.children.length > 0) {
      route.redirect = item.redirect ? item.redirect : undefined
      route.children = generateRouter(item.children, Layout)
    }
    return route
  })

  return newRoutes
}