import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes.js"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import cache from "@/utils/cache.js"
import store from "../store"

// 现在需要将cma 和 dp 分开
let nowShowArr = {
  cma: {
    manage: {
      output: [
        {
          id: 9,
          imgUrl: require("@/assets/images/output.png"),
          title: "年度產出總覽",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "output"
        },
        {
          id: 11,
          imgUrl: require("@/assets/images/makewar.png"),
          title: "By天產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "makewar"
        },
        {
          id: 10,
          imgUrl: require("@/assets/images/output2.png"),
          title: "By站位產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "output2"
        },
        {
          id: 10,
          imgUrl: require("@/assets/images/aactga.png"),
          title: "AA/GA/CT",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "aactga"
        }
      ],
      yield: [
        {
          id: 13,
          imgUrl: require("@/assets/images/sfc.png"),
          title: "SFC良率By月",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "sfc"
        },
        {
          id: 14,
          imgUrl: require("@/assets/images/tsfc.png"),
          title: "SFC良率Daily",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "tsfc"
        },
        {
          id: 15,
          imgUrl: require("@/assets/images/defect.png"),
          title: "Top 25 Defect",
          target: "yield",
          belong: "管理层/良率",
          isShow: false,
          to: "defect"
        }
      ],
      device: [
        {
          id: 1,
          imgUrl: require("@/assets/images/aa.png"),
          title: "AA設備總覽",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "aa"
        },
        {
          id: 2,
          imgUrl: require("@/assets/images/fol.png"),
          title: "FOL設備總覽",
          target: "device",
          belong: "管理层/设备",
          isShow: false,
          to: "fol"
        }
      ],
      process: [
        {
          id: 4,
          isExternalLink: true,
          imgUrl: require("@/assets/images/spotcheck.jpg"),
          title: "IAA Step看板",
          target: "device",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/standard/design/#/share/ZC1OY0JP"
        },
        {
          id: 108,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device4.jpg"),
          title: "實時統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=KG3RHWT8"
        },
        {
          id: 109,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device5.png"),
          title: "歷史日統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=PVAX4VH2"
        },
        {
          id: 110,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device6.png"),
          title: "歷史周統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=AMM0V0AE"
        },
        {
          id: 111,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device7.png"),
          title: "歷史月統計",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "http://10.142.117.50:32001/share.html#/?token=YBWWHR2M"
        },
        {
          id: 112,
          imgUrl: require("@/assets/images/spotcheck.jpg"),
          title: "GA良率看板",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "ga"
        },
        {
          id: 113,
          imgUrl: require("@/assets/images/spotcheck.jpg"),
          title: "VA良率看板",
          target: "process",
          belong: "管理层/製程監控",
          isShow: false,
          to: "va"
        }
      ]
    },
    juec: {}
  },
  dp: {
    manage: {
      output: [
        {
          id: 9,
          imgUrl: require("@/assets/images/output.png"),
          title: "年度產出總覽",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput"
        },
        {
          id: 11,
          imgUrl: require("@/assets/images/makewar.png"),
          title: "By天產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpmakewar"
        },
        {
          id: 10,
          imgUrl: require("@/assets/images/output2.png"),
          title: "By站位產出看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutput2"
        },
        {
          id: 12,
          imgUrl: require("@/assets/images/outwork.png"),
          title: "人員出勤率看板",
          target: "output",
          belong: "管理层/產出",
          isShow: false,
          to: "dpoutwork"
        }
      ]
    },
    juec: {}
  }
}
// 防止连续点击多次路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
let hasRoles = true
// 用于动态添加路由
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 如果去的路由的 login
  if (to.path.includes("login")) {
    if (cache.getCache("user")) {
      next("/overview")
    } else {
      next()
    }
  } else {
    if (hasRoles) {
      let accessRoutes = await store.dispatch("permission/GenerateRoutes", {
        userJob: store.state.user.user.username,
        nickName: store.state.user.user.fullName
      })
      textHandleRouter(accessRoutes)
      hasRoles = false
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

let tempArr = []
// 3/9 新加的方法 我们需要将所有cma dp fc  或者其他的菜单名称取出来
function textHandleRouter(routers) {
  let cmaNames = []
  let dpNames = []
  routers.forEach((item) => {
    // console.log("item", item)
    if (item.name.includes("cma") && item.children) {
      cmaNames = childHandle(item.children)
    }
    tempArr = []
    if (item.name.includes("dp") && item.children) {
      dpNames = childHandle(item.children)
    }
  })
  //console.log("cmaNames", cmaNames) // 所有返回的cma的地址
  console.log("dpNames", dpNames) // 所有返回的dp的地址

  // 循环 cma 的地址
  nowShowArr.cma.manage.output = nowShowArr.cma.manage.output.map((item) => {
    if (cmaNames.includes(item.title)) {
      return { ...item, isShow: true }
    }
    return { ...item }
  })
  nowShowArr.cma.manage.yield = nowShowArr.cma.manage.yield.map((item) => {
    if (cmaNames.includes(item.title)) {
      return { ...item, isShow: true }
    }
    return { ...item }
  })
  nowShowArr.cma.manage.device = nowShowArr.cma.manage.device.map((item) => {
    if (cmaNames.includes(item.title)) {
      return { ...item, isShow: true }
    }
    return { ...item }
  })
  nowShowArr.cma.manage.process = nowShowArr.cma.manage.process.map((item) => {
    if (cmaNames.includes(item.title)) {
      return { ...item, isShow: true }
    }
    return { ...item }
  })
  // 处理dp的地址
  nowShowArr.dp.manage.output = nowShowArr.dp.manage.output.map((item) => {
    if (dpNames.includes(item.title)) {
      return { ...item, isShow: true }
    }
    return { ...item }
  })
  // 全部处理完成后
  store.commit("permission/SET_TEXTSHOWARR", nowShowArr)
}

function childHandle(routers) {
  routers.forEach((item) => {
    tempArr.push(item.meta.title)
    if (item.children) {
      childHandle(item.children)
    }
  })
  return tempArr
}

export default router
