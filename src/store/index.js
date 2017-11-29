import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'
import orders from './orders'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  webs: [
    {
      id: 1,
      title: '网站名称',
      status: '正常',
      pic: 'static/26a0185a-47e6-43b6-b112-a7940f88fbde_7.jpg'
    }
  ],
  user: {}
}

const getters = {
  webs: state => state.webs,
  user: state => state.user
}

const actions = {
  getWebs ({commit, state}) {
    return state.webs
  },
  getUser ({commit}, axios) {
    var ctx = this
    axios.get('/api/user/info').then((res) => {
      ctx.commit('setUser', res.data.data)
    })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    shop,
    orders
  },
  strict: debug
})
