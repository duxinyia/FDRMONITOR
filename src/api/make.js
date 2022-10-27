import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime } from "@/utils"

// GetRunningInfo
export let GetRunningInfo = (params) => {
  let { plantID, deviceNo, ProductArea } = params
  return $post(
    `api/MESOutPut/GetRunningInfo?PlantID=${plantID}&DeviceNo=${deviceNo}&ProductArea=${ProductArea}&LotType=MP&${getTime()}`
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
