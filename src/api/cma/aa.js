import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTime } from "@/utils"

// 保養任務公告
export let getAAMachineMaintainInfo = () => $post(`api/AAMachineRun/GetAAMachineMaintainInfo`)

// 當日產出/達成率/良率/統計
export let getAAProductInfo = () => $post(`api/AAMachineRun/GetAAProductInfo?${getTime()}`)

// 获取中间的数据
export let getAllStateNums = () => $post(`api/AAMachineRun/GetAAMachineTotalInfo/Location`)

// 获取效率损失top5
export let getEfficiencyTop5 = () =>
  $post(`api/AAMachineRun/GetAAMachineRunStateRecord/Location?${getTime()}`)

// 获取良率损失top5
export let getYieldTop5 = () =>
  $post(`api/AAMachineRun/GetAAMachineMapYieldLoss/Location?${getTime()}`)

// 获取下方机台信息的数据 及每个block
export let getMachinesInfo = () =>
  $post(`api/AAMachineRun/GetAAMachineRunInfos/Location?${getTime()}`)

// 获取AA指定机台的近三天的生产信息
export let getMachineThreeInfo = (ip) =>
  $post(`/api/AAMachineRun/GetAAMachineProductInfo?IP=${ip}&${getTime()}`)

// 获取 下方表格的信息 10.143.47.26
export let getMachineHeadRunInfos = (ip) =>
  $post(`/api/AAMachineRun/GetAAMachineHeadRunInfos?IP=${ip}&${getTime()}`)
