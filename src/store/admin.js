const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export default {
  state,
  getters,
  mutations
}
