import request from "@/network"

let { bodypost: $bodypost } = request

export let GetFdrHeartCheck = (itemAPI) => {
  return $bodypost(`FDRApi/${itemAPI}`, {}, { isPort: true })
}
