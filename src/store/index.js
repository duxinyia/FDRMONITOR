import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  modules,
  getters
})
// 保证数据不失去
export function updateStoreData() {
  let user = cache.getCache("user")
  let path = cache.getCache("path")
  let bgUrl = cache.getCache("bgUrl")
  let theme = cache.getCache("theme")
  let showIndex = cache.getCache("showIndex")
  // let menus = cache.getCache("menus")
  if (user) {
    store.commit("user/SET_USER", user)
  }
  if (path) {
    store.commit("fullLoading/SET_PATH", path)
  }
  if (bgUrl) {
    store.commit("fullLoading/SET_BGURL", bgUrl)
  }
  if (theme) {
    store.commit("fullLoading/SET_THEME", theme)
  }
  if (showIndex) {
    store.commit("permission/SET_INDEX", showIndex)
  }
}

export default store
