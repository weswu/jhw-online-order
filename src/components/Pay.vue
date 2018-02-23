<template>
  <div>
    <mu-dialog :open="dialog" @close="close" :title="title">
      <div id="O_Pay">
        <mu-row gutter class="pay-total">
          <mu-col width="50" tablet="50" desktop="50" class="fl" v-if="!another">
            支付金额：<span class="total">{{money}} </span>
            <span class="discount" v-if="isOutPoint"><span style="text-decoration: line-through;">{{totalPriceSingle || totalPrice}}</span> (积分- {{points/10}})</span>
            <span class="discount" v-if="isOutDiscount">原价<span style="text-decoration: line-through;">{{totalPriceSingle || totalPrice}}</span> (优惠-99)元</span>
            <span class="discount" v-if="homeInfo.isDiscount && !isOutDiscount">(亲，还差{{1000 - money}}元即可享受99优惠哦)</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50" class="fl" v-if="another">
            支付金额：<span class="total">{{order.totalPrice}} 元</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50" class="fr" v-if="!another">
            积分抵扣:
            <mu-text-field :hintText="'可用积分 '+$store.state.points" hintTextClass="hintTextClass" type="number" class="points"
               @change="poi" @input="checkPoint" :errorText="errorText" v-model.number="points" min="0" :max="$store.state.points"/>
          </mu-col>
        </mu-row>

        <mu-flexbox class="mt8">
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
        </mu-flexbox>

      </div>
      <mu-flat-button label="找人代付" v-clipboard:copy="url" v-clipboard:success="onCopy" slot="actions" v-if="!another"/>
      <mu-flat-button label="银行转账" @click="bankDialog" slot="actions" v-if="!another"/></a>
      <mu-flat-button label="返回" @click="close" slot="actions"/>
    </mu-dialog>
    <!--消息...-->
    <Toast ref="toast"/>
    <mu-toast v-if="toast" message="链接复制成功"/>
    <Bank ref="bank" :outTradeNo="order.outTradeNo" :orderId="order.orderId"/>
  </div>
</template>

<script>
import Toast from '@/components/Toast'
import Bank from '@/components/pay/Bank'
import { mapState, mapGetters } from 'vuex'
import qs from 'qs'
export default {
  components: {
    Toast,
    Bank
  },
  props: ['title', 'totalPriceSingle', 'year'],
  data () {
    return {
      points: '',
      payment: 'WX',
      errorText: '',
      dialog: false,
      order: {
        qrcode: ''
      },
      url: '',
      toast: false,
      another: false
    }
  },
  computed: {
    ...mapGetters('shop', ['totalPrice', 'priceItemIds']),
    ...mapState(['user', 'homeInfo']),
    money () {
      var money = this.totalPriceSingle || this.totalPrice
      if (this.points > 0 && money > this.points / 10) {
        money = money - this.points / 10
        this.isOutPoint = true
      } else {
        this.isOutPoint = false
      }
      if (this.homeInfo.isDiscount && money > 1000) {
        money = money - 99
        this.isOutDiscount = true
      } else {
        this.isOutDiscount = false
      }
      return money
    }
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
    openDialog (id, orderId) {
      if (id === 'another') {
        this.dialog = true
        this.another = true
        this.order.orderId = orderId
        this.anotherPay()
        return
      }
      this.priceItemIdsSingle = id
      if (!this.user.username) {
        this.$store.dispatch('getUser', this.$parent.$parent.$refs.iframe || this.$parent.$parent.$parent.$refs.iframe || this.$parent.$parent.$parent.$parent.$parent.$refs.iframe)
      } else {
        this.dialog = true
        this.pay('WX')
        this.getPoints()
      }
    },
    close () {
      this.dialog = false
      this.order = {
        qrcode: ''
      }
      clearInterval(this.timer)
    },
    // 获取积分
    getPoints () {
      this.$http.get('/api/integralRecord/total').then((res) => {
        this.$store.commit('setPoints', res.data || 0)
      })
    },
    // 微信支付
    pay (e) {
      var ctx = this
      this.payment = e || this.payment
      let order = {
        priceItemIds: this.priceItemIdsSingle || this.$store.state.shop.priceItemIds,
        payType: this.payment,
        year: this.year || this.$store.state.shop.year,
        integral: this.points,
        orderType: this.homeInfo.priceItemIds ? 'UPDATE' : 'CUSTOM',
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
          ctx.$refs.toast.show('支付已完成')
          // 更新数据
          ctx.$store.dispatch('getHomeInfo')
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
    },
    // 找人代付
    onCopy (e) {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    anotherPay () {
      var ctx = this
      this.$store.commit('setLoading', true)
      this.$http.post('/api/order/getPayInfo?orderId=' + this.order.orderId).then((res) => {
        ctx.$store.commit('setLoading', false)
        ctx.order = res.data
      })
    },
    // 转账
    bankDialog () {
      this.$refs.bank.show()
    }
  }
}
</script>

<style lang="less">
#O_Pay {
  .hintTextClass{
    font-size: 12px;
  }
  .points {
    width: 132px;text-align: left;padding: 0 5px
  }
}
.pay-total {
  font-size: 16px;
  border-bottom: 1px dashed #dedddd;
  padding-top: 20px;
  margin-bottom: 20px;
  .fl {
    line-height: 45px;
    color: #000;
  }
  .fr {
    font-size: 12px;
    text-align: right;
  }
  .total {
    padding: 0 3px;
    color: red;
  }
}
.discount{
  font-size: 12px;color: #999
}
</style>
