<template>
  <div class="loading-wrapper" v-if="$store.state.loading">
    <mu-circular-progress :size="50" :strokeWidth="5"/>
    <div class="loading-txt">{{text}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: '加载中'
    }
  }
}
</script>
<style>
.loading-wrapper{position:fixed;z-index:999999999999;left:50%;margin-left:-25px;top:30%}
.loading-txt{color:#999;width:100%;text-align:center;padding-top:10px}
</style>
