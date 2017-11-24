const state = {
  showDesigner: false,
  totalPrice: 0,
  magenif: 1,
  year: 1,
  yearList: [1, 2, 3, 5, 10],
  shopFunction: [
    {
      title: '常规功能',
      icon: 'standard.png',
      groups: [
        {
          title: '',
          needCheck: false,
          type: 'check',
          price: 0,
          items: [
            {name: '文章发布'},
            {name: '产品发布'},
            {name: '栏目定义'},
            {name: '多级页面'},
            {name: '在线相册'},
            {name: '会员注册'},
            {name: '实力证书'},
            {name: '在线客服'},
            {name: '留言板'},
            {name: '标准公信力'},
            {name: 'APP管理'},
            {name: '微信管理'},
            {name: '分权管理'},
            {name: '社交分享'},
            {name: '每页关键词'},
            {name: '站点地图'},
            {name: '关键词库'},
            {name: '数据统一'},
            {name: '数据分析'},
            {name: '批量导入'},
            {name: '定期备份'},
            {name: '无缝升级'},
            {name: '后台APP'}
          ]
        }
      ]
    },
    {
      title: '基础类',
      icon: 'base.png',
      groups: [
        {
          title: '域名',
          sub: '自有域名免费绑定',
          name: 'domain',
          needCheck: true,
          type: 'radio',
          price: 0,
          value: '1',
          items: [
            {name: '自有域名', price: 0, value: '1'},
            {name: '申请域名', price: 100, value: '2'}
          ]
        },
        {
          title: '委托服务',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '自助ICP备案', price: 100, value: '1'},
            {name: '委托ICP备案', price: 200, value: '2'},
            {name: '自助网安备案', price: 100, value: '3'},
            {name: '委托网安备案', price: 200, value: '4'},
            {name: '去技术支持', price: 300, value: '5'},
            {name: '全网营销培训', price: 100, value: '6'},
            {name: '公众号申请', price: 200, value: '7'},
            {name: '公众号配置', price: 200, value: '8'},
            {name: '即时通讯绑定', price: 100, value: '9'},
            {name: '地图定位', price: 300, value: '10'}
          ]
        }
      ]
    },
    {
      title: '设计制作',
      icon: 'design.png',
      groups: [
        {
          title: '界面设计',
          name: 'layout',
          needCheck: true,
          type: 'radio',
          price: 0,
          value: '1',
          custom: true,
          items: [
            {name: '自选模板', price: 0, value: '1'},
            {name: '定制设计', price: 0, value: '2'}
          ]
        },
        {
          title: '设计项目',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          magenif: true,
          items: [
            {name: '网站群建设', price: 1200, value: '1', disabled: false},
            {name: '定位策划', price: 2000, value: '2', disabled: false},
            {name: '页面成交逻辑', price: 2000, value: '3', disabled: false},
            {name: '栏目规划', price: 800, value: '4', disabled: false},
            {name: '首页定制', price: 800, value: '5', disabled: false},
            {name: '产品布局', price: 800, value: '6', disabled: false},
            {name: '公信力建设', price: 900, value: '7', disabled: false},
            {name: 'LOGO设计', price: 500, value: '8', disabled: false},
            {name: '焦点图设计', price: 200, value: '9', disabled: false},
            {name: '按钮图标制作', price: 300, value: '10', disabled: false},
            {name: '商品图片修图', price: 100, value: '11', disabled: false},
            {name: '实地拍照', price: 300, value: '12', disabled: false}
          ]
        }
      ]
    },
    {
      title: '功能模块',
      icon: 'function.png',
      groups: [
        {
          title: '手机端',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '小程序', price: 1600, value: '1'},
            {name: '手机网站', price: 600, value: '2'},
            {name: '微网站', price: 600, value: '3'},
            {name: '微传单', price: 0, value: '4'},
            {name: '微样册', price: 600, value: '5'},
            {name: '多语言版本', price: 1000, value: '6'},
            {name: '问卷调查', price: 1000, value: '7'}
          ]
        },
        {
          title: '工具类',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '在线交易模块', price: 600, value: '1'},
            {name: '关键词监测', price: 600, value: '2'},
            {name: '首页热力图', price: 300, value: '3'},
            {name: '访问统计配置', price: 300, value: '4'},
            {name: 'FAQ栏目', price: 500, value: '5'},
            {name: '视频库', price: 200, value: '6'},
            {name: '众筹', price: 200, value: '7'},
            {name: '抽奖', price: 200, value: '8'}
          ]
        }
      ]
    },
    {
      title: '推广运营',
      icon: 'marketing.png',
      groups: [
        {
          title: '搜索优化',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '关键词监测', price: 600, value: '1'},
            {name: '关键词向导', price: 500, value: '2'},
            {name: '深度SEO', price: 9800, value: '3'},
            {name: '全网SEO', price: 19800, value: '4'},
            {name: '外链资源', price: 2000, value: '5'}
          ]
        },
        {
          title: '推广类',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '网站内容更新', price: 2400, value: '1'},
            {name: '网站托管', price: 9800, value: '2'},
            {name: '竞价托管', price: 6800, value: '3'},
            {name: '媒体软文', price: 200, value: '4'},
            {name: '微博营销', price: 0, value: '5'},
            {name: '微信营销', price: 0, value: '6'},
            {name: '网红', price: 0, value: '7'},
            {name: '直播', price: 0, value: '8'},
            {name: '朋友圈广告', price: 0, value: '9'},
            {name: '今日头条广告', price: 0, value: '10'},
            {name: '微托管', price: 2400, value: '11'},
            {name: '微博矩阵', price: 600, value: '12'}
          ]
        },
        {
          title: '线下引流',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '产品二维码', price: 1200, value: '1'},
            {name: '展会策划', price: 1200, value: '2'},
            {name: '经销商大会', price: 1200, value: '3'}
          ]
        }
      ]
    },
    {
      title: '增值服务',
      icon: 'service.png',
      groups: [
        {
          title: '增值服务',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '上门服务', price: 600, value: '1'},
            {name: '定期服务', price: 300, value: '2'},
            {name: '营销型网站标准', price: 300, value: '3'},
            {name: '后台操作视频', price: 300, value: '4'},
            {name: '阿里巴巴装修', price: 300, value: '5'}
          ]
        }
      ]
    }
  ],
  designers: [
    {
      value: '1',
      name: '小王',
      sub: '五年经验，擅长简约风格',
      price: 1.5,
      avatar: 'd1.png'
    },
    {
      value: '2',
      name: '小李',
      sub: '六年经验，擅长整体策划',
      price: 2,
      avatar: 'd2.png'
    },
    {
      value: '3',
      name: '小胡',
      sub: '三年经验，擅长中国风',
      price: 1.3,
      avatar: 'd3.png'
    },
    {
      value: '4',
      name: 'Amy',
      sub: '三年经验，擅长欧美风',
      price: 1.2,
      avatar: 'd4.png'
    }
  ]
}

