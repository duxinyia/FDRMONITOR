// 侧边栏的配置文件
export default [
  {
    icon: "el-icon-s-tools",
    title: "決策層",
    index: "/overview/manage/1",
    subs: [
      {
        icon: "el-icon-s-tools",
        title: "產出(待规划)",
        index: "/overview/manage/2",
        isOutLink: "www.baibu.com"
      },
      {
        icon: "el-icon-s-tools",
        title: "良率(待规划)",
        index: "/overview/manage/3"
      },
      {
        icon: "el-icon-s-tools",
        title: "人力(待规划)",
        index: "/overview/manage/4"
      }
    ]
  },
  {
    icon: "el-icon-s-tools",
    title: "管理層",
    index: "/overview/manage",
    // index: '',
    subs: [
      {
        icon: "el-icon-s-tools",
        title: "產出",
        // index: "/overview/manage/device",
        index: "/overview/manage/output",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "年度產出總覽",
            index: "/overview/manage/output",
            toLink: "output"
          },
          {
            icon: "el-icon-s-tools",
            title: "每日產出看板",
            index: "/overview/manage/output",
            toLink: "makewar",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "By時段產出看板(待规划)",
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
                    index: "11",
                    outLink: "http://10.151.128.45:8081/Kanban/MachineIOKanban.aspx"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "ACF",
                    index: "12",
                    outLink: "http://10.151.128.45:8081/Kanban/MachineIOKanban.aspx?Type=ACF"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "TEST",
                    index: "13",
                    outLink:
                      "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.kanban.TestKanban"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "AVI",
                    index: "14",
                    outLink:
                      "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.kanban.AVIFirstYieldKanban"
                  }
                ]
              },
              {
                icon: "el-icon-s-tools",
                title: "By站位產出看板",
                index: "15",
                toLink: "output2"
              }
            ]
          }
        ]
      },
      {
        icon: "el-icon-s-tools",
        title: "良率",
        index: "/overview/manage/yield",
        subs: [
          {
            icon: "el-icon-s-tools",
            title: "SAP良率(待开发)",
            index: "/overview/manage/yield"
          },
          {
            icon: "el-icon-s-tools",
            title: "SFC良率By月",
            index: "18",
            toLink: "sfc",
          },
          {
            icon: "el-icon-s-tools",
            title: "SFC良率Daily",
            index: "19",
            subs: [
              {
                icon: "el-icon-s-tools",
                title: "FOL Yield Report(待开发)",
                index: "20"
              },
              {
                icon: "el-icon-s-tools",
                title: "EOL Yield Report(待开发)",
                index: "21"
              }
            ]
          },
          {
            icon: "el-icon-s-tools",
            title: "Top 25 Defect Item(待开发)",
            index: "22"
          },
          {
            icon: "el-icon-s-tools",
            title: "FOL LCB差异层别(待开发)",
            index: "23"
          },
          {
            icon: "el-icon-s-tools",
            title: "FOL DPC差异层别(待开发)",
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
                title: "產能看板(待规划)",
                index: "27"
              },

              {
                icon: "el-icon-s-tools",
                title: "效率看板(待规划)",
                index: "51"
              },
              {
                icon: "el-icon-s-tools",
                title: "Alarms times Top10 看板(待规划)",
                index: "52"
              },
              {
                icon: "el-icon-s-tools",
                title: "機台掃碼率看板(待规划)",
                index: "53"
              },
              {
                icon: "el-icon-s-tools",
                title: "關鍵參數監控看板(待规划)",
                index: "54"
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
                index: "29",
                outLink: "http://10.147.214.130:8081/AA/Report"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 機況排行榜(待规划)",
                index: "30"
              },
              {
                icon: "el-icon-s-tools",
                title: "Alarms times Top15 看板",
                index: "31",
                outLink: "http://10.147.214.130:8081/AA/TopReport"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA Lens Reject rate(待规划)",
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
                index: "34",
                outLink: "http://10.147.214.130:8081/Test/ReportACF"
              },
              {
                icon: "el-icon-s-tools",
                title: "SA效率看板",
                index: "35",
                outLink: "http://10.147.214.130:8081/Test/ReportSA"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test效率看板",
                index: "36",
                outLink: "http://10.147.214.130:8081/Test/ReportTEST"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test機台每2小時by治具看板",
                index: "37",
                outLink: "http://10.151.128.141:8080/Kanban/I300FirstYieldByJig.aspx"
              },
              {
                icon: "el-icon-s-tools",
                title: "Test一次不良TOP15(待規劃)",
                index: "38"
              },
              {
                icon: "el-icon-s-tools",
                title: "AVI效率看板",
                index: "39",
                outLink: "http://10.147.214.130:8081/Test/ReportAVI"
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
                index: "42",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AASFRKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "SFR不良率看板(By鏡頭模穴)",
                index: "43",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AASFRToolingKanban"
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
                title: "GA拋料實時監控看板(待规划)",
                index: "44"
              },
              {
                icon: "el-icon-s-tools",
                title: "AOI 不良率看板",
                index: "45",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AOINotice"
              },
              {
                icon: "el-icon-s-tools",
                title: "AOI 8H趨勢看板",
                index: "46",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AOINoticeImgPage"
              },
              {
                icon: "el-icon-s-tools",
                title: "DPC/LCB不良看板",
                index: "47",
                outLink: "http://10.151.128.45:8081/Kanban/LCBDPCTracknew.aspx"
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
                index: "49",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.SFCDefectKanban"
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
                index: "51",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.FCAIterKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "FC壓縮量看板",
                index: "52",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.BumpCollapsKanban"
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
                index: "54",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AAStepKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "膠型 AI 檢測看板",
                index: "55",
                outLink: "http://10.142.117.50:32001/standard/design/#/share/OS4L2ZWV",
                subs: [
                  {
                    icon: "el-icon-s-tools",
                    title: "實時統計",
                    index: "56",
                    outLink: "http://10.142.117.50:32001/share.html?token=8ZBXMVMR"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史日統計",
                    index: "57",
                    outLink: "http://10.142.117.50:32001/share.html?token=V3SKHL6X"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史周統計",
                    index: "58",
                    outLink: "http://10.142.117.50:32001/share.html?token=HYMY179K"
                  },
                  {
                    icon: "el-icon-s-tools",
                    title: "歷史月統計",
                    index: "59",
                    outLink: "http://10.142.117.50:32001/share.html?token=TLYKVQQY"
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
                index: "61",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.TestKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "ACF貼膠不良看板(待規劃)",
                index: "62"
              },
              {
                icon: "el-icon-s-tools",
                title: "AVI 一次不良看板",
                index: "63",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.AVIFirstYieldKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "Laser等級監控看板",
                index: "64",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.LaserTransferAVILeveIKanban"
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
                index: "66",
                outLink:
                  "http://10.151.128.225:8091/Kanban/pageMenu?classname=MESReportTeamplate.Kanban.KeyPartLiveKanban"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 膠針监控看板(待規劃)",
                index: "67"
              },
              {
                icon: "el-icon-s-tools",
                title: "AA 夾爪监控看板(待規劃)",
                index: "68"
              },
              {
                icon: "el-icon-s-tools",
                title: "ACF Carrier 监控看板(待規劃)",
                index: "69"
              }
            ]
          }
        ]
      }
    ]
  }
]
