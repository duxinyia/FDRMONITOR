import request from "@/network"
let { get: $get } = request
import moment from "moment"

// 获取页面的数据
export let getDateCodeRunningYieldInfo = (params = {}) => {
  let {
    PlantID = "8S01",
    ProductArea = "EOL",
    Time = `${moment().format("YYYY-MM-DD 06:00:00")}`
  } = params
  return $get(
    `Mock/MESYield/GetDateCodeRunningYieldInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&Time=${Time}`
  )
}
