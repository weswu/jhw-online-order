<template>
  <div id="A_Order">
    <mu-sub-header>
      <span v-if="pageName === 'admin'">订单系统后台管理</span>
      <span v-if="pageName === 'agent'">经销商补单系统</span>
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
          <mu-td class="price">￥{{item.totalPrice}}</mu-td>
          <mu-td class="price">￥{{item.paidPrice}}</mu-td>
          <mu-td class="price">￥{{item.agentPrice}}</mu-td>

          <mu-td v-if="item.agentId">线下订单</mu-td>
          <mu-td v-if="!item.agentId">线上订单</mu-td>

          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>

          <mu-td class="red" v-if="item.paymentType === 'UN_PAY'">未支付</mu-td>
          <mu-td class="green" v-if="item.paymentType !== 'UN_PAY'">已支付</mu-td>

          <mu-td><a href="javascript:;" class="detail">详情</a></mu-td>
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

  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [
        {
          outTradeNo: 'T201722181R27889',
          name: '展示版网站',
          price: 200,
          'addTime': '2018-03-31 04:57:47',
          'agentId': 'string',
          'agentPrice': 0,
          'auditId': 'string',
          orderId: 'string',
          paidPrice: 0,
          paymentType: 'UN_PAY',
          totalPrice: 0
        }
      ],
      columns: [
        { title: '订单编号' },
        { title: '产品名称' },
        { title: '原价', width: 60 },
        { title: '客户应付金额', width: 110 },
        { title: '经销商支付金额' },
        { title: '标记', width: 110 },
        { title: '订单创建时间', width: 130 },
        { title: '状态', width: 70 },
        { title: '操作', width: 60 }
      ],
      total: 10000,
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
  created () {
    this.get()
  },
  mounted () {
    this.pageName = this.$route.path.split('/')[1]
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/admin/order/list?' + qs.stringify(this.searchData)).then((res) => {
        if (res.code === 0) {
          ctx.list = res.data.content
          if (this.searchData.page === 0) {
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
    examine (id) {
      let ctx = this
      ctx.id = id
      this.$http.post('/admin/order/audit?orderId=' + id).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$refs.toast.show('审核成功')
          ctx.list.forEach(item => {
            if (item.orderId === ctx.id) {
              item.auditId = '1'
            }
          })
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>
