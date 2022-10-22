// 导入axios
import axios from "axios"
import { Message } from "element-ui"
// 定義一些常量
const TIMEOUT = 10000
const service = axios.create({
  // 基本路径
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: TIMEOUT
})
// 请求拦截器
service.interceptors.request.use((config) => {
  // 在登录的时候改变baseUrl
  if (config.isLogin) {
    config.baseURL = process.env.VUE_APP_BASE_LOGIN
  }
  // 拦截操作
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.status == false || res.data.Status == false) {
      Message({
        message: res.data.message || "出错了~",
        type: "error"
      })
      return ""
    } else {
      return res.data.resultvalue || res.data
    }
  },
  (err) => {
    Message({
      message: "網絡請求錯誤...",
      type: "error"
    })
    console.log("出錯了err", err)
  }
)
// 所有的请求函数
const request = {
  // 封裝get請求
  get(url, params, config = {}) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ""
    } else {
      _params = "?"
      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.get(`${url}${_params}`, { ...config })
  },
  // 封裝post請求
  post(url, params = "") {
    return service.post(`${url}${params}`)
  }
}
export default request
