<template>
  <mu-dialog :open="dialog" @close="close">
    <div class="" style="height:48px;">
      <mu-icon-button icon="clear" @click="close" class="close_right"/>
    </div>
    <div id="A_Order_Detail">
      <mu-sub-header>
        订单编号：{{detail.outTradeNo}}
      </mu-sub-header>
      <mu-content-block>
        <div class="order-state">
          订单状态：
          <span class="red" v-if="detail.paymentType === 'UN_PAY'">未支付</span>
          <span class="green" v-if="detail.paymentType === 'PAID'">已支付</span>
          <span v-if="detail.paymentType === 'PART_PAY'">部分支付</span>
        </div>
        <mu-flexbox class="first-flexbox bg">
          <mu-flexbox-item class="flex-demo">订单摘要</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单编号：{{detail.outTradeNo}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 标记：
            <span v-if="!detail.agentId">
              <span v-if="detail.paymentType === 'UN_PAY'">待付款</span>
              <span v-else>线上订单</span>
            </span>
            <span v-if="detail.agentId">线下订单</span>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单创建时间：{{detail.addTime | time('yyyy-MM-dd hh:mm')}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 使用年限：{{detail.year}}年</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 到期时间：{{detail.endTime | time('yyyy-MM-dd hh:mm')}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 支付来源：
            <span v-if="detail.payType === 'WX'">微信支付</span>
            <span v-else-if="detail.payType === 'ALI'">支付宝支付</span>
            <span v-else-if="detail.payType === 'BANK'">银行卡支付</span>
            <span v-else-if="detail.payType === 'PFA'">代付</span>
            <span v-else-if="detail.payType === 'OFFLINE'">线下支付</span>
            <span v-else>-</span>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="nobor">
          <mu-flexbox-item class="flex-demo"> 总计：<span class="price">￥{{detail.totalPrice}}</span></mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 客户应付金额：
            <span class="price">￥{{detail.paidPrice}}</span>
          </mu-flexbox-item>
        </mu-flexbox>

        <mu-flexbox class="first-flexbox bg">
          <mu-flexbox-item class="flex-demo">订单明细</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo overflow"> {{detail.name}} </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 数量：1个 </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 使用年限：1年 </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 原价：￥{{detail.paidPrice}}x1 </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox :class="{nobor:detail.year===1}">
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
          <mu-flexbox class="nobor">
            <mu-flexbox-item class="flex-demo"> 小计：{{detail.paidPrice}} </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo"></mu-flexbox-item>
          </mu-flexbox>
        </div>
      </mu-content-block>
    </div>
  </mu-dialog>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      detail: {},
      dialog: true
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
    },
    close () {
      this.dialog = false
    },
    submit () {
      let ctx = this
      var data = {
        orderId: this.detail.orderId,
        addTime: this.detail.addTime,
        agentId: this.detail.agentId,
        paidPrice: this.detail.paidPrice,
        agentPrice: this.detail.agentPrice
      }
      // 经销商提交后会变成线下订单
      if (this.path === 'agent') {
        data.agentId = 'offline'
        data.comment = this.detail.comment
      }
      this.$http.post('/admin/' + this.path + '/order/submit?' + qs.stringify(data)).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$parent.$refs.toast.show('提交成功')
          ctx.$emit('edit', data)
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
