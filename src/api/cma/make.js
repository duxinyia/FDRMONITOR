import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime, getTimeAgo } from "@/utils"

// GetRunningInfo
export let GetRunningInfo = (params) => {
  let { plantID, deviceNo, ProductArea, preTime } = params
  // let time  = `St=${preTime}&Et=${curTime}`
  return $post(
    `api/MESOutPut/GetRunningInfo?PlantID=${plantID}&DeviceNo=${deviceNo}&ProductArea=${ProductArea}&LotType=MP&${getTime(
      preTime
    )}`
  )
}

// 获取中间表格的数据
export let GetStationTimeSpanOutputInfo = (params) => {
  let { plantID, Opno, deviceNo, preTime } = params
  return $post(
    `/api/MESOutPut/GetStationTimeSpanOutputInfo?PlantID=${plantID}&DeviceNo=${deviceNo}&Opno=${Opno}&LotType=MP&${getTime(
      preTime
    )}`
  )
}

// 4/13 第三个折线的数据
export let getStationTimeSpanWIPInfo = (params) => {
  let { plantID = "8S01", deviceNo, Opno } = params
  return $post(
    `/api/MESOutPut/GetStationTimeSpanWIPInfo?PlantID=${plantID}&DeviceNo=${deviceNo}&Opno=${Opno}&LotType=MP&${getTimeAgo(
      24
    )}`
  )
}
