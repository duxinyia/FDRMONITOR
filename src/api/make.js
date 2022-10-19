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