const getters = {
  shopFunction: state => state.shopFunction,
  totalPrice: state => state.totalPrice,
  showDesigner: state => state.showDesigner,
  designers: state => state.designers,
  year: state => state.year,
  yearList: state => state.yearList,
  orderDetail: state => {
    let rowArr = []
    state.shopFunction.map((row, index) => {
      if (index > 0) {
        let groupArr = []
        row.groups.map(group => {
          let itemArr = []
          group.items.map(item => {
            if (group.type === 'radio') {
              if (item.value === group.value) {
                itemArr.push({
                  title: item.name,
                  price: item.price
                })
              }
            } else {
              group.value.map(val => {
                if (item.value === val) {
                  console.log(item.name)
                  itemArr.push({
                    title: item.name,
                    price: item.price
                  })
                }
              })
            }
          })
          console.log(itemArr)
          if (itemArr.length) {
            groupArr.push({
              title: group.title,
              items: itemArr
            })
          }
        })
        if (groupArr.length) {
          rowArr.push({
            title: row.title,
            groups: groupArr
          })
        }
      }
    })
    return rowArr
  }
}

const actions = {
  chooseRadio ({commit, state}, params) {
    params.type = 'radio'
    commit('CHOOSE_RADIO', params)
  },
  chooseCheck ({commit, state}, params) {
    params.type = 'check'
    commit('CHOOSE_CHECK', params)
  },
  chooseDesigner ({commit, state}, params) {
    commit('CHOOSE_DESIGNER', params)
  },
  chooseYear ({commit, state}, params) {
    commit('CHOOSE_YEAR', params)
  }
}

