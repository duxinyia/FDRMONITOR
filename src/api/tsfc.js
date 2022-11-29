import request from "@/network"
let { get: $get } = request

// 获取页面的数据
export let getDateCodeRunningYieldInfo = (params = {}) => {
  let { PlantID = "8S01", ProductArea = "EOL", Time = "2022-11-25 06:00:00" } = params
  return $get(
    `Mock/MESYield/GetDateCodeRunningYieldInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&Time=${Time}`
  )
}
