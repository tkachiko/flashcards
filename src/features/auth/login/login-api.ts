import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const loginAPI = {
  login(data: LoginType) {
    return instance.post<ResponseType>('auth/login', data)
  },
}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}