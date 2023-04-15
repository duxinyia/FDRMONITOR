/**
 * 用于处理返回的数组
 * @param {*} menus 原始菜单数据
 */
export let mapMenus = (routers) => {
  // 需要返回的数据
  let titleArr = [] // 菜单数组
  let menus = [] // 处理后的除了cma和dp的所有子数组
  routers.forEach((item) => {
    // 取出一级标题和路径
    titleArr.push({ name: item.meta.title, path: item.path })
    if (item.children) {
      // 调用该方法会 对 dp 和 cma 的
      menus.push(mapChildMenu(item.children))
    }
  })
  return { titleArr, menus }
}
/**
 *
 * @param {*} childMenu 子数组 比如cma的children
 * @returns
 */
export let mapChildMenu = (childMenu) => {
  let childMenus = []
  childMenu.forEach((item) => {
    let children = ""
    if (item.children) {
      children = mapChildMenu(item.children)
    }
    childMenus.push({
      title: item.meta.title,
      icon: item.meta.icon,
      index: item.path,
      subs: children
    })
  })
  return childMenus
}
