// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
const state = {
  fullLoading: false, // 是否全屏
  path: "", // 用于从mian页面到overview的路径
  title: "", // 每个页面的标题
  theme: "" // 系统的背景 深色 还是 浅色
}

const mutations = {
  // 用于页面的loading加载,一般很少用了
  SET_FULLLOADING: (state, isFullLoading = false) => {
    state.fullLoading = isFullLoading
  },
  // 设置从overview到mian 的路径 用于从mian 到overview 的 路径
  SET_PATH: (state, path = "/overview/cma/manage/device") => {
    state.path = path
    cache.setCache("path", path)
  },
  // 每个页面的标题
  SET_TITLE: (state, title = "页面标题") => {
    state.title = title
  },
  SET_THEME(state, theme = "dark") {
    state.theme = theme
    cache.setCache("theme", theme)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
