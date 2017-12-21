<template>
  <div>
    <mu-dialog :open="dialog" @close="close" :title="title" scrollable>
      <div id="O_Pay">
        <mu-row gutter class="pay-total">
          <mu-col width="50" tablet="50" desktop="50" class="fl">
            支付金额：<span class="total">{{(totalPriceSingle || totalPrice) - points/10}} 元</span><span v-if="points>0">(- {{points/10}})</span>
          </mu-col>
          <mu-col width="50" tablet="50" desktop="50" class="fr">
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
                <div class="text">请使用微信扫一扫<br>扫描二维码支付</div>
              </div>
            </div>
          </mu-flexbox-item>
          <mu-flexbox-item>
          </mu-flexbox-item>
        </mu-flexbox>

      </div>
      <mu-flat-button label="返回" @click="close" slot="actions"/>
    </mu-dialog>
    <!--消息...-->
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast'
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  components: {
    Toast
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
      }
    }
  },
  computed: {
    ...mapGetters('shop', ['totalPrice', 'priceItemIds']),
    user () {
      return this.$store.state.user
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
    openDialog () {
      if (!this.user.username) {
        this.$store.dispatch('getUser', this.$parent.$parent.$refs.iframe)
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
      var ctx = this
      if (this.$store.state.points !== 0) {
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
.pay-code {
  position: relative;
  width: 180px;
  margin: 0 auto;
  &:after {
    content: '';
    height: 150px;
    position: absolute;
    right: 0;
    top: 15px;
    background: #fff;
    width: 1px;
  }
  &:before {
    content: '';
    height: 150px;
    position: absolute;
    left: 0;
    top: 15px;
    background: #fff;
    width: 1px;
  }
  p {
    padding-bottom: 5px;
    &:after {
      content: '';
      height: 1px;
      position: absolute;
      right: 15px;
      top: 0;
      background: #fff;
      width: 150px;
    }
    &:before {
      content: '';
      height: 1px;
      position: absolute;
      right: 15px;
      top: 179px;
      background: #fff;
      width: 150px;
    }
  }
  img {
    border: 1px solid #00c901;
    padding: 5px;
    width: 180px;
  }
  .pay-code-cont{
    background: #00c901;
    color: #fff;
    height: 46px;
    i {
      width: 46px;
      height: 46px;
      line-height: 46px;
      float: left;
      text-align: center;
    }
    .text{
      float: left;
      font-size: 12px;
      padding-top: 5px;
    }
  }
}
</style>
