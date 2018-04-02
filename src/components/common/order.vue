<template>
  <div id="A_Order">
    <mu-sub-header>
      <span v-if="pageName === 'order'">订单列表</span>
      <span v-if="pageName === 'agent'">经销商补单</span>
    </mu-sub-header>
    <mu-content-block class="search">
      <input type="text" name="" value="" v-model="searchData.outTradeNo" placeholder="订单编号">
      <button type="button" name="button" @click="search">搜索</button>
      <input type="text" name="" value="" v-model="searchData.username" placeholder="客户账号">
      <button type="button" name="button" @click="search">搜索</button>
    </mu-content-block>
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="item.width ? 'width:' + item.width + 'px' : ''">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="index">
          <mu-td>{{item.outTradeNo}}</mu-td>
          <mu-td>{{item.name}}</mu-td>
          <mu-td class="price">￥{{item.totalPrice || 0}}</mu-td>
          <mu-td class="price"><span v-if="item.paidPrice">￥{{item.paidPrice}}</span><span v-if="!item.paidPrice">-</span></mu-td>
          <mu-td class="price"><span v-if="item.agentPrice">￥{{item.agentPrice}}</span><span v-if="!item.agentPrice">-</span></mu-td>

          <mu-td v-if="item.agentId">线下订单</mu-td>
          <mu-td v-if="!item.agentId">线上订单</mu-td>

          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>

          <mu-td class="red" v-if="item.paymentType === 'UN_PAY'">未支付</mu-td>
          <mu-td class="green" v-if="item.paymentType !== 'UN_PAY'">已支付</mu-td>

          <mu-td><a href="javascript:;" class="detail" @click="detail(item.orderId)">详情</a></mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <div class="pagination">
      <div class="btn">
        <input type="text" v-model="page">
        <button type="button" name="button" @click="searchPage">GO</button>
      </div>
      <mu-pagination :total="total" :current="searchData.page + 1" :pageSize="searchData.size" @pageChange="handleClick"></mu-pagination>
      <div class="info">
        共有{{total}}条，每页显示：10条
      </div>
    </div>
    <OrderDetail ref="OrderDetail" v-on:edit="edit"/>
  </div>
</template>

<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
import OrderDetail from '@/components/common/orderDetail'
export default {
  components: {
    OrderDetail
  },
  data () {
    return {
      list: [],
      columns: [
        { title: '订单编号' },
        { title: '产品名称' },
        { title: '原价', width: 70 },
        { title: '客户应付金额', width: 110 },
        { title: '经销商支付金额' },
        { title: '标记', width: 90 },
        { title: '订单创建时间', width: 130 },
        { title: '状态', width: 70 },
        { title: '操作', width: 60 }
      ],
      total: 0,
      searchData: {
        page: 0,
        size: 10,
        sort: 'addTime,desc',
        outTradeNo: '',
        username: '',
        state: 'NORMAL' // NORMAL,INIT,DEL
      },
      page: '',
      id: '',
      pageName: ''
    }
  },
  computed: {
    ...mapGetters({
      homeInfo: 'admin/homeInfo'
    })
  },
  watch: {
    homeInfo: {
      handler () {
        var ctx = this
        setTimeout(function () {
          if (ctx.list.length === 0) {
            ctx.get()
          }
        }, 1000)
      },
      deep: true
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.pageName = this.$route.path.split('/')[2]
  },
  methods: {
    get () {
      var ctx = this
      if (!this.pageName) {
        this.pageName = this.$route.path.split('/')[2]
      }
      this.$http.get('/admin/' + this.pageName + '/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.code === 0) {
          ctx.list = res.data.content
          if (ctx.searchData.page === 0) {
            ctx.total = res.data.totalElements
          }
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    },
    handleClick (index) {
      this.searchData.page = index - 1
      this.get()
    },
    search () {
      this.searchData.page = 0
      this.get()
    },
    searchPage () {
      if (this.page < 1) {
        this.searchData.page = 0
      } else {
        this.searchData.page = this.page - 1
      }
      this.page = ''
      this.get()
    },
    detail (id) {
      this.$refs.OrderDetail.open(id)
    },
    edit (data) {
      let ctx = this
      ctx.list.forEach(item => {
        if (item.orderId === data.orderId) {
          if (data.auditId) {
            item.auditId = '01'
          } else {
            item.addTime = data.addTime
            item.agentId = data.agentId
            item.paidPrice = data.paidPrice
            item.agentPrice = data.agentPrice
          }
        }
      })
    }
  }
}
</script>
