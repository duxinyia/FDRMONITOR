// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 导入发送网络请求的函数
import { getMenus } from "@/api/other/menu.js"

// 所有拆开发路由
let allRouter = []
// 需要展示的 titles
let routeTitles = []
const state = {
  routerArr: [],
  // 用于overview的侧边渲染 title
  routerTitles: [],
  // 改变对应的索引 切换不同的菜单
  showIndex: 0,
  // 3/9 新加的值
  textShowArr: {}
}
const mutations = {
  SET_TEXTSHOWARR: (state, textShowArr) => {
    state.textShowArr = textShowArr
    cache.setCache("textShowArr", textShowArr)
  },
  SET_ROUTERARR: (state, payload) => {
    state.routerArr = payload
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
  GenerateRoutes({ commit }, userInfo) {
    allRouter = []
    routeTitles = []
    let { userJob, nickName } = userInfo
    return new Promise((resolve, reject) => {
      getMenus(userJob, nickName).then((res) => {
        console.log("获取到的菜单路由为:", res.data)
        let { data = [] } = res
        // 用于渲染侧边菜单的路由
        newHandleRouter(data)
        // 将路由分开后 全部存到 allRouter 中了
        commit("SET_ROUTERARR", allRouter)
        // 需要渲染的各种系统的名称
        commit("SET_ROUTETITLE", routeTitles)
        data.length > 0 ? resolve(data) : reject(0)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

/**
 * 循环dp cma 的子菜单, 将后端返回的名称修改一下 比如 前端需要的是subs ，后端返回的是children
 * @param {*} routers
 * @param {*} isTwo 标识是否为第一次的路由
 * @returns
 */
function handleRouter(routers) {
  let routerArr = []
  routers &&
    routers.forEach((item) => {
      let children = ""
      if (item.children) {
        children = handleRouter(item.children)
      }
      routerArr.push({
        title: item.meta.title,
        icon: item.meta.icon,
        index: item.path,
        subs: children
      })
    })
  return routerArr
}

/**
 *该方法只会循环一次数组，可以取到 dp 和 cma 对应的菜单
 * @param {*} routers 路由数组
 */
let newHandleRouter = (routers) => {
  routers &&
    routers.forEach((item) => {
      // 取出一级标题 和 路径
      routeTitles.push({ name: item.meta.title, path: item.path })
      if (item.children) {
        // 调用该方法会 对 dp 和 cma 的
        let newArr = handleRouter(item.children)
        allRouter.push(newArr)
      }
    })
}
