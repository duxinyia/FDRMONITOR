export { default as menus } from "./menu"
// import router from '../../router/index'

// console.log('router', router)
// 一些不变的量  会被挂载到this.$globalData上
export default {
  TIMEOUT: 10000,
  CYCLE_TIME: 10 * 60 * 1000,
  logoUrl: require("@/assets/images/logo.png"),
  lightLogo: require("@/assets/images/_logo.png"),
  bgs: [require("@/assets/images/background3.png"), require("@/assets/images/background17.png")],
  RESET_PWD_URL: "http://10.151.128.172:8089/Login/Repassword",
  TEST_ADDRESS: "http://10.147.214.111:8085",
  PRODUCTION_ADDRESS: "http://10.147.214.130:8093"
}

// 需要展示的数据
export let baseShowArr = {
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
    }
  ]
}

// 通过函数来解决主题变化的时候显示不同的图片 目前有四个 1. 产出(output) 2. 良率(yield)  3. 设备(device)  4. 进程监控 (process)
export let changeCmaConfig = () => {
  return new Map([
    [
      "output",
      [
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
      ]
    ],
    [
      "yield",
      [
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
      ]
    ],
    [
      "device",
      [
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
      ]
    ],
    [
      "process",
      [
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
        }
      ]
    ]
  ])
}
