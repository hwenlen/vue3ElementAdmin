import { defineStore } from 'pinia'
import { LoginParams, LoginResultModel } from '@/api/user/type'
import { Login, LoginOut, getRoutes } from '@/api/user'
import { LocalStorage } from '@/libs/storage'
import { ResponseData } from "@/libs/request/types";
import { USER_LOCAL_EXPIRES } from '@/settings'
import { formatRouterTree } from '@/libs/routeMethod'
import { RouteResultModel } from '@/types'
import { useMenuStore } from '@/store/module/menuStore'

const customLocalStorage = LocalStorage(USER_LOCAL_EXPIRES)
const { userName, roleName, token, userId } = customLocalStorage.getItem('userInfo') || {}
export const useUserStore = defineStore('user', {
  state: () => ({
    userName: userName || '',
    roleName: roleName || '',
    userId: userId || null,
    token: token || '',
    userRoutes: Array<RouteResultModel>(), // 动态路由
    hasAuth: false // 是否获取了权限
  }),
  getters: {
    menuStore: () => {
      return useMenuStore()
    }
  },
  persist: {
    storage: customLocalStorage,
    key: 'userInfo',
    paths: ['userName', 'roleName', 'userId', 'token'],
  },
  actions: {
    setUserInfo(res: ResponseData) {
      this.userName = res.data?.userName;
      this.roleName = res.data?.roleName;
      this.userId = res.data?.userId;
      this.token = res.data?.token;
    },
    resetState() {
      this.userName = '';
      this.roleName = '';
      this.userId = null;
      this.token = '';
      this.hasAuth = false
      this.userRoutes = []
    },
    // 登录
    handleLogin(data: LoginParams): Promise<LoginResultModel> {
      return new Promise((resolve, reject) => {
        Login(data).then(res => {
          if (res.code == 200) {
            this.setUserInfo(res)
            resolve(res.data)
          } else {
            reject(res.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出
    handleLoginOut() {
      return new Promise((resolve, reject) => {
        LoginOut().then(res => {
          if (res.code == 200) {
            this.resetState()
            this.menuStore.tagNavList = []
            resolve(res.message)
          } else {
            reject(res.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取动态路由
    async setUserRoutes() {
      if (this.userId === null) return;
      const res = await getRoutes({ uid: this.userId })
      const payload = formatRouterTree(res.data || [])
      this.userRoutes = payload
      this.menuStore.setMenuData(payload)
      this.hasAuth = true
    }
  }
})