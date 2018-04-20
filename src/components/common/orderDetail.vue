<template>
  <mu-dialog :open="dialog" @close="close">
    <div class="" style="height:48px;">
      <mu-icon-button icon="clear" @click="close" class="close"/>
    </div>
    <div id="A_Order_Detail">
      <mu-sub-header>
        订单编号：{{detail.outTradeNo}}
        <div class="examine" v-if="path === 'order' && (!detail.auditId || detail.auditId === 'notPass')" style="float: right;">
          <button type="button" name="button" @click="examine('auditPass')" style="background:#417505;color:#fff">审核通过</button>
          <button type="button" name="button" @click="examine('auditNotPass')" style="background:#d0021b;color:#fff;margin-right: 0;">审核不通过</button>
        </div>
        <div v-if="path === 'order' && detail.auditId" style="float: right;">
           <span v-if="detail.auditId !== 'notPass'" style="color:#417505">审核已通过</span>
        </div>
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
            <span v-if="!detail.agentId && !update1">
              <span v-if="detail.paymentType === 'UN_PAY'">待付款</span>
              <span v-else>线上订单</span>
            </span>
            <span v-if="detail.agentId && !update1">线下订单</span>

            <span v-if="path === 'order'">
              <mu-select-field v-model="detail.agentId" :labelFocusClass="['label-foucs']" class="update_select" v-if="update1">
                <mu-menu-item v-for="v,index in selecctList" :key="index" :value="v.value" :title="v.text" />
              </mu-select-field>

              <span class="update" @click="update1=true" v-if="updateD && !update1">修改</span>
              <span class="update" @click="update1=false" v-if="update1">确定</span>
            </span>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单创建时间：
            <span v-if="!update0">{{detail.addTime | time('yyyy-MM-dd hh:mm')}}</span>
            <mu-date-picker v-model="time" v-if="update0"/>
            <mu-time-picker hintText="24小时制" format="24hr" v-model="time24" v-if="update0"/>

            <span class="update" @click="update0=true" v-if="updateD && !update0">修改</span>
            <span class="update" @click="update" v-if="update0">确定</span>

          </mu-flexbox-item>
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
            <span class="price" v-if="!update2">￥{{detail.paidPrice}}</span>
            <input type="text" class="update_price" v-model="detail.paidPrice" v-if="update2">
            <span class="update" @click="update2=true" v-if="updateD && !update2">修改</span>
            <span class="update" @click="update2=false" v-if="update2">确定</span>
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

        <mu-flexbox class="first-flexbox bg">
          <mu-flexbox-item class="flex-demo">客户资料</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 客户账号：{{detail.username}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 客户公司全称：{{detail.userEntName}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="nobor">
          <mu-flexbox-item class="flex-demo"> 公司法人：{{detail.userLegalPre}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 法人手机号：{{detail.userCellphone}}</mu-flexbox-item>
        </mu-flexbox>

        <mu-flexbox class="first-flexbox bg">
          <mu-flexbox-item class="flex-demo">经销商详情</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 经销商支付金额：
            <span class="price" v-if="!update3">￥{{detail.agentPrice}}</span>
            <input type="text" class="update_price" v-model="detail.agentPrice" v-if="update3">
            <span class="update" @click="update3=true" v-if="updateD && !update3">修改</span>
            <span class="update" @click="update3=false" v-if="update3">确定</span>
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 订单创建公司：{{detail.agentEntName}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo"> 订单创建者姓名：{{detail.agentName}}</mu-flexbox-item>
          <mu-flexbox-item class="flex-demo"> 订单创建者手机号：{{detail.agentCellphone}}</mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo" style="height: auto;">
            <div style="width: 58px;float: left;">备注：</div>
            <div style="display: inline-block;width: 80%;float: left;text-indent: 0;line-height: 26px;padding: 5px 0;">
              <textarea v-model="detail.comment" v-if="path === 'agent'">{{detail.comment}}</textarea>
              <span v-if="path === 'order'">{{detail.comment}}</span>
            </div>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-content-block>
      <button v-if="path === 'order'" type="button" name="button" class="submit" @click="submit">提交</button>

      <button v-else-if="detail.auditId === 'notPass' || !detail.agentId" type="button" name="button" class="submit" @click="submit">提交</button>
      <button v-else-if="!detail.auditId && detail.agentId" type="button" name="button" class="submit" style="background: #aaa;">提交</button>
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
      updateD: true,
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
        if (res.code === 0) {
          ctx.detail = res.data
          ctx.time = ctx.format(this.detail.addTime)
          ctx.time24 = ctx.format2(this.detail.addTime)
          if (ctx.path === 'agent') {
            if (!(ctx.detail.auditId === 'notPass' || !ctx.detail.agentId)) {
              ctx.updateD = false
            } else {
              ctx.updateD = true
            }
          } else {
            ctx.updateD = true
          }
        } else {
          ctx.$parent.$parent.$refs.toast.show(res.msg)
        }
      })
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    examine (e) {
      let ctx = this
      if (e === 'auditNotPass') {
        this.detail.auditId = 'notPass'
      } else {
        this.detail.auditId = 'pass'
        this.detail.paymentType = 'PAID'
      }
      this.$http.post('/admin/order/' + e + '?orderId=' + this.detail.orderId).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$parent.$refs.toast.show('操作成功')
          ctx.$emit('edit', {orderId: ctx.detail.orderId, auditId: ctx.detail.auditId, paymentType: ctx.detail.paymentType})
          this.dialog = false
        } else {
          ctx.$parent.$parent.$refs.toast.show(res.msg)
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
    format2 (value) {
      var time = new Date(parseInt(value))
      return time.getHours() + ':' + time.getMinutes()
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
  textarea{
    width: 100%;
    border: 1px solid #e1e6eb;
    padding: 10px;line-height: 1.5;
    height: 80px;
    resize: none;
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
    .overflow{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #4a90e2;
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
  .nobor{
    border-bottom: none;
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
