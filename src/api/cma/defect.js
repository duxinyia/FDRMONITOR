import request from "@/network"
let { post: $post } = request
import moment from "moment"

export let GetDefectYieldInfo = ({
  PlantID = "8S01",
  ProductArea = "ALL",
  ShowTag = "ALL",
  LotType = "MP",
  St = `${moment().format("YYYY-MM-DD 06:00:00")}`,
  Et = `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
  isMw = false
} = {}) =>
  $post(
    `api/MESYield/GetDefectYieldInfo${
      isMw ? "" : "_MW"
    }?PlantID=${PlantID}&ProductArea=${ProductArea}&ShowTag=${ShowTag}&LotType=${LotType}&St=${St}&Et=${Et}`
  )
