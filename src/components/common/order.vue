<template>
  <div id="A_Order">
    <mu-sub-header>订单系统后台管理</mu-sub-header>
    <mu-content-block class="search">
      <input type="text" name="" value="" v-model="searchData.outTradeNo" placeholder="订单编号">
      <button type="button" name="button" @click="search">搜索</button>
      <input type="text" name="" value="" v-model="searchData.outTradeNo" placeholder="客户账号">
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
          <mu-td>{{item.totalPrice}}</mu-td>
          <mu-td><span v-if="item.paymentType === 'UN_PAY'">未支付</span> <span v-if="item.paymentType !== 'UN_PAY'" class="green">已支付</span> </mu-td>
          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
          <mu-td>
            <span v-if="!item.auditId" @click="examine(item.orderId)" class="red">线下0元支付</span> <span v-if="item.auditId">已审核</span>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination class="pagin" :total="total" :current="searchData.page + 1" :pageSize="searchData.size" @pageChange="handleClick"></mu-pagination>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      title: '经销商补单系统',
      list: [
        {
          outTradeNo: 'T201722181R27889',
          name: '展示版网站',
          price: 200
        }
      ],
      columns: [
        { title: '订单编号' },
        { title: '产品名称' },
        { title: '原价' },
        { title: '客户应付金额' },
        { title: '经销商支付金额' },
        { title: '标记' },
        { title: '订单创建时间', width: 160 },
        { title: '状态' },
        { title: '操作', width: 160 }
      ],
      total: 0,
      searchData: {
        page: 0,
        size: 10,
        sort: 'addTime,desc',
        outTradeNo: '',
        state: 'NORMAL' // NORMAL,INIT,DEL
      },
      id: ''
    }
  },
  created () {
    this.get()
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
