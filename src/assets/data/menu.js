// 2/4
// export default [
//   {
//     icon: "el-icon-s-promotion",
//     title: "决策層",
//     index: "",
//     subs: [
//       {
//         icon: "el-icon-s-promotion",
//         title: "决策層",
//         index: ""
//       }
//     ]
//   },
//   {
//     icon: "el-icon-s-promotion",
//     title: "管理層",
//     index: "/overview/manage",
//     subs: [
//       {
//         icon: "el-icon-s-data",
//         title: "產出",
//         index: "/overview/manage/output"
//       },
//       {
//         icon: "el-icon-s-data",
//         title: "良率",
//         index: "/overview/manage/yield"
//       },
//       {
//         icon: "el-icon-s-data",
//         title: "設備",
//         index: "/overview/manage/device"
//       },
//       {
//         icon: "el-icon-s-data",
//         title: "製程監控",
//         index: "/overview/manage/process",
//         subs: [
//           {
//             icon: "el-icon-s-data",
//             title: "子菜单",
//             index: "/overview/manage/process1"
//           },
//           {
//             icon: "el-icon-s-data",
//             title: "还是子菜单",
//             index: "/overview/manage/process2",
//             subs: [
//               {
//                 icon: "el-icon-s-data",
//                 title: "三级子菜单",
//                 index: "/overview/manage/process22"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     icon: "el-icon-s-promotion",
//     title: "权限设定",
//     index: "8816454658",
//     subs: [
//       {
//         icon: "el-icon-s-promotion",
//         title: "角色设定",
//         index: ""
//       }
//     ]
//   },
//   {
//     icon: "el-icon-s-promotion",
//     title: "关于",
//     index: "8889799879",
//     subs: [
//       {
//         icon: "el-icon-s-promotion",
//         title: "系统信息",
//         index: ""
//       }
//     ]
//   },
// ]

