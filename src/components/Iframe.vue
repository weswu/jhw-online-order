<template>
  <div class="iframe_bg" :style="'display:' + display">
    <div class="iframe_login" ref="login" :style="'width:'+width+'px'">
      <div class="wrapper">
        <iframe id="iframeLogin" name="header" :src="$store.state.loginUrl" frameBorder="0" scrolling="no" :width="width" :style="width==='692'?'border:none':''"></iframe>
        <img src="http://www.jihui88.com/member/static/images/f-x.png" alt="close" @click="close" class="close">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: 'none',
      width: '348'
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.type === 1 && !ctx.$store.state.user.username) {
        console.log('close iframe: 1')
        return ctx.close()
      }
      if (data.type === 'qq') {
        ctx.width = '692'
      } else {
        ctx.width = '348'
      }
      if (data.type === 'init') {
        ctx.width = '348'
      }
    }, false)
  },
  methods: {
    open (val) {
      setTimeout(() => {
        this.display = val || 'block'
      }, 200)
    },
    close () {
      var ctx = this
      this.display = 'none'
      this.width = '348'
      this.$store.commit('setLoading', true)
      this.$http.get('/api/user/info').then((res) => {
        ctx.$store.commit('setLoading', false)
        if (res.data.code !== 5) {
          ctx.$store.commit('setUser', res.data)
          ctx.$store.dispatch('getHomeInfo')
          ctx.$store.commit('setLoginUrl', '')
        } else {
          ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url)
        }
      })
    }
  }
}
</script>

<style lang="less">
.iframe_bg{
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
    z-index: 1000;
    transition: all .3s;
    -o-transition: all .3s;
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
}
.iframe_login{
  width: 348px;
  height: 500px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  iframe {
    width: 100%;
    height: 500px;
    border: 1px solid #c1c1c1;
    box-shadow: 0 0 6px 3px #3d3d3d;
    border-radius: 3px;
    background: #fff;
  }
  .wrapper{
    position: relative;
  }
  .close{
    position: absolute;
    right: 11px;
    top: 10px;
    cursor: pointer;
    z-index: 99;
  }
}
</style>
