import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTimeAgo, getOneDay } from "@/utils"

// 1. 获取 机台 信息
// export let GetProductInfo = () =>
//   $post(
//     `api/MESOutPut/GetProductAreaDailyOutputInfo?${getTimeAgo(
//       48,
//       true
//     )}&PlantID=8S01&ProductArea=ALL`
//   )

// 2-18新的接口 获取上方的数据
export let GetOutputInfoStatics = () =>
  $post(
    `api/MESOutPut/GetProductAreaDailyOutputInfoStatics?PlantID=8S01&ProductArea=ALL&DateTag=ALL&${getOneDay()}`
  )

// 获取各个机台的信息
export let GetDeviceInfo = (device) =>
  $post(
    `api/MESOutPut/GetDeviceProductAreaDailyOutputInfo?PlantID=8S01&ProductArea=ALL&DeviceNo=${device}&${getTimeAgo(
      48,
      true
    )}`
  )
