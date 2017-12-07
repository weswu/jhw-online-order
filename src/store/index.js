import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'

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
    logo: ''
  },
  points: 0,
  loading: false,
  loginUrl: 'http://www.jihui88.com/login.html'
}

const getters = {
  webs: state => state.webs,
  user: state => state.user,
  homeInfo: state => state.homeInfo,
  points: state => state.points,
  loading: state => state.loading
}

const actions = {
  getWebs ({commit, state}) {
    return state.webs
  },
  getUser ({commit}, axios) {
    var ctx = this
    axios.get('/api/user/info').then((res) => {
      ctx.commit('setUser', res.data)
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
