const getters = {
  theme: (state) => state.fullLoading.theme,
  showRouter: (state) => state.permission.routerArr,
  routerTitles: (state) => state.permission.routerTitles,
  showIndex: (state) => state.permission.showIndex
}
export default getters
