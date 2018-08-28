<template>
  <div style="background: #fff;" :style="'height:' + height + 'px'">
    <mu-row gutter class="order-done-info" v-if="iframe">
      <mu-col span="10">
        <span @click="backMessage" class="backMessage" v-if="back">返回</span>
      </mu-col>
      <mu-col span="10" v-if="order.outTradeNo">
        <span class="outTradeNo">订单号：{{order.outTradeNo}}</span> <span class="total">{{order.totalPrice}}</span>元
      </mu-col>
    </mu-row>
    <mu-flexbox class="mt8">
      <mu-flexbox-item>
        <div class="pay-code">
          <p>
            <img v-lazy="'http://buy.jihui88.com/api/order/qrcode?url=' + order.qrcode" alt="微信支付">
          </p>
          <div class="pay-code-cont">
            <i class="material-icons">fullscreen</i>
            <div class="text">微信支付</div>
          </div>
        </div>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <div class="pay-code alipay">
          <p>
            <a :href="'http://buy.jihui88.com/alipay.html?orderId=' + order.orderId" target="_blank"><img src="/static/pay.png" alt=""></a>
          </p>
          <div class="pay-code-cont">
            <i class="material-icons">done</i>
            <div class="text">支付宝支付</div>
          </div>
        </div>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <div class="pay-code people">
          <p v-clipboard:copy="url" v-clipboard:success="onCopy" slot="actions">
            <span class="bank-icon">
              <a href="javascript:;"><img src="/static/people.png" alt=""></a>
            </span>
          </p>
          <div class="pay-code-cont">
            <i class="material-icons">done</i>
            <div class="text">找人代付</div>
          </div>
        </div>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <div class="pay-code bank">
          <p @click="bankDialog">
            <a href="javascript:;"><img src="/static/bank.png" alt=""></a>
          </p>
          <div class="pay-code-cont">
            <i class="material-icons">done</i>
            <div class="text">银行转账</div>
          </div>
        </div>
      </mu-flexbox-item>
    </mu-flexbox>
    <!--消息...-->
    <Toast ref="toast"/>
    <mu-toast v-if="toast" message="链接复制成功"/>
    <Bank ref="bank" :outTradeNo="order.outTradeNo" :orderId="order.orderId"/>
  </div>
</template>

<script>
import qs from 'qs'
import Toast from '@/components/Toast'
import Bank from '@/components/pay/Bank'
export default {
  props: ['height', 'points'],
  components: {
    Toast,
    Bank
  },
  data () {
    return {
      order: {
        qrcode: ''
      },
      url: '',
      toast: false,
      back: false,
      iframe: false
    }
  },
  created () {
    var ctx = this
    this.designerId = this.$route.query.designerId || ''
    if (this.$route.query.back === '1') {
      this.back = true
    }
    if (ctx.$route.path === '/qrcode') {
      this.iframe = true
    }
    // 1.订单号
    if (this.$route.query.orderId) {
      this.order.orderId = this.$route.query.orderId
      this.orderPay()
    } else {
      // 2. 参数
      if (!this.$route.query.ids) {
        this.$store.dispatch('getHomeInfo')
      } else {
        this.priceItemIds = this.$route.query.ids || ''
      }
      if (!this.$store.state.user.nickname) {
        setTimeout(function () {
          ctx.pay()
        }, 500)
      } else {
        setTimeout(function () {
          ctx.pay()
        }, 100)
      }
    }
  },
  methods: {
    backMessage () {
      let dataJson = {
        success: true,
        data: {
          back: true
        }
      }
      window.parent.postMessage(dataJson, '*')
    },
    // 已知orderId
    orderPay () {
      var ctx = this
      this.$store.commit('setLoading', true)
      this.$http.post('/api/pay/getPayInfo?orderId=' + this.order.orderId).then((res) => {
        ctx.$store.commit('setLoading', false)
        ctx.url = 'http://buy.jihui88.com/#/alipay?orderId=' + ctx.order.orderId
        ctx.order = res.data
        ctx.$emit('on-change', res.data)
      })
    },
    // 微信支付
    pay (e) {
      var ctx = this
      let order = {
        priceItemIds: this.priceItemIds || this.$store.state.shop.priceItemIds,
        payType: 'WX',
        year: this.$store.state.shop.year,
        integral: this.points || 0,
        orderType: this.$store.state.homeInfo.priceItemIds ? 'UPDATE' : 'CUSTOM',
        designerId: this.designerId || this.$store.state.shop.designerId,
        channel: this.$store.state.layoutId, // 来源站点
        chnnelType: 'pc', // 来源类型
        layoutId: this.$store.state.layoutId
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
        if (res.code === 30003) {
          let dataJson = {
            success: false,
            msg: res.msg
          }
          window.parent.postMessage(dataJson, '*')
        }
        ctx.order = res.data
        ctx.$emit('on-change', res.data)
        ctx.url = 'http://buy.jihui88.com/#/alipay?orderId=' + ctx.order.orderId
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
          if (ctx.$route.path === '/qrcode') {
            let dataJson = {
              success: true,
              data: {
                outTradeNo: this.order.outTradeNo,
                totalPrice: this.order.totalPrice
              }
            }
            window.parent.postMessage(dataJson, '*')
          } else {
            ctx.$refs.toast.show('支付已完成')
            // 更新数据
            ctx.$store.dispatch('getHomeInfo')
          }
        } else if (res === 'payfailed') {
          // 跳转到支付失败页面
          if (ctx.$route.path === '/qrcode') {
            let dataJson = {
              success: false,
              msg: '支付未完成'
            }
            window.parent.postMessage(dataJson, '*')
          } else {
            ctx.$refs.toast.show('支付未完成')
          }
        }
      })
    },
    // 循环请求
    loop () {
      let ctx = this
      this.timer = setTimeout(function () {
        ctx.sendAjax()
      }, 2000)
    },
    // 找人代付
    onCopy (e) {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    // 转账
    bankDialog () {
      this.$refs.bank.show()
    }
  }
}
</script>

<style lang="less">
  .order-done-info{
    padding: 25px 10px;
    color: #666;
    .backMessage{
      width: 40px;
      height: 23px;
      display: inline-block;
      color: #777;
      text-align: center;
      cursor: pointer;
    }
    .total{
      color: #ff6700;
      font-size: 16px;
      font-weight: bold;
      margin-right: 5px;
      margin-left: 20px
    }
  }
</style>
