const getters = {
  theme: (state) => state.fullLoading.theme,
  menus: (state) => state.permission.menus,
  routerTitles: (state) => state.permission.routerTitles,
  showIndex: (state) => state.permission.showIndex
}
export default getters
