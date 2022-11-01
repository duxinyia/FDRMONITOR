// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
const state = {
  fullLoading: false,
  path: "",
  title: "",
  bgUrl: {}
}

const mutations = {
  SET_FULLLOADING: (state, payload = false) => {
    state.fullLoading = payload
  },
  SET_PATH: (state, path = "/overview/cma/device") => {
    state.path = path
    cache.setCache("path", path)
  },
  SET_TITLE: (state, title = "页面标题") => {
    state.title = title
  },
  SET_BGURL(state, bgUrl = {}) {
    state.bgUrl = bgUrl
    cache.setCache("bgUrl", bgUrl)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
