// 一些不变的量  会被挂载到this.$globalData上
export default {
  TIMEOUT: 10000,
  CYCLE_TIME: 5 * 60 * 1000,
  logoUrl: require("@/assets/images/logo.png"),
  lightLogo: require("@/assets/images/_logo.png"),
  bgs: [require("@/assets/images/background3.png"), require("@/assets/images/background17.png")],
  RESET_PWD_URL: "http://10.151.128.172:8089/Login/Repassword"
}

// 侧边栏的配置文件
export let menus = [
  {
    icon: "el-icon-s-tools",
    title: "決策層",
    index: "1",
    subs: [
      {
        icon: "el-icon-s-tools",
        title: "產出",
        index: "2",
        isOutLink: 'www.baibu.com'
      },
      {
        icon: "el-icon-s-tools",
        title: "良率",
        index: "3"
      },
      {
        icon: "el-icon-s-tools",
        title: "人力",
        index: "4"
      }
    ]
  },
  {
    icon: "el-icon-s-tools",
    title: "管理層",
    index: "",
    subs: [
      {
        icon: "el-icon-s-tools",
        title: "產出",
        // index: "/overview/manage/device",
        index: "/overview/manage",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "年度產出總覽",
            index: "/overview/manage",
            toLink: 'output',
            outLink: ''
          },
          {
            icon: "el-icon-s-tools",
            title: "每日產出看板",
            index: "/overview/manage",
            toLink: 'makewar',
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "By時段產出看板",
                index: "9"
              },
              {
                icon: "el-icon-s-tools",
                title: "By機臺產出看板",
                index: "10",
                subs: [
                  {
                    icon: "el-icon-s-tools",
                    title: "AA/GA/CT",
                    index: "11"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "ACF",
                    index: "12"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "TEST",
                    index: "13"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "AVI",
                    index: "14"
                  }
                ]
              },
              {
                icon: "el-icon-s-tools",
                title: "By站位產出看板",
                index: "15",
                toLink: 'output2'
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-s-tools",
        title: "良率",
        index: "16",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "SAP良率",
            index: "17"
          },
          {
            icon: "el-icon-s-tools",
            title: "SFC良率By月",
            index: "18"
          },
          {
            icon: "el-icon-s-tools",
            title: "SFC良率Daily",
            index: "19",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "FOL Yield Report",
                index: "20"
              },
              {
                icon: "el-icon-s-tools",
                title: "EOL Yield Report",
                index: "21"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Top 25 Defect Item",
            index: "22"
          },
          {
            icon: "el-icon-s-tools",
            title: "FOL LCB差异层别",
            index: "23"
          },
          {
            icon: "el-icon-s-tools",
            title: "FOL DPC差异层别",
            index: "24"
          }
        ]
      },
      {
        icon: "el-icon-s-tools",
        title: "設備",
        index: "25",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "FOL設備總覽",
            index: "26",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "待規劃",
                index: "27"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "AA設備總覽",
            index: "28",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "周產出/效率看板",
                index: "29"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 機況排行榜/待規劃",
                index: "30"
              },
              {
                icon: "el-icon-s-tools",
                title: "Alarms times Top15 看板",
                index: "31"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA Lens Reject rate /待規劃",
                index: "32"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "EOL設備總覽",
            index: "33",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "ACF效率看板",
                index: "34"
              },
              {
                icon: "el-icon-s-tools",
                title: "SA效率看板",
                index: "35"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test效率看板",
                index: "36"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test機台每2小時by治具看板",
                index: "37"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test一次不良TOP15 /待規劃",
                index: "38"
              },
              {
                icon: "el-icon-s-tools",
                title: "AVI效率看板",
                index: "39"
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-s-tools",
        title: "製程監控",
        index: "40",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "SFR",
            index: "41",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "SFR不良率看板(By機台)",
                index: "42"
              },
              {
                icon: "el-icon-s-tools",
                title: "SFR不良率看板(By鏡頭模穴)",
                index: "43"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Particle",
            index: "44",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "GA拋料實時監控看板",
                index: "44"
              },
              {
                icon: "el-icon-s-tools",
                title: "AOI 不良率看板",
                index: "45"
              },
              {
                icon: "el-icon-s-tools",
                title: "AOI 8H趨勢看板",
                index: "46"
              },
              {
                icon: "el-icon-s-tools",
                title: "DPC/LCB不良看板",
                index: "47"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "E-fail",
            index: "48",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "FC不良看板",
                index: "49"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Process(FOL)",
            index: "50",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "FC高度報警集中性看板",
                index: "51"
              },
              {
                icon: "el-icon-s-tools",
                title: "FC壓縮量看板",
                index: "52"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Process(AA)",
            index: "53",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "IAA Step看板",
                index: "54"
              },
              {
                icon: "el-icon-s-tools",
                title: "膠型 AI 檢測看板",
                index: "55",
                subs: [
                  {
                    icon: "el-icon-s-tools",
                    title: "實時統計",
                    index: "56"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史日統計",
                    index: "57"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史周統計",
                    index: "58"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史月統計",
                    index: "59"
                  }
                ]
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Process(EOL)",
            index: "60",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "EOL 一次良率看板",
                index: "61"
              },
              {
                icon: "el-icon-s-tools",
                title: "ACF貼膠不良看板 /待規劃",
                index: "62"
              },
              {
                icon: "el-icon-s-tools",
                title: "AVI 一次不良看板",
                index: "63"
              },
              {
                icon: "el-icon-s-tools",
                title: "Laser等級監控看板",
                index: "64"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "關鍵部件",
            index: "65",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "FOL 關鍵零部件看板",
                index: "66"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 膠針监控看板 /待規劃",
                index: "67"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 夾爪监控看板 /待規劃",
                index: "68"
              },
              {
                icon: "el-icon-s-tools",
                title: "ACF Carrier 监控看板/待規劃",
                index: "69"
              }
            ]
          }
        ]
      }
    ]
  }
]

