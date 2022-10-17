import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime, getTimeAgo } from "@/utils"

// 1. 获取 配件到期提示區
export let getMaintainInfo = () => $post(`api/ADLineRun/GetMaintainInfo`)

// 2. 获取 線體狀態看板區
export let getDeviceInfo = () => $post(`api/ADLineRun/GetDeviceInfo?${getTime()}`)

// 4. 获取 當日當機Top5
export let getMachineTop5 = () =>
  $post(`api/ADLineRun/GetMachineRunStateRecord/Location?${getTime()}`)

// 3. 获取 各个机台对应的数据
export let getProductInfo = () => $post(`api/ADLineRun/GetProductInfo?${getTime()}`)

/** 弹框详情的接口 */

// 5.獲取指定ADLine生產信息 事件传递是取当前时间往前推12小时
export let GetMachineProductInfo = (combineID) =>
  $post(`api/ADLineRun/GetMachineProductInfo?${getTime()}&CombineID=${combineID}`)

// 6.获取右边第一和第二的表格数据
export let GetAOIScanInfo = (combineID) =>
  $post(`api/ADLineRun/GetAOIScanInfo?${getTimeAgo()}&CombineID=${combineID}`)

// 7.获取表格下方的数据
let str = "St=2022-09-26 06:00:00&Et=2022-09-26 12:00:00"
export let GetConcentrationInfo = (combineID) =>
  $post(`api/ADLineRun/GetCarrierMapConcentrationInfo?${str}&CombineID=${combineID}`)
