import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  user: {},
  homeInfo: {
    interalRecordList: {
      content: [],
      totalElements: 0
    },
    activeMqList: {
      content: [],
      totalElements: 0
    },
    messageList: {
      content: [],
      totalElements: 0
    },
    orderList: [],
    logList: {
      content: []
    },
    userInfo: {},
    logo: ''
  },
  points: 0,
  loading: false,
  loginUrl: ''
}

const getters = {
  user: state => state.user,
  homeInfo: state => state.homeInfo,
  points: state => state.points,
  loading: state => state.loading,
  loginUrl: state => state.loginUrl
}

const actions = {
  getUser ({commit, state}, iframe) {
    let ctx = this
    let ifr = iframe
    if (!state.user.username) {
      this.commit('setLoading', true)
      this._vm.$http.get('/api/user/info').then((res) => {
        ctx.commit('setLoading', false)
        if (res.data.code === 5) {
          ctx.commit('setLoginUrl', res.headers.requires_auth_url)
          ifr.open()
        } else {
          ctx.commit('setUser', res.data)
        }
      })
    }
  },
  getHomeInfo ({commit}) {
    var ctx = this
    this._vm.$http.get('/api/user/homeInfo').then((res) => {
      if (res.data) {
        ctx.commit('setHomeInfo', res.data)
        ctx.commit('shop/UPGRADE', res.data.priceItemIds)
        ctx.commit('shop/TOTAL')
      }
    })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setHomeInfo (state, homeInfo) {
    state.homeInfo = homeInfo
  },
  setPoints (state, points) {
    state.points = points
  },
  setLoading (state, loading) {
    state.loading = loading
    setTimeout(() => {
      state.loading = false
    }, 15000)
  },
  setLoginUrl (state, loginUrl) {
    state.loginUrl = loginUrl
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    shop
  },
  strict: debug
})
