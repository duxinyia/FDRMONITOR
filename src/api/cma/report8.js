import request from "@/network"

let { bodypost: $bodypost } = request

export let GetFdrHeartCheck = (itemAPI) => {
  return $bodypost(`FDRApi/${itemAPI}`, {}, { isPort: true })
}

export let text = () => {
  return $bodypost(`FDRApi/FdrHeartCheck`, {}, { isPort: true })
}
