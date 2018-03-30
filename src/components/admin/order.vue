<template>
  <div class="">
    <mu-sub-header>订单管理</mu-sub-header>
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="item.width ? 'width:' + item.width + 'px' : ''">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="index">
          <mu-td>{{item.outTradeNo}}</mu-td>
          <mu-td>{{item.totalPrice}}</mu-td>
          <mu-td><span v-if="item.paymentType === 'UN_PAY'">未支付</span> <span v-if="item.paymentType !== 'UN_PAY'">已支付</span> </mu-td>
          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
          <mu-td>
            <span v-if="!item.auditId" @click="examine(item)" class="red">未审核</span> <span v-if="item.auditId">已审核</span>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination class="pagin" :total="total" :current="this.searchData.page + 1" :pageSize="this.searchData.size" @pageChange="handleClick"></mu-pagination>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      columns: [
        { title: '订单编号' },
        { title: '交易额' },
        { title: '支付状态' },
        { title: '添加时间', width: 160 },
        { title: '操作', width: 160 }
      ],
      total: 0,
      searchData: {
        page: 0,
        size: 10,
        sort: 'addTime,desc',
        state: 'NORMAL' // NORMAL,INIT,DEL
      }
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
    examine (item) {
      var ctx = this
      item.paymentType = 'pay'
      this.$http.post('/admin/order/audit?orderId=' + item.orderId).then((res) => {
        if (res.code === 0) {
          ctx.$parent.$refs.toast.show('审核成功')
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
