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
          <mu-td>{{item.name}}</mu-td>
          <mu-td>{{item.content}}</mu-td>
          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination class="pagin" :total="total" :current="this.search.page + 1" @pageChange="handleClick"></mu-pagination>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [
        {name: 'a', content: 'c'}
      ],
      columns: [
        {
          title: '订单编号'
        },
        {
          title: '交易额'
        },
        {
          title: '时间',
          width: 160
        }
      ],
      search: {
        size: 10,
        page: 0
      },
      total: 10
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/admin/order/list?' + qs.stringify(this.search)).then((res) => {
        this.data = res.data
      })
    },
    handleClick (index) {
      this.search.page = index - 1
      this.get()
    },
    detail (item) {
      this.$refs.OrderDetail.open(item.orderId)
    }
  }
}
</script>

<style lang="css">
</style>
