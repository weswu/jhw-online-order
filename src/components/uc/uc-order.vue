<template lang="html">
  <div class="box">
    <div class="box-title data-feedback">消费记录</div>
    <div class="box-cont">
      <mu-list-item v-for="item in orderList" :key="item.orderNo" :title="'RMB ' + item.total" :describeText="item.orderDate" @click="open">
        <mu-icon value="info" slot="right"/>
      </mu-list-item>
    </div>
    <div class="box-foot">
      <mu-flat-button label="查看更多记录" />
    </div>
    <mu-dialog :open="dialog" @close="close">
      <div class="order-detail">
        <div class="order-detail-hd">
          <h2>订单基本信息</h2>
          <div class="detail-hd-item"><span>订单号</span><span>{{orderDetail.orderNo}}</span></div>
          <div class="detail-hd-item"><span>订单金额</span><span>RMB {{orderDetail.total}}</span></div>
          <div class="detail-hd-item"><span>积分抵扣</span><span>{{orderDetail.points}}</span></div>
          <div class="detail-hd-item"><span>实际支付</span><span>RMB {{orderDetail.paid}}</span></div>
        </div>
        <div class="order-detail-bd">
          <h2>订单详细</h2>
          <div class="detail-bd-item" v-for="item in orderDetail.detail" :key="item.orderNo">
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
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style lang="css">
</style>