const mutations = {
  CHOOSE_RADIO (state, params) {
    if (state.shopFunction[params.sIndex].groups[params.gIndex].custom) {
      // 判断是否选择了定制设计按钮，如果是，切换设计师界面显示状态
      state.showDesigner = !state.showDesigner
    }
    state.shopFunction[params.sIndex].groups[params.gIndex].value = params.item.value // 选中状态
    state.shopFunction[params.sIndex].groups[params.gIndex].price = params.item.price // 选中金额
    // 计算总金额
    let totalPrice = 0
    state.shopFunction.map(row => {
      row.groups.map(item => {
        totalPrice += item.price
      })
    })
    state.totalPrice = totalPrice
  },
  CHOOSE_CHECK (state, params) {
    let value = state.shopFunction[params.sIndex].groups[params.gIndex].value
    let price = state.shopFunction[params.sIndex].groups[params.gIndex].price
    let isSame = false
    if (!value.length) {
      value = value.concat(params.item.value)
      price += params.item.price
    } else {
      value.map((item, index) => {
        if (item === params.item.value) {
          isSame = true
          value.splice(index, 1)
          if (state.shopFunction[params.sIndex].groups[params.gIndex].magenif) {
            price = price - (params.item.price * state.magenif)
          } else {
            price = price - params.item.price
          }
        }
      })
      if (!isSame) {
        value = value.concat(params.item.value)
        if (state.shopFunction[params.sIndex].groups[params.gIndex].magenif) {
          price += params.item.price * state.magenif
        } else {
          price += params.item.price
        }
      }
    }
    state.shopFunction[params.sIndex].groups[params.gIndex].value = value
    state.shopFunction[params.sIndex].groups[params.gIndex].price = price
    // 计算总金额
    let totalPrice = 0
    state.shopFunction.map(row => {
      row.groups.map(item => {
        totalPrice += item.price
      })
    })
    state.totalPrice = totalPrice
  },
  CHOOSE_DESIGNER (state, params) {
    state.magenif = params.key.price
    let groups = state.shopFunction[params.sIndex].groups[1]
    let price = 0
    let keyDefault = false
    if (groups.value.length) {
      groups.value.map(item => {
        groups.items.map(key => {
          if (item === key.value) {
            price += key.price * params.key.price
          }
        })
        if (item === '5') {
          keyDefault = true
        }
      })
      if (!keyDefault) {
        groups.value = groups.value.concat('5')
        groups.items[4].disabled = true
        price += groups.items[4].price * params.key.price
      }
      state.shopFunction[params.sIndex].groups[1].price = price
    } else {
      groups.value = ['5']
      groups.items[4].disabled = true
      state.shopFunction[params.sIndex].groups[1].price = groups.items[4].price * params.key.price
    }
    // 计算总金额
    let totalPrice = 0
    state.shopFunction.map(row => {
      row.groups.map((item, index) => {
        totalPrice += item.price
      })
    })
    state.totalPrice = totalPrice
  },
  CHOOSE_YEAR (state, params) {
    state.year = state.yearList[params]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
