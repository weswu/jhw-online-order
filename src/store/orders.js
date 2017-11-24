const state = {
  orderList: [
    {
      orderNo: 'wx201711071615032345',
      orderDate: '2017/11/07 16:15',
      total: 1800
    }
  ],
  orderDetail: {
    orderNo: 'wx201711071615032345',
    orderDate: '2017/11/07 16:15',
    total: 1800,
    points: 100,
    paid: 1700,
    detail: [
      {name: '在线交易模块', price: 600},
      {name: '关键词监测', price: 600},
      {name: '首页热力图', price: 300},
      {name: '访问统计配置', price: 300}
    ]
  }
}

const getters = {
  orderList: state => state.orderList,
  orderDetail: state => state.orderDetail
}

const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
