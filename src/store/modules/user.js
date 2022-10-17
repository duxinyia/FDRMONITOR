// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
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
    const { username = "", password = "" } = payload
    state.user.username = username
    state.user.password = password
  },
  updateUser(state) {
    let user = cache.getCache("user")
    if (user) {
      state.user.username = user.username
      state.user.password = user.password
    }
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
