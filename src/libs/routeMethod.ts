import { RouteLocationMatched, RouteRecordNormalized, RouteLocationNormalized } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/settings'

/**
 * @param {*} Routes router.getRoutes()
 * @description 获取首页route信息
 * @returns {RouteLocationNormalized} 首页固定路由信息
 */
export const getHomeRoute = (Routes: RouteRecordNormalized[]) => {
  return Routes.filter(route => {
    return route.meta && route.meta.affix
  })[0] as unknown as RouteLocationNormalized
}

/**
 * @param {*} route
 * @description 转换route对象
 * @returns {RouteLocationNormalized} route对象信息
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
 * @returns {RouteLocationMatched[]} 面包屑数据
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
 * @returns {boolean} 是否是外部链接
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

/**
 * @param {Array} path 链接
 * @description 判断是否是外部链接
 * @returns {string} 获取路由FullPath
 */
export function setRouteFullPath(parentPath: string, path: string) {
  return parentPath + '/' + path
}