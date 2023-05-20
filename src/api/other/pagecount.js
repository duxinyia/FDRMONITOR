import request from "@/network"
let { post: $post } = request

export let addPageCount = (pageId) => $post(`api/SysAccess/${pageId}`)