// 侧边栏的配置文件
export default [
  {
    icon: "el-icon-s-promotion",
    title: "決策層",
    index: "/overview/manage/1",
    subs: [
      {
        icon: "el-icon-s-release",
        title: "產出",
        index: "/overview/manage/2",
        isOutLink: "www.baibu.com"
      },
      {
        icon: "el-icon-s-release",
        title: "良率",
        index: "/overview/manage/3"
      },
      {
        icon: "el-icon-s-release",
        title: "人力",
        index: "/overview/manage/4"
      }
    ]
  },
  {
    icon: "el-icon-s-promotion",
    title: "管理層",
    index: "/overview",
    subs: [
      {
        icon: "el-icon-s-data",
        title: "產出",
        index: "/overview/manage/output",
        subs: [
          {
            icon: "el-icon-setting",
            title: "年度產出總覽",
            index: "/overview/manage/output/1",
            toLink: "output"
          },
          {
            icon: "el-icon-setting",
            title: "By天產出看板",
            index: "9",
            toLink: "makewar"
          },
          {
            icon: "el-icon-s-release",
            title: "By時段產出看板",
            index: "/overview/manage/output2"
          },
          {
            icon: "el-icon-s-release",
            title: "By機臺產出看板",
            index: "10",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "AA/GA/CT",
                index: "11",
                outLink: "http://10.151.128.45:8081/Kanban/MachineIOKanban.aspx"
              },
              {
                icon: "el-icon-s-release",
                title: "ACF",
                index: "12",
                outLink: "http://10.151.128.45:8081/Kanban/MachineIOKanban.aspx?Type=ACF"
              },
              {
                icon: "el-icon-s-release",
                title: "TEST",
                index: "13",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.kanban.TestKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "AVI",
                index: "14",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.kanban.AVIFirstYieldKanban"
              }
            ]
          },
          {
            icon: "el-icon-setting",
            title: "By站位產出看板",
            index: "15",
            toLink: "output2"
          }
        ]
      },
      {
        icon: "el-icon-s-data",
        title: "良率",
        index: "/overview/manage/yield",
        subs: [
          {
            icon: "el-icon-s-release",
            title: "SAP良率",
            index: "/overview/manage/yield"
          },
          {
            icon: "el-icon-setting",
            title: "SFC良率By月",
            index: "18",
            toLink: "sfc"
          },
          {
            icon: "el-icon-s-release",
            title: "SFC良率Daily",
            index: "19",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "FOL Yield Report",
                index: "20"
              },
              {
                icon: "el-icon-s-release",
                title: "EOL Yield Report",
                index: "21"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "Top 25 Defect",
            index: "22"
          },
          {
            icon: "el-icon-s-release",
            title: "FOL LCB差异层别",
            index: "23"
          },
          {
            icon: "el-icon-s-release",
            title: "FOL DPC差异层别",
            index: "24"
          }
        ]
      },
      {
        icon: "el-icon-s-data",
        title: "設備",
        index: "/overview/manage/device",
        subs: [
          {
            icon: "el-icon-s-release",
            title: "FOL設備總覽",
            index: "26",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "產能看板",
                index: "27"
              },

              {
                icon: "el-icon-s-release",
                title: "效率看板",
                index: "51"
              },
              {
                icon: "el-icon-s-release",
                title: "異常Top10看板",
                index: "52"
              },
              {
                icon: "el-icon-s-release",
                title: "機台掃碼率看板",
                index: "53"
              },
              {
                icon: "el-icon-s-release",
                title: "關鍵參數監控看板",
                index: "54"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "AA設備總覽",
            index: "28",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "周產出/效率看板",
                index: "29",
                outLink: "http://10.147.214.130:8081/AA/Report"
              },
              {
                icon: "el-icon-s-release",
                title: "AA 機況排行榜",
                index: "30"
              },
              {
                icon: "el-icon-s-release",
                title: "預警Top15看板",
                index: "31",
                outLink: "http://10.147.214.130:8081/AA/TopReport"
              },
              {
                icon: "el-icon-s-release",
                title: "Lens Reject rate",
                index: "32"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "EOL設備總覽",
            index: "33",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "ACF效率看板",
                index: "34",
                outLink: "http://10.147.214.130:8081/Test/ReportACF"
              },
              {
                icon: "el-icon-s-release",
                title: "SA效率看板",
                index: "35",
                outLink: "http://10.147.214.130:8081/Test/ReportSA"
              },
              {
                icon: "el-icon-s-release",
                title: "Test效率看板",
                index: "36",
                outLink: "http://10.147.214.130:8081/Test/ReportTEST"
              },
              {
                icon: "el-icon-s-release",
                title: "Test治具良率看板",
                index: "37",
                outLink: "http://10.151.128.141:8080/Kanban/I300FirstYieldByJig.aspx"
              },
              {
                icon: "el-icon-s-release",
                title: "Test一次不良Top15",
                index: "38"
              },
              {
                icon: "el-icon-s-release",
                title: "AVI效率看板",
                index: "39",
                outLink: "http://10.147.214.130:8081/Test/ReportAVI"
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-s-data",
        title: "製程監控",
        index: "/overview/manage/process",
        subs: [
          {
            icon: "el-icon-s-release",
            title: "SFR",
            index: "41",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "AA機台SFR看板",
                index: "42",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AASFRKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "鏡頭模穴SFR看板",
                index: "43",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AASFRToolingKanban"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "Particle",
            index: "44",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "GA拋料監控看板",
                index: "44"
              },
              {
                icon: "el-icon-s-release",
                title: "AOI 不良率看板",
                index: "45",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AOINotice"
              },
              {
                icon: "el-icon-s-release",
                title: "AOI 8H趨勢看板",
                index: "46",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AOINoticeImgPage"
              },
              {
                icon: "el-icon-s-release",
                title: "DPC/LCB不良看板",
                index: "47",
                outLink: "http://10.151.128.45:8081/Kanban/LCBDPCTracknew.aspx"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "E-fail",
            index: "48",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "FC不良看板",
                index: "49",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.SFCDefectKanban"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "Process(FOL)",
            index: "50",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "FC高度報警看板",
                index: "51",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.FCAIterKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "FC壓縮量看板",
                index: "52",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.BumpCollapsKanban"
              }
            ]
          },
          {
            icon: "el-icon-setting",
            title: "Process(AA)",
            index: "53",
            subs: [
              {
                icon: "el-icon-setting",
                title: "IAA Step看板",
                index: "54",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AAStepKanban"
              },
              {
                icon: "el-icon-setting",
                title: "實時統計",
                index: "56",
                outLink: "http://10.142.117.50:32001/share.html#/?token=KG3RHWT8"
              },
              {
                icon: "el-icon-setting",
                title: "歷史日統計",
                index: "57",
                outLink: "http://10.142.117.50:32001/share.html#/?token=PVAX4VH2"
              },
              {
                icon: "el-icon-setting",
                title: "歷史周統計",
                index: "58",
                outLink: "http://10.142.117.50:32001/share.html#/?token=AMM0V0AE"
              },
              {
                icon: "el-icon-setting",
                title: "歷史月統計",
                index: "59",
                outLink: "http://10.142.117.50:32001/share.html#/?token=YBWWHR2M"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "Process(EOL)",
            index: "60",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "EOL 一次良率看板",
                index: "61",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.TestKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "ACF貼膠不良看板",
                index: "62"
              },
              {
                icon: "el-icon-s-release",
                title: "AVI 一次不良看板",
                index: "63",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AVIFirstYieldKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "Laser等級監控看板",
                index: "64",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.LaserTransferAVILeveIKanban"
              }
            ]
          },
          {
            icon: "el-icon-s-release",
            title: "關鍵部件",
            index: "65",
            subs: [
              {
                icon: "el-icon-s-release",
                title: "FOL 零部件看板",
                index: "66",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.KeyPartLiveKanban"
              },
              {
                icon: "el-icon-s-release",
                title: "AA 膠針监控看板",
                index: "67"
              },
              {
                icon: "el-icon-s-release",
                title: "AA 夾爪监控看板",
                index: "68"
              },
              {
                icon: "el-icon-s-release",
                title: "ACF 零部件看板",
                index: "69"
              }
            ]
          }
        ]
      }
    ]
  },
  // {
  //   icon: "el-icon-s-promotion",
  //   title: "权限设定",
  //   index: "8816454658",
  //   subs: [
  //     {
  //       icon: "el-icon-s-promotion",
  //       title: "角色设定",
  //       index: ""
  //     }
  //   ]
  // },
  // {
  //   icon: "el-icon-s-promotion",
  //   title: "关于",
  //   index: "/overview/about",
  //   subs: [
  //     {
  //       icon: "el-icon-s-promotion",
  //       title: "系统信息",
  //       index: "/overview/about"
  //     }
  //   ]
  // }
]
