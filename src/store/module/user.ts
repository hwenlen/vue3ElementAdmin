import { defineStore } from 'pinia'
import { LoginParams, LoginResultModel } from '@/api/user/type'
import { Login, LoginOut } from '@/api/user'
import { webLocalStorage } from '@/libs/storage'
import { ResponseData } from "@/libs/request/types";
import { USER_LOCAL_EXPIRES } from '@/settings'

const customLocalStorage = new webLocalStorage(USER_LOCAL_EXPIRES)
const { userName, roleName, token } = customLocalStorage.getItem('userInfo') || {}
export const useUserStore = defineStore('user', {
  state: () => ({
    userName: userName || '',
    roleName: roleName || '',
    token: token || ''
  }),
  persist: {
    storage: customLocalStorage,
    key: 'userInfo',
    paths: ['userName', 'roleName', 'token']
  },
  actions: {
    setState(res: ResponseData) {
      this.userName = res.data?.userName
      this.roleName = res.data?.roleName
      this.token = res.data?.token
    },
    resetState() {
      this.userName = ''
      this.roleName = ''
      this.token = ''
    },
    handleLogin(data: LoginParams): Promise<LoginResultModel> {
      return new Promise((resolve, reject) => {
        Login(data).then(res => {
          if (res.code == 200) {
            this.setState(res)
            resolve(res.data)
          } else {
            reject(res.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLoginOut() {
      return new Promise((resolve, reject) => {
        LoginOut().then(res => {
          if (res.code == 200) {
            this.resetState()
            resolve(res.message)
          } else {
            reject(res.message)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
})