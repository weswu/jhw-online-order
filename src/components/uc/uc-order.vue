<template>
  <div class="box">
    <div class="box-title data-feedback">消费记录</div>
    <div class="box-cont">
      <mu-list-item v-for="item in $store.state.homeInfo.orderList" :key="item.orderId" :title="'RMB ' + item.totalPrice"
       :describeText="item.addTime | time('yyyy/MM/dd hh:mm')" @click="open(item.orderId)">
        <mu-icon value="info" slot="right"/>
      </mu-list-item>
      <div v-if="$store.state.homeInfo.orderList.length === 0" class="data-empty">暂无数据</div>
    </div>
    <div class="box-foot">
      <router-link to="/order"><mu-flat-button label="查看更多记录" /></router-link>
    </div>
    <mu-dialog :open="dialog" @close="close">
      <div class="order-detail">
        <div class="order-detail-hd">
          <h2>订单基本信息</h2>
          <div class="detail-hd-item"><span>订单号</span><span>{{detail.orderId}}</span></div>
          <div class="detail-hd-item"><span>订单金额</span><span>RMB {{detail.totalPrice + detail.integral}}</span></div>
          <div class="detail-hd-item"><span>积分抵扣</span><span>{{detail.integral}}</span></div>
          <div class="detail-hd-item"><span>实际支付</span><span>RMB {{detail.totalPrice}}</span></div>
        </div>
        <div class="order-detail-bd">
          <h2>订单详细</h2>
          <div class="detail-bd-item" v-for="item in priceItemList" :key="item.orderNo">
            <span>{{item.name}}</span>
            <span>{{item.price}}</span>
          </div>
        </div>
      </div>
      <mu-flat-button slot="actions" @click="close" label="关闭" />
    </mu-dialog>
  </div>
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
  methods: {
    open (id) {
      this.$http.get('/api/order/orderHistoryDetail?orderId' + id).then((res) => {
        this.detail = res.data.detail
        this.priceItemList = res.data.priceItemList
      })
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
