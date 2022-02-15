const state = {
  showing: false,
}
const mutations = {
  setModal (state, showing) {
    state.showing = showing
  }
}
const actions = {
  setModal ({ commit }, showing) {
    commit('setModal', showing)
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations
}