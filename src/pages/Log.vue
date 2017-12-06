<template>
  <div class="main-content">
    <Table title="更新日志" :columns="columns" :data="data" type="log"></Table>
  </div>
</template>

<script>
import qs from 'qs'
import Table from '@/components/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      data: {},
      columns: [
        {
          title: '用户',
          width: 150
        },
        {
          title: '内容'
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
      this.$http.get('/api/log/list?' + qs.stringify(this.search)).then((res) => {
        this.data = res.data
      })
    },
    pageChange (index) {
      debugger
      this.search.page = index - 1
      this.get()
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
