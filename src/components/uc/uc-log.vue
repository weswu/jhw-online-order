<template>
  <div class="box">
    <div class="box-title data-feedback">更新日志</div>
    <div class="box-cont">
      <mu-list-item :title="item.name" :describeText="item.addTime | time('yyyy-MM-dd')"
        v-for="(item, index) in $store.state.homeInfo.logList.content" :key="item.id"  v-if="index < 2"></mu-list-item>
      <div v-if="$store.state.homeInfo.logList.content.length === 0" class="data-empty">暂无数据</div>
    </div>
    <div class="box-foot">
      <router-link to="/log"><mu-flat-button label="查看更多日志" /></router-link>
    </div>
  </div>
</template>
