import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime } from "@/utils"

// GetRunningInfo

export let GetRunningInfo = () =>
  $post(
    `api/MESOutPut/GetRunningInfo?PlantID=8S01&DeviceNo=A3H001&ProductArea=FOL&LotType=MP&${getTime()}`
  )
