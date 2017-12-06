<template>
  <div class="">
    <mu-row gutter class="service-banner">
      <mu-col width="100" tablet="50" desktop="33" v-for="(item, index) in list" :key="index">
        <div class="service-logo" @click="openPaid"><img :src="'/static/' + item.pic + '.png'"></div>
        <div class="service-cont" @click="openPaid">
          <h3>{{item.name}}</h3>
          <p>{{item.desc}}</p>
        </div>
      </mu-col>
      <mu-col width="0" desktop="33" style="opacity: 0"></mu-col>
    </mu-row>

    <mu-dialog :open="paidDialog" @close="closePaid" title="购买" scrollable>
      <div class="dialog_bd">
        <div class="point">
          <p><mu-checkbox @change="showPoint = !showPoint" label="使用积分抵扣" class="demo-checkbox" /></p>
          <mu-text-field v-if="showPoint" type="number" hintText="提示文字" @input="checkPoint" :errorText="errorText" label="可用积分" v-model.number="points" />
        </div>
        <div class="order-price">
          <div class="order-price-item">
            <div class="order-price-item_hd">订单金额</div>
            <div class="order-price-item_ft">RMB 600</div>
          </div>
          <div class="order-price-item">
            <div class="order-price-item_hd">积分抵扣</div>
            <div class="order-price-item_ft">- RMB 100</div>
          </div>
        </div>
        <div class="order-price order-price-total">
          <div class="order-price-item">
            <div class="order-price-item_hd">共需支付</div>
            <div class="order-price-item_ft">RMB 500</div>
          </div>
        </div>
        <div class="payment">
          <mu-raised-button class="wexinpay" label="微信支付" @click="payment = 1">
            <i class="mu-icon iconfont icon-pay-wechat" style="font-size:24px;"></i>
          </mu-raised-button>
          <mu-raised-button class="alipay" label="支付宝支付" @click="payment = 2">
            <i class="mu-icon iconfont icon-umidd17" style="font-size:24px;"></i>
          </mu-raised-button>
        </div>
        <div class="payment-code" v-if="payment === 1">
          <div class="payment-code-wrap" @click="toPaid">
            <img src="data:image/png;base64,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" alt="">
            <div class="payment-code-tip">手机微信扫码支付</div>
          </div>
        </div>
        <div class="payment-code" v-if="payment === 2">
          <div class="payment-code-wrap" @click="toPaid">
            <img src="data:image/png;base64,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" alt="">
            <div class="payment-code-tip">手机支付宝扫码支付</div>
          </div>
        </div>
      </div>
      <mu-flat-button label="返回" @click="closePaid" slot="actions" />
    </mu-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      payment: 0,
      showPoint: false,
      points: 0,
      errorText: '',
      paidDialog: false,
      list: [
        { name: '小程序', desc: '小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。', pic: 'wxa' },
        { name: '手机网站', desc: '专门为手机进行优化的网站，更为方便用户浏览。', pic: 'website' },
        { name: '微网站', desc: '通过微信网页的方式进行表现，使信息的展现更加赏心悦目，进一步提高用户体验。', pic: 'wx' },
        { name: '微传单', desc: '无需会写代码，极速创建H5微传单，轻松在线制作微海报、H5场景、电子邀请函。', pic: 'wcd' },
        { name: '多语言', desc: '让使用不同语言的用户都能够从同个网站获得内容相同的信息。', pic: 'lang' }
      ]
    }
  },
  methods: {
    openPaid () {
      console.log(1)
      this.paidDialog = true
    },
    closePaid () {
      this.paidDialog = false
    },
    toPaid () {
      this.$router.push({ name: 'paid' })
    },
    checkPoint () {
      if (this.points > 100) {
        console.log('big')
        this.errorText = '您的可用积分为100'
        this.points = 100
      } else {
        this.errorText = ''
        console.log('small')
      }
    }
  }
}
</script>
