<template>
  <mu-dialog :open="dialog" @close="close">
    <div class="" style="height:48px;">
      <mu-icon-button icon="clear" @click="close" class="close"/>
    </div>
    <div id="A_Order_Detail">
      <mu-sub-header>
        订单编号：{{detail.outTradeNo}}
        <div class="examine" v-if="path === 'admin' && !detail.auditId" style="float: right;">
          <button type="button" name="button" @click="examine('auditPass')" style="background:#417505;color:#fff">审核通过</button>
          <button type="button" name="button" @click="examine('auditNotPass')" style="background:#d0021b;color:#fff">审核不通过</button>
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
            <span v-if="!update0">{{detail.addTime | time('yyyy-MM-dd hh:mm')}}</span>
            <mu-date-picker v-model="time" v-if="update0"/>
            <mu-time-picker hintText="24小时制" format="24hr" v-model="time24" v-if="update0"/>

            <span class="update" @click="update0=true" v-if="!update0">修改</span>
            <span class="update" @click="update" v-if="update0">确定</span>

          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 标记：
            <span v-if="!detail.agentId && !update1">线上订单</span>
            <span v-if="detail.agentId && !update1">线下订单</span>

            <mu-select-field v-model="detail.agentId" :labelFocusClass="['label-foucs']" class="update_select" v-if="update1">
              <mu-menu-item v-for="v,index in selecctList" :key="index" :value="v.value" :title="v.text" />
            </mu-select-field>

            <span class="update" @click="update1=true" v-if="!update1">修改</span>
            <span class="update" @click="update1=false" v-if="update1">确定</span>

          </mu-flexbox-item>
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
          <mu-flexbox-item class="flex-demo"> 客户应付金额：
            <span class="price" v-if="!update2">￥{{detail.paidPrice}}</span>
            <input type="text" class="update_price" v-model="detail.paidPrice" v-if="update2">
            <span class="update" @click="update2=true" v-if="!update2">修改</span>
            <span class="update" @click="update2=false" v-if="update2">确定</span>
          </mu-flexbox-item>
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
          <mu-flexbox-item class="flex-demo"> 经销商支付金额：
            <span class="price" v-if="!update3">￥{{detail.agentPrice}}</span>
            <input type="text" class="update_price" v-model="detail.agentPrice" v-if="update3">
            <span class="update" @click="update3=true" v-if="!update3">修改</span>
            <span class="update" @click="update3=false" v-if="update3">确定</span>
          </mu-flexbox-item>
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
      detail: {},
      selecctList: [
        {text: '线上订单', value: ''},
        {text: '线下订单', value: 'offline'}
      ],
      dialog: false,
      path: '',
      update0: false,
      update1: false,
      update2: false,
      update3: false,
      time: '',
      time24: ''
    }
  },
  methods: {
    open (id) {
      var ctx = this
      this.path = this.$route.path.split('/')[2]
      this.$http.get('/admin/' + this.path + '/order/detail?orderId=' + id).then((res) => {
        ctx.detail = res.data
        ctx.time = this.format(this.detail.addTime)
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
    update () {
      this.detail.addTime = new Date(this.time + ' ' + this.time24).getTime()
      this.update0 = false
    },
    format (value) {
      var time = new Date(parseInt(value))
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0 (m) {
      return m < 10 ? '0' + m : m
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
      this.$http.post('/admin/' + this.path + '/order/submit?' + qs.stringify(data)).then((res) => {
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
    border: none;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
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
  .update_price{
    border: none;
    border-bottom: 1px solid #ddd;
    height: 28px;
    width: 60px;
    padding: 0 5px;
  }
  .update_select{
    width: 130px; min-height: 28px; vertical-align: top;
    .mu-text-field-content{
      padding-top: 0;
    }
    .mu-dropDown-menu{
      height: 32px;font-size: 12px;
    }
  }
  .mu-date-picker{
    text-indent: 0;
    width: 70px;
    .mu-text-field{
      width: 70px;
      min-height: 28px;
      font-size: 12px;
    }
  }
  .mu-time-picker{
    text-indent: 0;
    width: 50px;
    .mu-text-field{
      width: 50px;
      min-height: 28px;
      font-size: 12px;
    }
    .mu-text-field-input{
      color: #000;
    }
  }
}
</style>
