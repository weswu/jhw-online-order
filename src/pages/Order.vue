<template>
  <div id="login">
    <PageHeader activeName="shop"></PageHeader>
    <div class="container">
      <div class="login">
        <form class="login-bd">
          <h1>订单明细</h1>
          <div v-for="(row, index) in orderDetail" :key="row.title" class="order-detail">
            <ul>
              <li class="order-title">{{row.title}}</li>
              <li v-for="group in row.groups" :key="group.title">
                <span class="order-group-title">{{group.title}}</span>
                <p v-for="item in group.items" :key="item.title">
                  <span>{{item.title}}</span><span>{{item.price}}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="point">
              <mu-checkbox label="使用积分抵扣" class="demo-checkbox" /><br>
              <mu-text-field hintText="提示文字" />
            </div>
          <div class="order-price">共需支付：<span>RMB {{totalPrice * year}}</span>RMB {{totalPrice * 0.5 * year}}</div>
          <mu-text-field label="手机号码" hintText="客服需要通过手机联系您确认订单" v-model="mobileNumb" @change="mobileNumbInput" :errorText="mobileNumbError" fullWidth />
          <div class="login-ft">
            <p>
              <mu-raised-button @click="submit" label="提交订单" type="submit" primary />
            </p>
            <mu-flat-button @click="toShop" label="返回购买" />
          </div>
        </form>
      </div>
    </div>
    <mu-dialog :open="dialog" title="Alert Dialog">
      只有点击确定按钮才可以关闭对话框
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import PageHeader from '@/components/Header'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      dialog: false,
      mobileNumb: '',
      mobileNumbError: '',
      password: '',
      passwordError: '',
      isError: true,
      activeTab: 'tab1'
    }
  },
  computed: {
    ...mapGetters('shop', ['year', 'totalPrice', 'shopFunction', 'orderDetail'])
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    submit (e) {
      e.preventDefault()
      this.mobileNumbInput()
      if (!this.isError) {
        console.log('submit')
        // this.$router.push({ name: 'shop' })
        // axios.defaults
        // axios.post('')
        let that = this
        let APP_ID = 'z1kI3akODp2P2NmOGyHOGO0v-9Nh9j0Va'
        let APP_KEY = 'cJTfWb0wcUaOol3eTsh4jjFS'
        let AV = window.AV
        AV.init({
          appId: APP_ID,
          appKey: APP_KEY
        })
        let TodoFolder = AV.Object.extend('orders')
        var todoFolder = new TodoFolder()
        todoFolder.set('mobile', this.mobileNumb)
        todoFolder.set('order_detail', JSON.stringify(this.orderDetail))
        todoFolder.set('total_price', this.totalPrice * 0.5 * this.year)
        todoFolder.save().then(function (todo) {
          console.log('objectId is ' + todo.id)
          that.dialog = true
        }, function (error) {
          console.error(error)
        })
      }
    },
    close () {
      this.$router.push({ name: 'shop' })
    },
    mobileNumbInput () {
      if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobileNumb))) {
        this.mobileNumbError = '11位数字，仅限中国大陆手机号码'
        this.isError = true
      } else {
        this.mobileNumbError = ''
        this.isError = false
      }
    },
    toShop () {
      this.$router.push({ name: 'shop' })
    }
  }
}
</script>

<style>
.order-title {
  font-weight: bold;
}
.order-group-title {
  color: #9b9b9b;
}
.login-bd li,
.login-bd p {
  padding-left: 10px;
  line-height: 2;
}
.login-bd li:first-child {
  padding-left: 0;
}
.login-bd p {
  display: flex;
  justify-content: space-between;
}
.order-price {
  padding: 10px 0;
  font-size: 18px;
}
.order-price span {
  padding: 0 10px;
  color: #ff4081;
  font-size: 14px;
  text-decoration: line-through;
}
.point {
  padding: 20px 0;
}
</style>
