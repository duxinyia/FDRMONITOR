// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 导入cookie
import cookie from "@/utils/cookie.js"
const state = {
  user: {
    username: "",
    password: ""
  }
}
const mutations = {
  SET_USER(state, payload) {
    cache.deleteCache("user")
    cache.setCache("user", payload)
    const { name = "", paw = "" } = payload
    cookie.setCookie(name, paw, 7)
    state.user.username = name
    state.user.password = paw
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
