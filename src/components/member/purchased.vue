<template>
  <div class="content-right warpper">
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="{width: item.width+'px', 'text-align': item.align}">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in list" :key="index">
          <mu-td :title="item.name">{{item.name}}</mu-td>
          <mu-td class="price">￥{{item.totalPrice || 0}}</mu-td>
          <mu-td class="price"><span v-if="item.paidPrice">￥{{item.paidPrice}}</span><span v-if="!item.paidPrice">-</span></mu-td>
          <mu-td>1</mu-td>
          <mu-td>{{item.year || '-'}}</mu-td>
          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
          <mu-td>{{item.endTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
          <mu-td>
            <a href="javascript:;" class="detail" @click="detail(item.orderId)">详情</a>
            <span class="bar">|</span>
            <a href="javascript:;" class="price" @click="buy(item.orderId)">续费</a>
          </mu-td>
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
        共有{{total}}条，每页显示：{{searchData.size}}条
      </div>
    </div>
  </div>
</template>


<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      columns: [
        { title: '订单名称' },
        { title: '原价', width: 70 },
        { title: '应付金额', width: 100 },
        { title: '数量', width: 60 },
        { title: '使用年限', width: 90 },
        { title: '购买时间', width: 130 },
        { title: '到期时间', width: 130 },
        { title: '操作', width: 90, align: 'right' }
      ],
      total: 0,
      searchData: {
        page: 0,
        size: 10,
        sort: 'addTime,desc'
      },
      page: ''
    }
  },
  created () {
    this.searchData.size = parseInt(this.$route.query.size)
    this.get()
  },
  methods: {
    get () {
      var ctx = this
      this.$http.get('/api/order/orderHistory?' + qs.stringify(this.searchData)).then((res) => {
        if (res.code === 0) {
          ctx.list = res.data.content
          ctx.total = res.data.totalElements
        } else {
          ctx.$parent.$refs.toast.show(res.msg)
        }
      })
    },
    handleClick (index) {
      this.searchData.page = index - 1
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
      window.parent.postMessage({ page: 'purchased', id: id }, '*')
    },
    buy (id) {
      window.parent.postMessage({ page: 'buy', id: id }, '*')
    }
  }
}
</script>


<style lang="css">
</style>
