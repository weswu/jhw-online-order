<template>
  <div>
    <mu-dialog :open="dialog" @close="close" :title="title" scrollable>
      <div class="dialog_bd">
        <div class="point">
          <p><mu-checkbox @change="getPoints" label="使用积分抵扣" class="demo-checkbox" /></p>
          <mu-text-field v-if="showPoint" type="number" hintText="提示文字" @change="poi" @input="checkPoint" :errorText="errorText" :label="'可用积分: ' + $store.state.points" v-model.number="points" min="0" :max="$store.state.points"/>
        </div>
        <div class="order-price">
          <div class="order-price-item">
            <div class="order-price-item_hd">订单金额</div>
            <div class="order-price-item_ft">RMB {{totalPriceSingle || totalPrice}}</div>
          </div>
          <div class="order-price-item">
            <div class="order-price-item_hd">积分抵扣</div>
            <div class="order-price-item_ft">- RMB {{points/10}}</div>
          </div>
        </div>
        <div class="order-price order-price-total">
          <div class="order-price-item">
            <div class="order-price-item_hd">共需支付</div>
            <div class="order-price-item_ft">RMB {{(totalPriceSingle || totalPrice) - points/10}}</div>
          </div>
        </div>
        <div class="payment">
          <mu-raised-button class="wexinpay" label="微信支付" @click="pay('WX')">
            <i class="mu-icon iconfont icon-pay-wechat" style="font-size:24px;"></i>
          </mu-raised-button>
        </div>
        <div class="payment-code" v-if="payment === 'WX' && order.qrcode !== ''">
          <div class="payment-code-wrap">
            <img v-lazy="'http://buy.jihui88.com/api/order/qrcode?url=' + order.qrcode" alt="">
            <div class="payment-code-tip">手机微信扫码支付</div>
          </div>
        </div>
      </div>
      <mu-flat-button label="返回" @click="close" slot="actions"/>
    </mu-dialog>
    <!--消息...-->
    <Toast ref="toast"></Toast>
    <!--登录...-->
    <IframeLogin ref="iframe"></IframeLogin>
  </div>
</template>

<script>
import Toast from '@/components/Toast'
import IframeLogin from '@/components/Iframe'
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  components: {
    Toast,
    IframeLogin
  },
  props: ['title', 'totalPriceSingle', 'year'],
  data () {
    return {
      showPoint: false,
      points: 0,
      payment: 'WX',
      errorText: '',
      dialog: false,
      order: {
        qrcode: ''
      }
    }
  },
  computed: {
    ...mapGetters('shop', ['totalPrice', 'priceItemIds'])
  },
  methods: {
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
    poi () {
      if (this.order.qrcode !== '') {
        this.pay()
      }
    },
    openDialog () {
      var ctx = this
      if (!this.$store.state.user.name) {
        this.$http.get('/api/user/info').then((res) => {
          if (res.data.code === 5) {
            ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url)
            ctx.$refs.iframe.open()
          } else {
            ctx.dialog = true
            ctx.$store.commit('setUser', res.data)
          }
        })
      } else {
        this.dialog = true
        // 获取积分
        if (this.$store.state.points === 0) {
          this.$http.get('/api/integralRecord/total').then((res) => {
            ctx.$store.commit('setPoints', res.data || 0)
          })
        }
      }
    },
    close () {
      this.dialog = false
      this.showPoint = false
      this.order = {
        qrcode: ''
      }
      clearInterval(this.timer)
    },
    // 获取积分
    getPoints () {
      var ctx = this
      this.showPoint = !this.showPoint
      if (this.showPoint) {
        this.$http.get('/api/integralRecord/total').then((res) => {
          ctx.$store.commit('setPoints', res.data || 0)
        })
      }
    },
    // 微信支付
    pay (e) {
      var ctx = this
      this.payment = e || this.payment
      let order = {
        priceItemIds: this.priceItemIds || this.$store.state.shop.priceItemIds,
        payType: this.payment,
        year: this.year || this.$store.state.shop.year,
        integral: this.points,
        orderType: this.$store.state.homeInfo.priceItemIds ? 'UPDATE' : 'CUSTOM',
        designerId: this.$store.state.shop.designerId
      }
      if (order.priceItemIds === '') {
        return this.$refs.toast.show('请选择商品')
      }
      if (this.points > this.$store.state.points) {
        return this.$refs.toast.show('积分已超过最大量')
      }
      this.$store.commit('setLoading', true)
      this.$http.post('/api/order/detail?' + qs.stringify(order)).then((res) => {
        ctx.$store.commit('setLoading', false)
        ctx.order = res.data
        // ctx.sendAjax()
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
          ctx.$refs.toast.show('支付已完成')
          ctx.$router.push({ name: 'paid', params: {outTradeNo: this.order.outTradeNo, totalPrice: this.order.totalPrice} })
        } else if (res === 'payfailed') {
          // 跳转到支付失败页面
          ctx.$refs.toast.show('支付未完成')
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

<style>
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
</style>
