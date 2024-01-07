import { defineStore } from 'pinia'
import conostantRoutes from '@/router/routes'
import { RouteLocationNormalized } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/settings'

export const useRouteStore = defineStore('routeData', {
  state: () => ({
    tagNavList: Array<RouteLocationNormalized>(),
    aliveCachesList: Array<string>(),
  }),
  getters: {
    menuList: () => {
      return conostantRoutes.filter(item => {
        return item.meta && !item.meta.hideInMenu
      })
    }
  },
  actions: {
    addNavTag(route: RouteLocationNormalized, homeRoute: RouteLocationNormalized) {
      if (this.tagNavList.some((v) => v.name === route.name)) return

      if (!this.tagNavList[0]?.meta?.affix) {
        this.tagNavList = [homeRoute]
      }
      // hadeInTag: 是否显示在nav上
      if (route.meta && !route.meta.hadeInTag && !route.meta.affix) {
        this.tagNavList.push(route)
      }
    },
    delNavTag(type: string, name: string) {
      if (type == 'single') {
        this.tagNavList = this.tagNavList.filter((item: RouteLocationNormalized) => item.name !== name)
      } else if (type == 'all') {
        this.tagNavList = this.tagNavList.filter(item => item.meta?.affix)
      } else {
        this.tagNavList = this.tagNavList.filter(item => item.meta?.affix || item.name === name)
      }
    },
    // 删除tag后跳转
    getToRouteName(name: string) {
      let nm = ''
      // nav是否只有2个标签
      if (this.tagNavList.length === 2) {
        nm = HOME_ROUTE_NAME
      } else {
        // 删除的是否是最后一个
        if (this.tagNavList[this.tagNavList.length - 1].name == name) nm = this.tagNavList[this.tagNavList.length - 2].name as string
        // 不是最后一个就获取当前标签的下一个的name
        else nm = this.tagNavList[this.tagNavList.findIndex((item) => item.name === name) + 1].name as string
      }
      return nm
    },
    // keepAlive添加列表
    addAliveCaches(route: RouteLocationNormalized) {
      const viewName = route.name as string
      if (this.aliveCachesList.includes(viewName)) return
      if (route.meta?.keepAlive) {
        this.aliveCachesList.push(viewName)
      }
    },
    addRouteViewData(route: RouteLocationNormalized, homeRoute: RouteLocationNormalized) {
      this.addNavTag(route, homeRoute)
      this.addAliveCaches(route)
    },
  }
})