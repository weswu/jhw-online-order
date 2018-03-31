const state = {
  homeInfo: {
    navigateList: []
  }
}

const getters = {
  homeInfo: state => state.homeInfo
}

const mutations = {
  setHomeInfo (state, homeInfo) {
    state.homeInfo = homeInfo
  }
}

const actions = {
  getHomeInfo ({commit}) {
    var ctx = this
    this._vm.$http.get('/admin/home/info').then((res) => {
      if (res.data) {
        ctx.commit('admin/setHomeInfo', res.data)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
