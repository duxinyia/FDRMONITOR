import request from "@/network"
let { post: $post } = request

// 导入时间处理函数
import { getTime } from "@/utils"

//
export let GetKeyStationRunningInfo = (area = "ALL") =>
  $post(
    `api/MESOutPut/GetKeyStationRunningInfo?PlantID=8S01&ProductArea=${area}&ShowTag=ALL&LotType=MP&${getTime()}`
  )
