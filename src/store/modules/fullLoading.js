// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
const state = {
  fullLoading: false,
  path: ""
}

const mutations = {
  SET_FULLLOADING: (state, payload = false) => {
    state.fullLoading = payload
  },
  SET_PATH: (state, path = "/overview/cma/device") => {
    state.path = path
    cache.setCache("path", path)
  }
  // updatePath(state) {
  //   let path = cache.getCache("path")
  //   if (path) {
  //     state.path = path
  //   }
  // }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
