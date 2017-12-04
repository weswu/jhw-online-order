<template lang="html">
  <div class="box">
    <div class="box-title data-points">积分<mu-badge :content="count" /></div>
    <div class="box-cont">
      <mu-list-item :title="item.income+'积分'" v-for="item in list" :key="item.id">
        <span slot="describe">
          <span>{{item.desc}}</span><br/>
          {{item.addTime}}
        </span>
      </mu-list-item>
    </div>
    <div class="box-foot">
      <mu-flat-button label="获取更多积分" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      count: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/api/integralRecord/integralRecordList').then((res) => {
        this.list = res.data.content
      })
    }
  }
}
</script>

<style lang="css">
</style>
