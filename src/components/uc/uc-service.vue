<template>
  <div class="">
    <mu-row gutter class="service-banner">
      <mu-col width="100" tablet="50" desktop="33" v-for="(item, index) in list" :key="index">
        <div class="service-logo" @click="openPaid(item)"><img :src="'/static/' + item.pic + '.png'"></div>
        <div class="service-cont" @click="openPaid(item)">
          <h3>{{item.name}}<span v-html="state(item.id)"></span></h3>
          <p>{{item.desc}}</p>
        </div>
      </mu-col>
      <mu-col width="0" desktop="33" style="opacity: 0"></mu-col>
    </mu-row>
    <mu-dialog :open="paidDialog" @close="closePaid" title="购买" scrollable>
      <div class="dialog_bd">
        <div class="point">
          <p><mu-checkbox @change="showPoint = !showPoint" label="使用积分抵扣" class="demo-checkbox" /></p>
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
        </div>
        <div class="payment-code" v-if="payment === 'WX' && order.qrcode !== ''">
          <div class="payment-code-wrap">
            <img v-lazy="'http://qr.liantu.com/api.php?w=272&text='+order.qrcode">
            <div class="payment-code-tip">手机微信扫码支付</div>
          </div>
        </div>
      </div>
      <mu-flat-button label="返回" @click="closePaid" slot="actions" />
    </mu-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
      payment: 'wx',
      showPoint: false,
      points: 0,
      errorText: '',
      paidDialog: false,
      list: [
        { id: '297e2669600191860160021f845900a7', price: 1500, name: '小程序', desc: '小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。', pic: 'wxa' },
        { id: '297e2669600191860160021fada500aa', price: 0, name: '手机网站', desc: '专门为手机进行优化的网站，更为方便用户浏览。', pic: 'website' },
        { id: '297e2669600191860160021fe16100ac', price: 1500, name: '微网站', desc: '通过微信网页的方式进行表现，使信息的展现更加赏心悦目，进一步提高用户体验。', pic: 'wx' },
        { id: '297e26696001918601600220127d00af', price: 0, name: '微传单', desc: '无需会写代码，极速创建H5微传单，轻松在线制作微海报、H5场景、电子邀请函。', pic: 'wcd' },
        { id: '297e26696001918601600220721b00b4', price: 0, name: '多语言', desc: '让使用不同语言的用户都能够从同个网站获得内容相同的信息。', pic: 'lang' }
      ],
      priceItemIds: '',
      totalPrice: 0,
      order: {
        qrcode: ''
      }
    }
  },
  computed: {
    ...mapState({
      homeInfo: state => state.homeInfo
    })
  },
  methods: {
    openPaid (item) {
      var ctx = this
      if (this.$store.state.user.name) {
        this.$http.get('/api/user/info').then((res) => {
          if (res.data) {
            ctx.paidDialog = true
            ctx.$store.commit('setUser', res.data.data)
          } else {
            ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url)
            ctx.$parent.$refs.iframe.open()
          }
        })
      } else {
        this.paidDialog = true
        // 获取积分
        if (this.$store.state.points === 0) {
          this.$http.get('/api/integralRecord/total').then((res) => {
            ctx.$store.commit('setPoints', res.data || 0)
          })
        }
      }
      this.priceItemIds = item.id
      this.totalPrice = item.price
    },
    closePaid () {
      this.paidDialog = false
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
    state (v) {
      if (this.homeInfo.priceItemIds && this.homeInfo.priceItemIds.match(new RegExp(v))) { return '已购买' }
    },
    // 微信支付
    pay (e) {
      var ctx = this
      this.payment = e
      let order = {
        priceItemIds: this.priceItemIds,
        payType: this.payment,
        year: 1,
        integral: this.points,
        orderType: 'UPDATE'
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
          ctx.$router.push({ name: 'paid', params: {orderId: this.order.outTradeNo, totalPrice: this.order.totalPrice} })
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
