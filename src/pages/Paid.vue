<template>
  <div id="paid">
    <div class="container">
      <div class="login">
        <form class="login-bd">
          <h1>支付成功</h1>
          <div v-for="item in paymentDetail" :key="item.title" class="payment-detail">
            <p><span>{{item.title}}</span><span>{{item.desc}}</span></p>
          </div>
          <div class="login-ft">
            <mu-raised-button @click="toUc" label="前往管理中心" primary />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      paymentDetail: [
        {
          title: '第三方订单号',
          desc: 'wx201711071615032345'
        },
        {
          title: '支付金额',
          desc: 'RMB 0'
        },
        {
          title: '支付方式',
          desc: '微信支付'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('shop', ['year', 'totalPrice', 'shopFunction', 'orderDetail'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.outTradeNo) {
        vm.paymentDetail[0].desc = vm.$route.params.outTradeNo
        vm.paymentDetail[1].desc = 'RMB ' + vm.$route.params.totalPrice
      }
    })
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    toUc () {
      location.href = 'http://www.jihui88.com/manage_v4/index.html'
    }
  }
}
</script>

<style>
#paid .order-title {
  font-weight: bold;
}
#paid .order-group-title {
  color: #9b9b9b;
}
#paid .login-bd li,
#paid .login-bd p {
  line-height: 2;
}
#paid .login-bd li:first-child {
  padding-left: 0;
}
#paid .login-bd p {
  display: flex;
  justify-content: space-between;
}
#paid .payment-detail {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}
#paid .login-ft {
  margin-top: 30px;
}
</style>
