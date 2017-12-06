<template>
  <div class="box">
    <div class="box-title data-message">消息<mu-badge :content="$store.state.homeInfo.activeMqList.totalElements + ''" /></div>
    <div class="box-cont">
      <mu-list-item :title="item.name" v-for="item in $store.state.homeInfo.activeMqList.content" :key="item.id">
        <span slot="describe">
          <span>{{item.content}}</span><br/>
          {{item.addTime | time('yyyy/MM/dd')}}
        </span>
      </mu-list-item>
      <div v-if="$store.state.homeInfo.activeMqList.content.length === 0" class="data-empty">暂无数据</div>
    </div>
    <div class="box-foot">
      <router-link to="/activeMessage"><mu-flat-button label="查看更多消息" /></router-link>
    </div>
  </div>
</template>
