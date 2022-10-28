import request from "@/network"
let { post: $post } = request

// Top 25 Defect Item
export let GetDefectYieldInfo = ({
  PlantID = "8S01",
  ProductArea = "ALL",
  ShowTag = "ALL",
  LotType = "MP",
  St = "2022-10-25 06:00:00",
  Et = "2022-10-26 06:00:00"
} = {}) =>
  $post(
    `api/MESYield/GetDefectYieldInfo?PlantID=${PlantID}&ProductArea=${ProductArea}&ShowTag=${ShowTag}&LotType=${LotType}&St=${St}&Et=${Et}`
  )
