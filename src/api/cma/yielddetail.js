import request from "@/network"
let { post: $post } = request

import moment from "moment"

// 获取表格数据
export let getTableList = (params = {}) => {
  let {
    PlantID = "8S01",
    device = "ML",
    ProductArea = "FOL",
    DefectType = "LCB",
    SearchType = "Config",
    Time = `${moment().format("YYYY-MM-DD")}`
  } = params
  return $post(
    `api/MESYield/GetDeviceSeries_V0_Fail_Info?PlantID=${PlantID}&DeviceSeries_V0=${device}&ProductArea=${ProductArea}&DefectType=${DefectType}&SearchType=${SearchType}&Time=${Time}`
  )
}
