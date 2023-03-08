// 导入设置localstorage的函数
import cache from "@/utils/cache.js"
// 导入发送网络请求的函数
import { getMenus } from "@/api/menu.js"

// 所有拆开发路由
let allRouter = []

// 需要展示的 titles
let routeTitles = []

const state = {
  // menus: [], // 侧边对应的路由
  // showTitle: [],
  showArr: { yield: [], device: [], output: [] },
  // --> 需要更改为 cma dp
  newShowArr: {
    cma: { yield: [], device: [], output: [] },
    dp: { yield: [], device: [], output: [] }
  },
  routerArr: [],
  // 用于overview的侧边渲染 title
  routerTitles: [],
  // 改变对应的索引 切换不同的菜单
  showIndex: 0
}
const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
    cache.setCache("menus", menus)
  },
  SET_SHOWARR: (state, showArr) => {
    state.showArr = showArr
    cache.setCache("showArr", showArr)
  },
  // SER_SHOWTITLE: (state, payload) => {
  //   state.showTitle = payload
  // },
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
  GenerateRoutes({ commit }, payload) {
    let { userJob, nickName } = payload
    return new Promise((resolve) => {
      getMenus(userJob, nickName).then((res) => {
        console.log("获取到的菜单路由为:", res.data)
        // 用于渲染侧边菜单的路由
        let routerArr = handleRouter(res.data)
        //
        newHandleRouter(res.data)
        // 将路由分开后 全部存到 allRouter 中了
        commit("SET_ROUTERARR", allRouter)
        // 需要渲染的各种系统的名称
        commit("SET_ROUTETITLE", routeTitles)
        // 侧边菜单
        commit("SET_MENUS", routerArr)
        resolve(res.data)
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
 * 用于渲染侧边路由
 * @param {*} routers
 * @param {*} isTwo 标识是否为第一次的路由
 * @returns
 */
function handleRouter(routers, isTwo = true) {
  // 1. 先取出标题 将 路由拆开 [[cma路由],[dp路由].....]
  //  点击cma的时候，侧边菜单
  let routerArr = []
  routers &&
    routers.forEach((item, i) => {
      // 取出各个一级标题
      if (isTwo) {
        console.log("item=======", item)
        routeTitles.push({ name: item.meta.title, path: item.path })
      }
      let tempRouter = []
      let children = ""
      // 标题 图标 inde = path children
      let icon = item.meta.icon
      let title = item.meta.title
      let index = item.path
      if (item.children) {
        children = handleRouter(item.children, false)
      }
      tempRouter = { title, icon, index, subs: children }
      routerArr.push(tempRouter)
    })
  return routerArr
}

// 该方法只会循环一次数组，可以取到 dp 和 cma 对应的菜单
let newHandleRouter = (routers) => {
  routers &&
    routers.forEach((item) => {
      if (item.children) {
        // 调用该方法会 对 dp 和 cma 的
        let newArr = handleRouter(item.children, false)
        allRouter.push(newArr)
      }
    })
}
