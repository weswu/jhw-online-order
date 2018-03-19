<template>
  <div class="" style="background: #fff;">
    <mu-flexbox class="mt8" :style="'height:' + height + 'px'">
      <mu-flexbox-item>
        <div class="pay-code">
          <p>
            <img v-lazy="'http://buy.jihui88.com/api/order/qrcode?url=' + order.qrcode" alt="">
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
import Toast from '@/components/Toast'
import Bank from '@/components/pay/Bank'
import qs from 'qs'
export default {
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
      height: ''
    }
  },
  created () {
    var ctx = this
    this.year = this.$route.query.year || 1
    this.layoutId = this.$route.query.layoutId || ''
    this.ids = this.$route.query.ids || '297e2669600191860160021b8fcc007f'
    this.designerId = this.$route.query.designerId || ''
    this.height = this.$route.query.height || '428'
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
