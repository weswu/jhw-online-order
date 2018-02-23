<template>
  <mu-dialog :open="dialog" @close="close">
    <div class="order-detail">
      <div class="order-detail-hd">
        <h2>订单基本信息</h2>
        <div class="detail-hd-item"><span>订单号</span><span>{{detail.outTradeNo}}</span></div>
        <div class="detail-hd-item"><span>订单金额</span><span>RMB {{detail.totalPrice + detail.integral}}</span></div>
        <div class="detail-hd-item"><span>积分抵扣</span><span>{{detail.integral}}</span></div>
        <div class="detail-hd-item"><span>实际支付</span><span>RMB {{detail.totalPrice}}</span></div>
      </div>
      <div class="order-detail-bd">
        <h2>订单详细</h2>
        <div class="detail-free-product" v-if="$store.state.homeInfo.priceItemIds">
          <span v-for="(item,index) in list" :key="index">{{item.name}}</span>
        </div><br/>
        <div class="detail-bd-item" v-for="(item,index) in priceItemList" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.price}}</span>
        </div>
      </div>
    </div>
    <mu-flat-button slot="actions" @click="close" label="关闭" />
  </mu-dialog>
</template>

<script>
export default {
  data () {
    return {
      detail: {},
      priceItemList: [],
      dialog: false
    }
  },
  computed: {
    list () {
      return this.$store.state.shop.shopFunction[0].groups[0].items
    }
  },
  methods: {
    open (id) {
      var ctx = this
      this.$http.get('/api/order/orderHistoryDetail?orderId=' + id).then((res) => {
        ctx.detail = res.data.order
        ctx.priceItemList = res.data.priceItemList
      })
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style>
.detail-free-product span{
  padding-right: 10px;display: inline-block;
}
.order-detail-hd,
.order-detail-bd {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.order-detail-hd h2,
.order-detail-bd h2 {
  color: #000;
  padding-bottom: 5px;
}

.detail-hd-item,
.detail-bd-item {
  display: flex;
  justify-content: space-between;
}
</style>
