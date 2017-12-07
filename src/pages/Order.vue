<template>
  <div class="main-content">
    <Table title="消费记录" :columns="columns" :data="data" type="order" v-on:page-change="pageChange" v-on:detail="detail"></Table>
    <OrderDetail ref="OrderDetail"></OrderDetail>
  </div>
</template>

<script>
import qs from 'qs'
import Table from '@/components/Table'
import OrderDetail from '@/components/OrderDetail'
export default {
  components: {
    Table,
    OrderDetail
  },
  data () {
    return {
      data: {},
      columns: [
        {
          title: '订单编号'
        },
        {
          title: '内容'
        },
        {
          title: '交易额',
          width: 160
        },
        {
          title: '时间',
          width: 160
        }
      ],
      search: {
        size: 10,
        page: 0
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/api/order/list?' + qs.stringify(this.search)).then((res) => {
        this.data = res.data
      })
    },
    pageChange (index) {
      this.search.page = index - 1
      this.get()
    },
    detail (item) {
      this.$refs.OrderDetail.open(item.orderId)
    }
  }
}
</script>

<style lang="less">
.main-content {
  width: 1000px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
  zoom: 1;
  .mu-td {
    overflow: hidden;
  }
}
</style>
