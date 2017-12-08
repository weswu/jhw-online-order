<template>
  <div id="shop">
    <div class="wrap shop-wrap">
      <div class="side-bar">
        <div class="side-bar-bd" :class="{'fixed': fixed}">
          <div class="side-bar-bd_cont">
            <table class="mu-table w-table">
              <tr class="mu-thead" v-for="(item, index) in shopFunction" :key="item.title" v-if="index > 0">
                <th class="mu-th"><div class="mu-th-wrapper">{{item.title}}</div></th>
                <td class="mu-th" colspan="2">
                  <div class="" v-if="row.needCheck" v-for="row in item.groups" :key="row.title">
                    <mu-flexbox class="mt8">
                      <mu-flexbox-item class="flex-demo">
                        {{row.title}}
                      </mu-flexbox-item>
                      <mu-flexbox-item class="flex-demo">
                        {{row.price}}
                      </mu-flexbox-item>
                    </mu-flexbox>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <mu-select-field :value="0" :labelFocusClass="['label-foucs']" label="选择使用年限" @change="chooseYear" fullWidth>
            <mu-menu-item v-for="(year, index) in yearList" :key="index" :value="index" :title="year + '年'" />
          </mu-select-field>
          <div class="side-bar-origin-price">原价：RMB {{totalPrice}}</div>
          <div class="side-bar-price">RMB {{totalPrice}}</div>
          <mu-raised-button @click="toMain" label="现在购买" primary fullWidth />
        </div>
      </div>
      <div class="shop">
        <shop-group></shop-group>
        <FAQ></FAQ>
      </div>
    </div>
    <mu-dialog :open="dialog" @close="close" title="订单支付" scrollable>
      <div class="dialog_bd">
        <div class="point">
          <p><mu-checkbox @change="getPoints" label="使用积分抵扣" class="demo-checkbox" /></p>
          <mu-text-field v-if="showPoint" type="number" hintText="提示文字" @input="checkPoint" :errorText="errorText" :label="'可用积分: ' + $store.state.points" v-model.number="points" min="0" :max="$store.state.points"/>
        </div>
        <div class="order-price">
          <div class="order-price-item">
            <div class="order-price-item_hd">订单金额</div>
            <div class="order-price-item_ft">RMB {{totalPrice}}</div>
          </div>
          <div class="order-price-item">
            <div class="order-price-item_hd">积分抵扣</div>
            <div class="order-price-item_ft">- RMB {{points/10}}</div>
          </div>
        </div>
        <div class="order-price order-price-total">
          <div class="order-price-item">
            <div class="order-price-item_hd">共需支付</div>
            <div class="order-price-item_ft">RMB {{(totalPrice) - points/10}}</div>
          </div>
        </div>
        <div class="payment">
          <mu-raised-button class="wexinpay" label="微信支付" @click="pay('WX')">
            <i class="mu-icon iconfont icon-pay-wechat" style="font-size:24px;"></i>
          </mu-raised-button>
          <mu-raised-button class="alipay" label="支付宝支付" @click="pay('ALI')" style="display:none">
            <i class="mu-icon iconfont icon-umidd17" style="font-size:24px;"></i>
          </mu-raised-button>
        </div>
        <div class="payment-code" v-if="payment === 'WX' && order.qrcode !== ''">
          <div class="payment-code-wrap">
            <img v-lazy="'http://qr.liantu.com/api.php?w=272&text='+order.qrcode" alt="">
            <div class="payment-code-tip">手机微信扫码支付</div>
          </div>
        </div>
        <div class="payment-code" v-if="payment === 'ALI' && order.qrcode !== ''">
          <div class="payment-code-wrap">
            <img src="data:image/png;base64,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" alt="">
            <div class="payment-code-tip">手机支付宝扫码支付</div>
          </div>
        </div>
      </div>
      <mu-flat-button label="返回" @click="close" slot="actions"/>
    </mu-dialog>
    <Online></Online>
  </div>
</template>

