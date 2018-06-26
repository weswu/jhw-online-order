import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'
import admin from './admin'

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
  loginUrl: '',
  layoutId: '',
  // 用于购买产品
  ids: ''
}

const getters = {
  user: state => state.user,
  homeInfo: state => state.homeInfo,
  points: state => state.points,
  loading: state => state.loading,
  loginUrl: state => state.loginUrl,
  layoutId: state => state.layoutId,
  ids: state => state.ids
}

const actions = {
  getUser ({commit, state}, iframe) {
    let ctx = this
    let ifr = iframe
    let end = false
    if (iframe.type === 'signup') {
      ifr = iframe.ifr
      end = true
    }
    if (!state.user.username) {
      this._vm.$http.get('/api/user/info').then((res) => {
        if (res.data.code === 5) {
          var url = res.headers.requires_auth_url
          ctx.commit('setLoginUrl', end ? (url.split('&backURL=')[0] + '&page=register&backURL=' + url.split('&backURL=')[1]) : url)
          ifr.open()
        } else {
          ctx.commit('setUser', res.data)
        }
      })
    }
  },
  getHomeInfo ({commit, state}) {
    var ctx = this
    this._vm.$http.get('/api/user/homeInfo' + (state.layoutId ? '?layoutId=' + state.layoutId : '')).then((res) => {
      if (res.data) {
        ctx.commit('setHomeInfo', res.data)
        ctx.commit('shop/UPGRADE', res.data.priceItemIds)
        if (state.ids) {
          ctx.commit('shop/BUY_GOODS', state.ids)
        }
        if (state.shop.activeTab === 'tab1') { ctx.commit('shop/TOTAL') }
        if (state.shop.activeTab === 'tab2') { ctx.commit('shop/MEAL_TOTAL') }
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
  },
  setLayoutId (state, layoutId) {
    state.layoutId = layoutId
  },
  setIds (state, ids) {
    state.ids = ids
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    shop,
    admin
  },
  strict: debug
})
