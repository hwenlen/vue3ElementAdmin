import Axios from '@/libs/request'
import { LoginParams, LoginResultModel } from './type'

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