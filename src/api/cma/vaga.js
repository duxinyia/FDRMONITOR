import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTimeAgo } from "@/utils"

// 获取中间的数据
export let getMachines = (params = {}) => {
  // let MachineType = "VA"
  let { MachineType = "VA" } = params
  return $post(`api/MachineData/GetMachines?MachineType=${MachineType}&UFileType=SCT`)
}

// 获取散点图的数据
export let getScatData = (params = {}) => {
  let { machinename = "VA1302", PlantID = "8S01", Device = "MW-E" } = params
  return $post(
    `api/MachineData/VA_Data_TiltXY_Scatter_Chart?MachineName=${machinename}&PlantID=${PlantID}&Device=${Device}&${getTimeAgo()}`
  )
}

// 获取折线图的数据
export let getLineData = (params = {}) => {
  let { machinename = "VA1302", PlantID = "8S01", Device = "MW-E", ValueItem = "CONFIGURABLETILTRAWX" } = params
  return $post(
    `api/MachineData/VA_Data?MachineName=${machinename}&PlantID=${PlantID}&Device=${Device}&ValueItem=${ValueItem}&${getTimeAgo()}`
  )
}

// 获取k线图的数据 位置
export let getKLineData = (params = {}) => {
  let { machinename = "VA1302", PlantID = "8S01", Device = "MW-E", ValueItem = "INSPECTIONZ" } = params
  return $post(
    `api/MachineData/VA_Data_SUBSTRATENO_Box_Plot?MachineName=${machinename}&PlantID=${PlantID}&Device=${Device}&ValueItem=${ValueItem}&${getTimeAgo()}`
  )
}

// 获取k线图的数据 时间
export let getKLineHourData = (params = {}) => {
  let { machinename = "VA1302", PlantID = "8S01", Device = "MW-E", ValueItem = "INSPECTIONZ" } = params
  return $post(
    `api/MachineData/VA_Data_Hour_Box_Plot?MachineName=${machinename}&PlantID=${PlantID}&Device=${Device}&ValueItem=${ValueItem}&${getTimeAgo()}`
  )
}
