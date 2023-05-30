import request from "@/network"
let { post: $post } = request

// 统计页面访问次数
export let addPageCount = (params = {}) => {
  let { PageID, SysID, PageName } = params
  return $post(`api/SysAccess/SysID/Post?PageID=${PageID}&SysID=${SysID}&PageName=${PageName}`)
}
