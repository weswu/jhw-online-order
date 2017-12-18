<template>
  <div class="main-content spread">
    <div class="warpper">
      <mu-sub-header>参与推广</mu-sub-header>
      <mu-content-block>
        <mu-row gutter>
          <mu-col width="70" tablet="70" desktop="70">
            你可以把以下专属于你的推广海报保存到相册，并转发到朋友圈和微信群，即可获取积分和现金优惠卷。<br/>
            <a href='#/spreadRank' class='spread_a'>点击查看由我推广的会员</a>
          </mu-col>
          <mu-col width="30" tablet="30" desktop="30">
            <mu-raised-button label="推荐朋友" class="demo-raised-button" @click="open" style="float:right"/>
          </mu-col>
        </mu-row>
      </mu-content-block>
    </div>
    <mu-tabs :value='activeTab' @change='handleTabChange' class='view-tabs'>
      <mu-tab v-for="item in tabs" :value="item.value" :title="item.title"/>
    </mu-tabs>
    <template v-for='item in list'>
      <div class='item' v-if='item.posterCate === activeTab'>
        <img class='extend_img' v-lazy="item.pic">
        <p class='extend_desc'>{{item.posterDesc}}</p>
        <mu-raised-button label='点击生成,保存图片' @click='saveImg(item)' secondary fullWidth/>
      </div>
    </template>

    <mu-dialog :open="dialog" title="推荐朋友" @close="close">
      <div class="p10">
        <div style="text-align: center;font-size: 0.7rem;padding: 0.5rem 0;">
          我有朋友要购买
        </div>
        <mu-text-field label="朋友姓名" hintText="请输入朋友姓名" v-model="m.name" fullWidth/>
        <mu-text-field label="朋友公司" hintText="请输入朋友公司" v-model="m.company" fullWidth/>
        <mu-text-field label="朋友电话" hintText="请输入朋友电话" v-model="m.phone" fullWidth/>
        <mu-text-field label="推荐人" hintText="请输入推荐人" v-model="m.referee" fullWidth/>
        <mu-text-field hintText="说明..." v-model="m.content" fullWidth multiLine :rows="3" :rowsMax="10" fullWidth/>
      </div>
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="submit" label="推荐好友"/>
    </mu-dialog>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      list: [],
      activeTab: '0',
      tabs: [
        {value: '0', title: '促销类'},
        {value: '1', title: '产品类'},
        {value: '2', title: '人物类'},
        {value: '3', title: '知识类'}
      ],
      m: {},
      sf: {
        card_no: this.$store.state.user.nickname,
        fdbk_subject64: '朋友介绍[订购]',
        fdbk_type: '5'
      },
      dialog: false
    }
  },
  created () {
    // this.get()
  },
  methods: {
    get () {
      var ctx = this
      window.$.ajax({
        type: 'get',
        async: false,
        url: 'http://app.jihui88.com/rest/api/poster/list_p?pageSize=72',
        dataType: 'jsonp',
        jsonp: 'callback', // 传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback: 'flightHandler', // 自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function (json) {
          for (var item of json.attributes.data) {
            item.pic = 'http://img.jihui88.com/' + item.pic
            ctx.list.push(item)
          }
        }
      })
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    saveImg (p) {
      var ctx = this
      var data = {
        pic: p.pic,
        qrcodeWidth: p.qrcodeWidth,
        qrcodeHeight: p.qrcodeHeight,
        username: 'ggggfj',
        qrcodeLeft: p.qrcodeLeft,
        qrcodeTop: p.qrcodeTop,
        posterId: p.posterId,
        qrcode: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w=' + p.qrcodeWidth + '&text=http://www.jihui88.com/member/reg_m.html?d=' + this.sf.card_no
      }
      this.$http.post('http://api.jihui88.net/qrcode_poster/api/poster', qs.stringify(data)).then((res) => {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      }).catch((result) => {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      })
      setTimeout(function () {
        ctx.pic = 'https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg'
      }, 3000)
      this.savepic('https://api.jihui88.net/qrcode_poster/posters/' + p.posterId + '.jpg')
    },
    submit () {
      var ctx = this
      if (!this.m.name) { return window.alert('朋友姓名不能为空') }
      if (!this.m.company) { return window.alert('朋友公司不能为空') }
      if (!this.m.phone) { return window.alert('朋友电话不能为空') }
      if (!this.m.referee) { return window.alert('推荐人不能为空') }
      this.sf.fdbk_intro1k = '姓名:' + this.m.name + '\n公司:' + this.m.company + '\n电话:' + this.m.phone +
      '\n推荐人:' + this.m.referee + '\n说明:' + this.m.content
      this.$store.commit('setLoading', true)
      this.$http.post('http://crmyun.jihui88.com:9500/api/jihuifeedback.php', qs.stringify(this.sf)).then((res) => {
        window.alert('感谢推荐')
        ctx.$store.commit('setLoading', false)
        ctx.m = {}
      })
    },
    savepic (src) {
      var $a = window.$('<a></a>').attr('href', src).attr('download', 'poster.jpg')
      $a[0].click()
    }
  }
}
</script>
<style lang="less" scoped>
.warpper{
  margin-bottom: 5px;
  .mu-sub-header{
    border-bottom: 1px solid #eeeff1;
  }
}

.mu-tabs{
  background: #fff;
  .mu-tab-link{
    color: #000
  }
  .mu-tab-active{
    color: #ff4081
  }
}
.spread {
  .item{
    width: 25%;
    float:left;
    padding: 15px
  }
}
.spread_a{color:#ff7300;padding:10px 0 5px 0;display:block;font-family:'Microsoft YaHei',Helvetica,Arial,'WenQuanYi Micro Hei';font-size:.6rem}
.extend_img{width:100%}
.extend_desc{color:#666;padding:15px 5px}
</style>
