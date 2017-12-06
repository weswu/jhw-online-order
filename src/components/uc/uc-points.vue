<template>
  <div class="box">
    <div class="box-title data-points">积分<mu-badge :content="$store.state.homeInfo.interalRecordList.totalElements + ''" /></div>
    <div class="box-cont">
      <mu-list-item :title="item.income+'积分'" v-for="item in $store.state.homeInfo.interalRecordList.content" :key="item.id">
        <span slot="describe">
          <span>{{item.desc}}</span><br/>
          {{item.addTime | time('yyyy/MM/dd')}}
        </span>
      </mu-list-item>
      <div v-if="$store.state.homeInfo.interalRecordList.content.length === 0" class="data-empty">暂无数据</div>
    </div>
    <div class="box-foot">
      <a href="http://www.jihui88.com/member/index.html#/integral_record_list"><mu-flat-button label="获取更多积分" /></a>
    </div>
  </div>
</template>
