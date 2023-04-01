import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTimeAgo, getOneDay } from "@/utils"

// 2-18新的接口 获取上方的数据
export let GetOutputInfoStatics = (isDp = false) => {
  let PlantID = isDp ? "9S01" : "8S01"
  return $post(
    `api/MESOutPut/GetProductAreaDailyOutputInfoStatics?PlantID=${PlantID}&ProductArea=ALL&DateTag=ALL&${getOneDay()}`
  )
}

// 获取各个机台的信息
export let GetDeviceInfo = (device, isDp = false) => {
  let PlantID = isDp ? "9S01" : "8S01"
  return $post(
    `api/MESOutPut/GetDeviceProductAreaDailyOutputInfo?PlantID=${PlantID}&ProductArea=ALL&DeviceNo=${device}&${getTimeAgo(
      48,
      true
    )}`
  )
}
