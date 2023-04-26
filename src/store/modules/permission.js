// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 导入发送网络请求的函数
import { getMenus } from "@/api/other/menu.js"
// 处理数组的方法 将路由处理成符合要求的侧边菜单
import { mapMenus } from "@/utils/mapMenus.js"
// 将路由对  判断 nowShowArr 是否显示
import { mapShowArr } from "@/utils/mapShowArr.js"
const state = {
  // 侧边菜单使用的值
  menus: [],
  // 用于overview的侧边渲染 title
  routerTitles: [],
  // 改变对应的索引 切换不同的菜单
  showIndex: 0,
  //
  showArrConfig: {}
}
const mutations = {
  SET_SHOWARRCONFIG: (state, showArrConfig) => {
    state.showArrConfig = showArrConfig
  },
  SET_MEUNS: (state, menus) => {
    state.menus = menus
  },
  SET_ROUTETITLE: (state, payload) => {
    state.routerTitles = payload
  },
  SET_INDEX: (state, index) => {
    state.showIndex = index
    cache.setCache("showIndex", index)
  }
}
const actions = {
  // 更具用户名和工号请求对应的菜单数据
  async getUserRoutes({ commit }, { userJob, nickName }) {
    let { data } = await getMenus(userJob, nickName)
    console.log("获取到的菜单路由为:", data)
    // 将路由映射成侧边菜单和取出菜单
    let { titleArr, menus } = mapMenus(data)
    commit("SET_MEUNS", menus)
    commit("SET_ROUTETITLE", titleArr)
    // 3. 将 ShowArrConfig 根据 路由 改变isShow属性
    let { showArrConfig, asyncRoutes } = mapShowArr(data)
    commit("SET_SHOWARRCONFIG", showArrConfig)
    return asyncRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
