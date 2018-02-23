<template>
  <div class="main-content spread">
    <div class="warpper">
      <mu-sub-header>我推广的会员</mu-sub-header>
      <mu-content-block>
        <div class="item-list">
          <dl class="rank_list_first"><dd class="item-row-4">用户名</dd> <dd class="item-row-3">手机号码</dd> <dd class="item-row-3">时间</dd></dl>
        </div>
        <div class="ifr">
          <iframe id="extend_rank" :src="'http://www.jihui88.com/member/extend_rank.html?u='+$store.state.user.username" style="width: 100%; border: none; height: 500px;margin-top: -40px;"></iframe>
        </div>
      </mu-content-block>
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      jsonp('https://wx.jihui88.net/rest/api/comm/poster/userlist?username=jihui', null, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.log(data)
          debugger
        }
      })
    }
  }
}
</script>
<style scoped>
.spread .mu-content-block {
  overflow: hidden;
}
.spread .ifr{
  margin-top: 20px;  overflow: hidden;
}
.item-list{overflow: hidden;}
.item-list dd {
    display: inline-block;
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
}
.item-list .item-row-3 {
    width: 30%;
}
.item-list .item-row-4 {
    width: 40%;
}
</style>
