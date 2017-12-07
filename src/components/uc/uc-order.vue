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
    <OrderDetail ref="OrderDetail"></OrderDetail>
  </div>
</template>

<script>
import OrderDetail from '@/components/OrderDetail'
export default {
  components: {
    OrderDetail
  },
  methods: {
    open (id) {
      this.$refs.OrderDetail.open(id)
    }
  }
}
</script>
