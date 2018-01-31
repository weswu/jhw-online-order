<template>
  <div>
    <mu-dialog :open="dialog" @close="close">
      <div class="bank">
        <mu-row gutter class="bank-info">
          <mu-col width="20" tablet="20" desktop="20">
            <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/7bee21f41bd87aea35af25f084488a35_121_121.jpg" alt="">
          </mu-col>
          <mu-col width="80" tablet="80" desktop="80">
            开户行： <span>工商银行杭州开元支行</span><br/>
            账号： <span>1202021509900658919</span><br/>
            户名： <span>浙江机汇网络科技有限公司</span><br/>
            税号： <span>91330108396494480J</span>
          </mu-col>
        </mu-row>
        <div class="content">
          请您转账时在<span class="red">附加信息</span>中填写订单号： <span class="red">{{outTradeNo}}</span>，以便在您转账后我们可以及时处理您的订单。
          <p>您的手机号码：
            <mu-text-field hintText="手机号码" type="number" v-model.number="cellphone" min="0"/>订单处理后会通过短信通知您
           </p>
           <div class="tip">
             提示：您可以将账号信息拍照保存在手机中，以便转账时查看！
           </div>
        </div>
        <mu-raised-button @click="submit" label="确认订单" primary /> <span class="done" @click="notify">已经转账，提交转账回执单</span>
      </div>
      <mu-flat-button label="关闭" @click="close" slot="actions"/>
    </mu-dialog>
    <mu-dialog :open="dialog2" @close="close2">
      <a href="http://www.icbc.com.cn/icbc/" class="tcenter" target="_blank">去银行转账</a>
      <mu-flexbox :gutter="0">
        <mu-flexbox-item class="flex-demo flex-left">
          订单编号：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo flex-r">
          {{outTradeNo}}
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox :gutter="0">
        <mu-flexbox-item class="flex-demo flex-left">
          账号信息：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo flex-r">
            开户行： <span>工商银行杭州开元支行</span><br/>
            账号： <span>1202021509900658919</span><br/>
            户名： <span>浙江机汇网络科技有限公司</span>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox :gutter="0" class="flex3">
        <mu-flexbox-item class="flex-demo flex-left">
          提示信息：
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo flex-r">
          请您将本次订单需要支付的金额（￥380无）汇入上面账户中。<br/>
          请您转账时在 <span class="red">附加信息</span>中填写订单号： <span class="red">{{outTradeNo}}</span>
          （银行之间传输的附加信息只支持最多10个汉字，请勿添加其它信息以免被截断），以便在您转账后我们可以用时处理您的订单。
        </mu-flexbox-item>
      </mu-flexbox>
      <a href="javascript:;" class="tcenter" @click="back">返回并重新选择支付方式</a>
    </mu-dialog>
    <mu-dialog :open="dialog3" @close="close3">
      <mu-text-field hintText="请输入订单号" v-model="no"/><br/>
      <mu-raised-button @click="notifySubmit" label="确认" primary />
    </mu-dialog>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  props: ['outTradeNo', 'orderId'],
  data () {
    return {
      dialog: false,
      cellphone: '',
      dialog2: false,
      dialog3: false,
      no: ''
    }
  },
  methods: {
    show () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    submit () {
      var ctx = this
      let order = {
        orderId: this.orderId,
        cellphone: this.cellphone
      }
      if (!this.cellphone) { return window.alert('手机号不能为空') }
      this.$store.commit('setLoading', true)
      this.$http.post('/api/order/bankTransfer?' + qs.stringify(order)).then((res) => {
        if (res.msg === 'success') {
          ctx.$store.commit('setLoading', false)
          ctx.dialog2 = true
        } else {
          window.alert(res.msg)
        }
      })
    },
    notify () {
      this.dialog3 = true
    },
    close3 () {
      this.dialog3 = false
    },
    notifySubmit () {
      var ctx = this
      if (!this.no) { return window.alert('订单号不能为空') }
      this.$store.commit('setLoading', true)
      this.$http.post('/api/order/notifyBank?outTradeNo=' + this.no).then((res) => {
        if (res.msg === 'success') {
          ctx.$store.commit('setLoading', false)
          ctx.$parent.$refs.toast.show('提交成功')
          ctx.dialog3 = false
        } else {
          window.alert(res.msg)
        }
      })
    },
    close2 () {
      this.dialog2 = false
    },
    back () {
      this.dialog = false
      this.dialog2 = false
    }
  }
}
</script>

<style lang="less" scoped>
.bank{
  font-size: 14px;
  .bank-info{
    line-height: 1.7;
    img{
      width: 90px;
    }
    span{
      color: #000
    }
  }
  .content{
    padding: 20px 0;
    .red{
      color: red
    }
    .mu-text-field{width: 120px;margin-right: 30px}
    p{
      padding: 20px 0;
    }
    .tip{
      color:#999
    }
  }
  .done{
    text-decoration: underline;
    cursor: pointer;    margin-left: 10px;
  }
}
.mu-flexbox{
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  span{
    color: #000
  }
  .red{
    color: red
  }
}
.flex-demo {
  line-height: 1.8;
  padding: 7px;
  font-size: 14px;
}
.flex-left{
  width: 120px !important;
  flex: 0 1 auto !important;
  color: #000
}
.flex3{
  border-bottom: 1px solid #e0e0e0;
}
.flex-r{
  border-left: 1px solid #e0e0e0;
}
.tcenter{
  text-align: center;display: block;padding: 10px 0;
}
</style>
