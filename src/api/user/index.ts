import Axios from '@/libs/request'
import { LoginParams, LoginResultModel } from './type'
import { RouteResultModel } from '@/types'

export const Login = (params: LoginParams) => {
  return Axios.post<LoginResultModel>({
    url: '/api/login',
    params
  })
}

export const LoginOut = () => {
  return Axios.post({
    url: '/api/loginout'
  })
}

export const getRoutes = (params: { uid: number }) => {
  return Axios.post<RouteResultModel[]>({
    url: '/api/routes',
    params
  })
}