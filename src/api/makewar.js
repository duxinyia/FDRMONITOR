import request from "@/network"
let { post: $post } = request
// 导入时间处理函数
import { getTimeAgo } from "@/utils"

// 1. 获取 机台 信息
export let GetProductInfo = () =>
  $post(
    `api/MESOutPut/GetProductAreaDailyOutputInfo?${getTimeAgo(
      48,
      true
    )}&PlantID=8S01&ProductArea=ALL`
  )
