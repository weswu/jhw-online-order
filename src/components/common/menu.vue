<template>
<div id="A_Menu">
  <div class="content-left">
    <h4 class="systemName">
      {{title}}
    </h4>
    <mu-list @change="handleListChange" :value="active">
      <mu-list-item :title="item.name" :value="item.url" :href="'#/admin/'+item.url" v-for="(item,index) in homeInfo.navigateList" :key="index"></mu-list-item>
    </mu-list>
  </div>
</div>
</template>

<script>
export default {
  props: ['homeInfo', 'title'],
  data () {
    return {
      active: 'order'
    }
  },
  mounted () {
    this.active = this.$route.path.split('/')[2]
  },
  methods: {
    handleListChange (val) {
      this.active = val
    }
  }
}
</script>

<style lang="less">
#A_Menu{
  .systemName{
    background-color: #dadee4;
    height: 97px;
    line-height: 100px;
    text-indent: 10px;
  }
  .content-left{
    width: 180px;
    float: left;
    position: fixed;
    background-color: #ebedf1;
    margin-bottom: -4000px;
    padding-bottom: 4000px;
    i{
      font-size: 16px
    }
    .mu-list{
      padding-top: 0;
    }
    .mu-item{
      color: #595959;
    }
    .mu-item-wrapper.hover {
      background: #fff
    }
    .mu-item.selected {
      background: #fff
    }
    .mu-item-title{
      font-size: 13px
    }
  }
}

</style>
