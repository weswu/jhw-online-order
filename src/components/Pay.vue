<template>
  <div>
    <mu-dialog :open="dialog" @close="close" :title="title" dialogClass="dialogPay">
      <div id="O_Pay">
        <mu-row gutter class="pay-total">
          <mu-col width="100" tablet="66" desktop="66" class="fl" v-if="!another">
            <span v-if="order.outTradeNo" style="margin-right:10px;">订单号：{{order.outTradeNo}}</span> 支付金额：<span class="total">{{money}} </span>
            <span class="discount" v-if="isOutPoint"><span style="text-decoration: line-through;">{{totalPrice}}</span> (积分- {{points/10}})</span>
            <span class="discount" v-if="isOutDiscount">原价<span style="text-decoration: line-through;">{{totalPrice}}</span> (优惠-99)元</span>
            <span class="discount" v-if="homeInfo.isDiscount && !isOutDiscount">(亲，还差{{1000 - money}}元即可享受99优惠哦)</span>
          </mu-col>
          <mu-col width="100" tablet="66" desktop="66" class="fl" v-if="another">
            <span v-if="order.outTradeNo" style="margin-right:10px;">订单号：{{order.outTradeNo}}</span> 支付金额：<span class="total">{{order.totalPrice}} 元</span>
          </mu-col>
          <mu-col width="100" tablet="34" desktop="34" class="fr" v-if="!another">
            积分抵扣:
            <mu-text-field :hintText="'可用积分 '+$store.state.points" hintTextClass="hintTextClass" type="number" class="points"
               @change="pointChange" @input="checkPoint" :errorText="errorText" v-model.number="points" min="0" :max="$store.state.points"/>
          </mu-col>
        </mu-row>
        <Order ref="order" :points="points" @on-change="orderChange"/>
      </div>
      <mu-flat-button label="关闭" @click="close" slot="actions"/>
    </mu-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Order from '@/components/pay/Order'
export default {
  props: ['title'],
  components: {
    Order
  },
  data () {
    return {
      points: '',
      errorText: '',
      dialog: false,
      order: {},
      another: false
    }
  },
  computed: {
    ...mapGetters('shop', ['totalPrice', 'priceItemIds']),
    ...mapState(['user', 'homeInfo']),
    money () {
      var money = this.totalPrice
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
    open (id) {
      if (id === 'another') {
        this.dialog = true
        this.another = true
        return
      }
      if (!this.user.username) {
        this.$store.dispatch('getUser', this.$parent.$parent.$refs.iframe || this.$parent.$parent.$parent.$refs.iframe || this.$parent.$parent.$parent.$parent.$parent.$refs.iframe)
      } else {
        this.dialog = true
        this.getPoints()
      }
    },
    close () {
      this.dialog = false
      this.order = {}
      clearInterval(this.timer)
      if (window.opener) {
        window.close()
      }
    },
    orderChange (order) {
      this.order = order
    },
    // 积分处理
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
    pointChange () {
      if (!this.order.qrcode) {
        this.$refs.order.pay()
      }
    },
    // 获取积分
    getPoints () {
      this.$http.get('/api/integralRecord/total').then((res) => {
        this.$store.commit('setPoints', res.data || 0)
      })
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
.people{
  .pay-code-cont{
    background: #2e363e;
  }
  img{
    border: 1px solid #2e363e;
  }
}
.bank{
  .pay-code-cont{
    background: #733594;
  }
  img{
    border: 1px solid #733594;
  }
}
.dialogPay{
  width: 85%;max-width: 800px;
}
</style>
