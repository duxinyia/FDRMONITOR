const state = {
  fullLoading: false
}

const mutations = {
  SET_FULLLOADING: (state, payload = false) => {
    state.fullLoading = payload
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
