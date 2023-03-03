const getters = {
  // token: (state) => state.user.token,
  bgUrl: (state) => state.fullLoading.bgUrl.bg,
  theme: (state) => state.fullLoading.theme,
  menus: (state) => state.permission.menus,
  showRouter: (state) => state.permission.routerArr,
  routerTitles: state => state.permission.routerTitles,
  showIndex: state => state.permission.showIndex,
}
export default getters
