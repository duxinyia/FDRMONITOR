// 导入axios
import axios from "axios"
import { Message } from "element-ui"
import Data from "@/assets/data"

const service = axios.create({
  // 基本路径
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: Data.TIMEOUT
})
// 请求拦截器
service.interceptors.request.use((config) => {
  // 在登录的时候改变baseUrl
  if (config.isLogin) {
    config.baseURL = process.env.VUE_APP_BASE_LOGIN
  } else if (config.isMenu) {
    // 获取菜单的时候更改基础地址
    config.baseURL = process.env.VUE_APP_MENU_API
  } else if (config.isPort) {
    config.baseURL = process.env.VUE_APP_PORT_BASE
  }

  // 拦截操作
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.status == false || res.data.Status == false) {
      Message({
        message: res.data.message || res.data.Message || "出错了~",
        type: "error",
        duration: 1500
      })
      return res.data.OtherValue || ""
    } else {
      return res.data.resultvalue || res.data
    }
  },
  (err) => {
    console.log("error", err)
    Message({
      message: `請求超時${Data.TIMEOUT / 1000}s....`,
      type: "error",
      duration: 1500
    })
    return err
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
  post(url, params = "", config = {}) {
    return service.post(`${url}${params}`, { ...config })
  },

  // 封裝body post請求
  bodypost(url, data, config = {}) {
    return service.post(url, data, { ...config })
  }
}
export default request
