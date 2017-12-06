<template>
  <div class="box">
    <div class="box-title data-feedback">留言<mu-badge :content="$store.state.homeInfo.messageList.totalElements + ''"/></div>
    <div class="box-cont">
      <mu-list-item :title="item.title" v-for="item in $store.state.homeInfo.messageList.content" :key="item.id">
        <span slot="describe">
          <span>{{item.content}}</span><br/>
          {{item.addTime | time('yyyy/MM/dd')}}
        </span>
      </mu-list-item>
      <div v-if="$store.state.homeInfo.messageList.content.length === 0" class="data-empty">暂无数据</div>
    </div>
    <div class="box-foot">
      <a href="http://www.jihui88.com/member/index.html#/message"><mu-flat-button label="查看更多留言" /></a>
    </div>
  </div>
</template>
