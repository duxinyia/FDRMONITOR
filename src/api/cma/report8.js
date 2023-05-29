import request from "@/network"
import moment from "moment"
let { bodypost: $bodypost } = request

export let GetFdrHeartCheck = (itemAPI) => {
  $bodypost(`FDRApi/${itemAPI}`, {}, { isPort: true })
}