<script>
import ShopGroup from '@/components/shop/ShopGroup'
import FAQ from '@/components/shop/FAQ'
import Online from '@/components/shop/Online'
import { mapGetters, mapActions } from 'vuex'
import qs from 'qs'
export default {
  components: {
    ShopGroup,
    FAQ,
    Online
  },
  data () {
    return {
      fixed: false,
      activeTab: 'tab1',
      dialog: false,
      points: 0,
      showPoint: false,
      payment: 0,
      errorText: '',
      order: {
        qrcode: ''
      }
    }
  },
  computed: {
    ...mapGetters('shop', ['year', 'yearList', 'totalPrice', 'shopFunction'])
  },
  mounted () {
    let that = this
    window.onscroll = function () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条距离页面顶部位置
      if (document.querySelector('.shop-wrap')) {
        let menu = document.querySelector('.shop-wrap').offsetTop
        if (sTop > menu) {
          that.fixed = true
        } else {
          that.fixed = false
        }
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    ...mapActions('shop', ['chooseYear']),
    get () {
      let ctx = this
      this.$http.get('/api/user/info').then((res) => {
        if (res.data.code !== 5) {
          ctx.$store.commit('setUser', res.data)
        }
      })
      if (!this.$store.state.homeInfo.name) {
        this.$http.get('/api/user/homeInfo').then((res) => {
          if (res.data) {
            ctx.$store.commit('setHomeInfo', res.data)
            ctx.$store.commit('shop/UPGRADE', res.data.priceItemIds)
          }
        })
      } else {
        this.$store.commit('shop/UPGRADE', this.$store.state.homeInfo.priceItemIds)
      }
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    toMain () {
      var ctx = this
      this.$http.get('/api/user/info').then((res) => {
        if (res.data.code === 5) {
          ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url)
          ctx.$parent.$refs.iframe.open()
        } else {
          ctx.dialog = true
          ctx.$store.commit('setUser', res.data)
        }
      })
    },
    close () {
      this.dialog = false
      this.showPoint = false
      this.order = {
        qrcode: ''
      }
      clearInterval(this.timer)
    },
    checkPoint (e) {
      if (parseInt(e) > this.$store.state.points) {
        this.errorText = '您的可用积分为' + this.$store.state.points
        this.points = this.$store.state.points
      } else {
        this.errorText = ''
      }
      if (parseInt(e) < 0) {
        this.points = 0
      }
    },
    // 获取积分
    getPoints () {
      var ctx = this
      this.showPoint = !this.showPoint
      this.$http.get('/api/integralRecord/total').then((res) => {
        ctx.$store.commit('setPoints', res.data || 0)
      })
    },
    // 微信支付
    pay (e) {
      var ctx = this
      this.payment = e
      let order = {
        priceItemIds: this.$store.state.shop.priceItemIds,
        payType: this.payment,
        year: this.$store.state.shop.year,
        integral: this.points,
        orderType: this.$store.state.homeInfo.priceItemIds ? 'UPDATE' : 'CUSTOM',
        designerId: this.$store.state.shop.designerId
      }
      if (order.priceItemIds === '') {
        return this.$parent.$refs.toast.show('请选择商品')
      }
      if (this.points > this.$store.state.points) {
        return this.$parent.$refs.toast.show('积分已超过最大量')
      }
      this.$store.commit('setLoading', true)
      this.$http.post('/api/order/detail?' + qs.stringify(order)).then((res) => {
        ctx.$store.commit('setLoading', false)
        ctx.order = res.data
        ctx.sendAjax()
      })
    },
    // 查询是否支付成功
    sendAjax () {
      let ctx = this
      this.$http.get('/api/wxpay/getWxPayResult?orderId=' + this.order.orderId).then((res) => {
        // 微信已扫
        if (res === 'start') {
          ctx.loop()
        } else if (res === 'sweep') {
          ctx.loop()
        } else if (res === 'paysuccess') {
          // 跳转到支付已成功页面
          ctx.$parent.$refs.toast.show('支付已完成')
          ctx.$router.push({ name: 'paid', params: {outTradeNo: this.order.outTradeNo, totalPrice: this.order.totalPrice} })
        } else if (res === 'payfailed') {
          // 跳转到支付失败页面
          ctx.$parent.$refs.toast.show('支付未完成')
        }
      })
    },
    // 循环请求
    loop () {
      let ctx = this
      this.timer = setTimeout(function () {
        ctx.sendAjax()
      }, 2000)
    }
  }
}
</script>

<style lang="less">
.wrap {
  width: 1200px;
  margin: 50px auto 0;
  position: relative;
}

// 右侧计算表单
.side-bar {
  float: right;
  width: 270px;
  .side-bar-bd {
    width: 270px;
    padding: 30px;
    background: #fff;
    .side-bar-bd_cont {
      padding-bottom: 20px;
      .w-table{
        border: 1px solid rgba(0,0,0,.12);
        border-bottom: none;
        .mu-th{
          height: auto;
          line-height: 20px;
          font-size: 13px;
          padding: 7px 7px;
          color: rgba(0,0,0,.8);
          border-right:  1px solid rgba(0,0,0,.12);
        }
      }
    }
    // 总价格
    .side-bar-origin-price {
      color: #ff4081;
      text-align: right;
      font-size: 14px;
      text-decoration: line-through;
    }
    .side-bar-price {
      text-align: right;
      font-size: 24px;
      padding: 10px 0;
    }
  }
  .fixed {
    position: fixed;
    top: 0;
    z-index: 2;
  }
}
.side-bar-item_title {
  font-size: 13px;
  color: #9b9b9b;
  line-height: 30px;
}
.side-bar-item {
  padding: 0 15px;
  font-size: 13px;
  line-height: 24px;
}
.side-bar-item span {
  float: right;
}

// 左侧购买项
.shop {
  width: 900px;
  .shop-group {
    margin-top: 30px;
    min-height: 100px;
    background: #fff;
    overflow: hidden;
    zoom: 1;
    position: relative;
    .shop-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      bottom: 0;
      background: #000;
      color: #fff;
      text-align: center;
      .shop-icon-wrap {
        position: absolute;
        top: 50%;
        margin-top: -33px;
        width: 100%;
        text-align: center;
        img {
          height: 36px;
          display: inline-block;
        }
        p {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .shop-cont {
      width: 700px;
      margin-left: 200px;
      padding: 20px 30px;
    }
    .shop-nav-bd,.shop-cont {
      padding: 20px;
      overflow: hidden;
      zoom: 1;
    }
    .shop-nav-bd li,.shop-cont li {
      float: left;
      width: 25%;
      position: relative;
    }
  }
}
.shop.pd-top {
  padding-top: 148px;
}
.shop-nav {
  background: #fff;
  width: 900px;
}
.shop-group ul {
  overflow: hidden;
  zoom: 1;
  margin-top: 20px;
}
.shop-group ul:first-child {
  border-top: none;
  margin-top: 0px;
}
.shop-group-title {
  padding: 10px 0;
  font-weight: bold;
}
.shop-group-title::after {
  content: '';
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.shop-group-title span {
  font-size: 12px;
  font-weight: normal;
  color: #444;
  padding: 0 10px;
}
.shop-cont span {
  line-height: 30px;
}
.mu-radio-label {
  font-size: 14px;
}
.dialog_bd {
  padding-top: 24px;
}
.order-price {
  padding: 10px 0;
  font-size: 18px;
}
.order-price span {
  padding: 0 10px;
  color: #ff4081;
  font-size: 14px;
  text-decoration: line-through;
}
.order-price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.order-price-item_ft {
  color: #333;
}
.order-price-total .order-price-item_hd {
  font-size: 16px;
}
.order-price-total .order-price-item_ft {
  font-size: 32px;
}
.payment {
  float: right;
}
.wexinpay {
  background: #0eb20c;
  color: #fff;
}
.alipay {
  background: #00a3ee;
  color: #fff;
}
.payment-code {
  clear: both;
  padding-top: 20px;
}
.payment-code-wrap {
  padding: 30px;
  background: #f8f8f8;

  text-align: center;
  color: #666;
}
/* 自适应 */
@media only screen and (max-width: 1100px) {
  .wrap {
    width: 1000px;
    .shop {
      width: 700px;
      .shop-cont {
        width: 500px;
      }
      .shop-nav-bd li, .shop-cont li {
        width: 33.3%;
      }
    }
  }
}
</style>