// 通过函数来解决主题变化的时候显示不同的图片 目前有四个 1. 产出(output) 2. 良率(yield)  3. 设备(device)  4. 进程监控 (process)
export let changeCmaConfig = (theme = "dark") => {
  return new Map([
    [
      "output",
      [
        {
          id: 9,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/output.png")
              : require("@/assets/images/_output.png"),
          info: "產出可視化平台",
          target: "make",
          belong: "管理层/產出",
          to: "output"
        },
        {
          id: 11,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/makewar.png")
              : require("@/assets/images/_makewar.png"),
          info: "製造戰情中心",
          target: "make",
          belong: "管理层/產出",
          to: "makewar"
        },
        {
          id: 88,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/fol.png")
              : require("@/assets/images/_fol.png"),
          info: "产出模块",
          target: "output",
          belong: "管理层/產出",
          to: "fol"
        },
        {
          id: 10,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/output2.png")
              : require("@/assets/images/_output2.png"),
          info: "九宮格產出看板",
          target: "make",
          belong: "管理层/產出",
          to: "output2"
        },
      ]
    ],
    [
      "yield",
      [
        // 管理层/良率
        // {
        //   id: 12,
        //   imgUrl: require("@/assets/images/sap.png"),
        //   info: "SAP良率",
        //   target: "yield",
        //   belong: "管理层/良率",
        //   to: "sap"
        // },
        {
          id: 13,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/sfc.png")
              : require("@/assets/images/_sfc.png"),
          info: "SFC良率",
          target: "yield",
          belong: "管理层/良率",
          to: "sfc"
        },
        {
          id: 14,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/tsfc.png")
              : require("@/assets/images/_tsfc.png"),
          info: "SFC总良率预览",
          target: "yield",
          belong: "管理层/良率",
          to: "tsfc"
        },
        {
          id: 15,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/defect.png")
              : require("@/assets/images/_defect.png"),
          info: "Top 25 Defect Item",
          target: "yield",
          belong: "管理层/良率",
          to: "defect"
        }
      ]
    ],
    [
      "device",
      [
        {
          id: 2,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/fol.png")
              : require("@/assets/images/_fol.png"),
          info: "FOL設備總覽",
          target: "device",
          belong: "管理层/设备",
          to: "fol"
        },
        {
          id: 1,
          imgUrl:
            theme == "dark"
              ? require("@/assets/images/aa.png")
              : require("@/assets/images/_aa.png"),
          info: "AA設備總覽",
          target: "device",
          belong: "管理层/设备",
          to: "aa"
        },
        // {
        //   id: 3,
        //   imgUrl: require("@/assets/images/eol.png"),
        //   info: "EOL設備總覽",
        //   target: "device",
        //   belong: "管理层/设备",
        //   to: "eol"
        // },
        {
          id: 4,
          isExternalLink: true,
          imgUrl: require("@/assets/images/spotcheck.jpg"),
          info: "AA PDI AI 檢測界面",
          target: "device",
          belong: "管理层/设备",
          to: "http://10.142.117.50:32001/standard/design/#/share/OS4L2ZWV"
        },
        {
          id: 5,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device4.jpg"),
          info: "實時統計",
          target: "device",
          belong: "管理层/设备",
          to: "http://10.142.117.50:32001/share.html?token=8ZBXMVWR"
        },
        {
          id: 6,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device5.png"),
          info: "歷史日統計",
          target: "device",
          belong: "管理层/设备",
          to: "http://10.142.117.50:32001/share.html?token=V3SKHL6X"
        },
        {
          id: 7,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device6.png"),
          info: "歷史周統計",
          target: "device",
          belong: "管理层/设备",
          to: "http://10.142.117.50:32001/share.html?token=HYMY179K"
        },
        {
          id: 8,
          isExternalLink: true,
          imgUrl: require("@/assets/images/device7.png"),
          info: "歷史月統計",
          target: "device",
          belong: "管理层/设备",
          to: "http://10.142.117.50:32001/share.html?token=TLYKVQQY"
        }
      ]
    ],
    [
      "make",
      [



      ]
    ],

  ])
}
