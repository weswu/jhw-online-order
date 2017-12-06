<template>
  <div class="">
    <mu-sub-header>{{title}}</mu-sub-header>
    <mu-table :showCheckbox="false" ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item,index) in columns" :key="index" :style="item.width ? 'width:' + item.width + 'px' : ''">{{item.title}}</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in data.content" :key="index" @click="detail(item)">
          <mu-td v-if="type === 'log'">{{item.nickName}}</mu-td>
          <mu-td v-if="type === 'log' || type === 'message'">{{item.name}}</mu-td>
          <mu-td v-if="type === 'message'">{{item.content}}</mu-td>
          <mu-td v-if="type === 'order'">{{item.orderId}}</mu-td>
          <mu-td v-if="type === 'order'">{{item.totalPrice}}</mu-td>
          <mu-td>{{item.addTime | time('yyyy-MM-dd hh:mm')}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination class="pagin" :total="data.totalElements" :current="data.number" @pageChange="handleClick"></mu-pagination>
  </div>
</template>

<script>
export default {
  props: ['title', 'columns', 'data', 'type'],
  methods: {
    handleClick (index) {
      this.$emit('pageChange', index)
    },
    detail (item) {
      this.$emit('detail', item)
    }
  }
}
</script>

<style lang="css">
.pagin{
  padding-top: 20px
}
</style>
