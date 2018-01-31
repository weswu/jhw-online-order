<template>
  <div class="">
    <mu-flexbox class="mt8">
      <mu-flexbox-item>
        <div class="pay-code">
          <p>
            <img v-lazy="'http://buy.jihui88.com/api/order/qrcode?url=' + order.qrcode" alt="">
          </p>
          <div class="pay-code-cont">
            <i class="material-icons">fullscreen</i>
            <div class="text">请使用微信扫一扫<br>扫描二维码支付</div>
          </div>
        </div>
      </mu-flexbox-item>
      <mu-flexbox-item>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      order: {
        qrcode: ''
      }
    }
  },
  created () {
    var ctx = this
    this.year = this.$route.query.year || 1
    this.layoutId = this.$route.query.layoutId || ''
    this.ids = this.$route.query.ids || '297e2669600191860160021b8fcc007f'
    this.designerId = this.$route.query.designerId || ''
    if (!this.$store.state.user.nickname) {
      setTimeout(function () {
        ctx.pay()
      }, 500)
    } else {
      setTimeout(function () {
        ctx.pay()
      }, 100)
    }
  },
  methods: {
    // 微信支付
    pay (e) {
      var ctx = this
      let order = {
        priceItemIds: this.ids,
        payType: 'WX',
        year: this.year,
        integral: 0,
        orderType: 'CUSTOM',
        designerId: this.designerId,
        channel: this.layoutId,
        chnnelType: 'pc'
      }
      this.$http.post('/api/order/detail?' + qs.stringify(order)).then((res) => {
        if (res.code === 30003) {
          let dataJson = {
            success: false,
            msg: res.msg
          }
          window.parent.postMessage(dataJson, '*')
        }
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
          let dataJson = {
            success: true,
            data: {
              outTradeNo: this.order.outTradeNo,
              totalPrice: this.order.totalPrice
            }
          }
          window.parent.postMessage(dataJson, '*')
        } else if (res === 'payfailed') {
          // 跳转到支付失败页面
          let dataJson = {
            success: false,
            msg: '支付未完成'
          }
          window.parent.postMessage(dataJson, '*')
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

</style>
