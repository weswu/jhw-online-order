<template>
  <div id="A_Order_Detail">
    <mu-sub-header>产品详情</mu-sub-header>
    <mu-content-block>
      <div class="order-state">
        状态：
        <span class="red" v-if="detail.paymentType === 'UN_PAY'">未支付</span>
        <span class="green" v-if="detail.paymentType === 'PAID'">已支付</span>
        <span v-if="detail.paymentType === 'PART_PAY'">部分支付</span>
      </div>
      <mu-flexbox class="first-flexbox bg">
        <mu-flexbox-item class="flex-demo">产品摘要</mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo"> 原价：<span class="price">￥{{detail.totalPrice}}</span></mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"> 应付金额： <span class="price">￥{{detail.paidPrice}}</span></mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo"> 数量：1</mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"> 使用年限：{{detail.year}}年</mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox class="nobor">
        <mu-flexbox-item class="flex-demo"> 购买时间：{{detail.addTime | time('yyyy-MM-dd hh:mm')}}</mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"> 到期时间：{{detail.endTime | time('yyyy-MM-dd hh:mm')}}</mu-flexbox-item>
      </mu-flexbox>

      <mu-flexbox class="first-flexbox bg">
        <mu-flexbox-item class="flex-demo">产品明细</mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo overflow"> {{detail.name}} </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"> 数量：1个 </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo"> 使用年限：1年 </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"> 原价：￥{{detail.paidPrice}}x1 </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item class="flex-demo"> 小计：{{detail.name}} </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo"></mu-flexbox-item>
      </mu-flexbox>
      <div v-if="detail.year>1">
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 网站续费 </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 数量：1个 </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 使用年限：{{detail.year-1}}年 </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 原价：￥{{detail.paidPrice}}x{{detail.year-1}} </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox :class="{nobor:detail.year===1}">
          <mu-flexbox-item class="flex-demo"> 小计：{{detail.paidPrice}} </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"></mu-flexbox-item>
        </mu-flexbox>
      </div>
    </mu-content-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.detail.orderId = this.$route.params.id || '297e266962d19eed0162d1a391fd0003'
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/admin/order/order/detail?orderId=' + this.detail.orderId).then((res) => {
        if (res.code === 0) {
          ctx.detail = res.data
        } else {
          ctx.$parent.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
