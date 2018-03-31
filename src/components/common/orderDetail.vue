<template>
  <mu-dialog :open="dialog" @close="close">
    <div class="" style="height:48px;">
      <mu-icon-button icon="clear" @click="close" class="close"/>
    </div>
    <div id="A_Order_Detail">
      <mu-sub-header>
        订单编号：{{detail.outTradeNo}}
        <div class="" v-if="path === 'admin' && !detail.auditId">
          <button type="button" name="button" @click="examine('auditPass')">审核通过</button>
          <button type="button" name="button" @click="examine('auditNotPass')">审核不通过</button>
        </div>
      </mu-sub-header>
      <mu-content-block>
        <div class="order-state">
          订单状态：
          <span class="red" v-if="detail.paymentType === 'UN_PAY'">未支付</span>
          <span class="green" v-if="detail.paymentType !== 'UN_PAY'">已支付</span>
        </div>
        <mu-flexbox class="first-flexbox bg">
          <mu-flexbox-item class="flex-demo">订单摘要</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单编号：{{detail.outTradeNo}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 产品名称：{{detail.name}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单创建时间：
            {{detail.addTime | time('yyyy-MM-dd hh:mm:ss')}}<span class="update">修改</span>
            <mu-date-picker hintText="证件有效期" v-model="detail.addTime"/>
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 标记：
            <span class="red" v-if="!detail.agentId">线上订单</span>
            <span class="green" v-if="detail.agentId">线下订单</span>
            <span class="update">修改</span></mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 支付状态：
            <span class="red" v-if="detail.paymentType === 'UN_PAY'">未支付</span>
            <span class="green" v-if="detail.paymentType !== 'UN_PAY'">已支付</span>
          </mu-flexbox-item>
        </mu-flexbox>

        <mu-flexbox class="bg">
          <mu-flexbox-item class="flex-demo">产品名称：{{detail.name}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 原价：<span class="price">￥{{detail.totalPrice}}</span></mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 客户应付金额：<span class="price">￥{{detail.paidPrice}}</span><span class="update">修改</span></mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 客户账号：{{detail.username}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 客户公司全称：{{detail.userEntName}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 公司法人：{{detail.userLegalPre}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 法人手机号：{{detail.userCellphone}}</mu-flexbox-item>
        </mu-flexbox>

        <mu-flexbox class="bg">
          <mu-flexbox-item class="flex-demo">经销商详情</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 经销商支付金额：<span class="price">￥{{detail.agentPrice}}</span><span class="update">修改</span> </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 订单创建公司：{{detail.agentEntName}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单创建者姓名：{{detail.agentName}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 订单创建者手机号：{{detail.agentCellphone}}</mu-flexbox-item>
        </mu-flexbox>
      </mu-content-block>
      <button type="button" name="button" class="submit" @click="submit">提交</button>
    </div>
  </mu-dialog>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      detail: {
        'addTime': '1522486969560',
        'agentCellphone': 'string',
        'agentEntName': 'string',
        'agentId': 'string',
        'agentName': 'string',
        'agentPrice': 0,
        'name': 'string',
        'orderId': 'string',
        'outTradeNo': 'string',
        'paidPrice': 0,
        'paymentType': 'UN_PAY',
        'totalPrice': 0,
        'userCellphone': 'string',
        'userEntName': 'string',
        'userLegalPre': 'string',
        'username': 'string'
      },
      dialog: false,
      path: ''
    }
  },
  methods: {
    open (id) {
      var ctx = this
      var url = ''
      this.path = this.$route.path.split('/')[1]
      if (this.path === 'agent') {
        url = 'agent'
      } else if (this.path === 'admin') {
        url = 'order'
      }
      this.$http.get('/admin/' + url + '/order/detail?orderId=' + id).then((res) => {
        ctx.detail = res.data.order
      })
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    examine (e) {
      let ctx = this
      this.$http.post('/admin/order/' + e).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$refs.toast.show('操作成功')
          ctx.$emit('edit', {orderId: this.detail.orderId, auditId: '01'})
          this.dialog = false
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    },
    submit () {
      let ctx = this
      var url = ''
      if (this.path === 'agent') {
        url = 'agent'
      } else if (this.path === 'admin') {
        url = 'order'
      }
      var data = {
        orderId: this.detail.orderId,
        addTime: this.detail.addTime,
        agentId: this.detail.agentId,
        paidPrice: this.detail.paidPrice,
        agentPrice: this.detail.agentPrice
      }
      this.$http.post('/admin/' + url + '/order/submit?' + qs.stringify(data)).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$parent.$refs.toast.show('提交成功')
          ctx.$emit('edit', data)
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.order_detail{

}
.close{
  float:right;
}
#A_Order_Detail{
  position: relative;
  color: #595959;
  font-size: 12px;
  padding: 0 10px;
  .mu-content-block{
    padding: 0;
  }
  .update{
    color:#2549a6;
    cursor: pointer;
    margin-left: 10px;
  }
  .price{
    color: #ff8938
  }
  .red{
    color: #d7253b;
  }
  .green{
    color: #45780a
  }
  button{
    background: #f7f7f7;
    border: 1px solid #e9e9e9;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    color: #333;
    margin-right: 10px;
    cursor: pointer;
  }
  .submit{
    background: #008fc5;
    color: #fff;
    width: 60px;
    margin-top: 18px;
    margin-bottom: 20px;
  }
  .mu-sub-header{
    position: relative;
    color: #5d5d5d;
    &::after{
      width: 2px;
      height: 17px;
      background: #12bedb;
      content: '';
      position: absolute;
      left: 0;
      top: 14px;
    }
  }
  .mu-flexbox{
    border: 1px solid #e1e6eb;
    border-top: 0;
    .mu-flexbox-item{
      border-left: 1px solid #e1e6eb;
      height: 38px;
      line-height: 38px;
      text-indent: 15px;
    }
    .mu-flexbox-item:first-child {
      border-left: none;
    }
  }
  .first-flexbox{
    border-top: 1px solid #e1e6eb;
    border-left: 2px solid #777788;
  }
  .bg{
    background: #f4f5f9;
    font-size: 13px;
  }
  .order-state{
    background: #f9f9f9;
    padding: 10px 15px;
    border: 1px solid #ddd;
    margin-bottom: 13px;
    margin-top: 3px;
  }
}
</style>
