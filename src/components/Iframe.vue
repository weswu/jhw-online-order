<template>
  <div class="iframe_login" ref="login" :style="'display:' + display">
    <div class="wrapper">
      <iframe id="iframeLogin" name="header" :src="$store.state.loginUrl" frameBorder="0" scrolling="no"></iframe>
      <mu-icon-button icon="clear" @click="close" class="close"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: 'none'
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.type === 1 && !ctx.$store.state.user.nickname) {
        console.log('close iframe: 1')
        return ctx.close()
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
      this.$store.commit('setLoading', true)
      this.$http.get('/api/user/info').then((res) => {
        ctx.$store.commit('setLoading', false)
        if (res.data.data !== 5) {
          ctx.$store.commit('setUser', res.data)
          ctx.$store.dispatch('getHomeInfo')
          ctx.$store.commit('setLoginUrl', '')
        }
      })
    }
  }
}
</script>

<style lang="less">
.iframe_login{
  width: 652px;
  height: 406px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -300px 0 0 -326px;
  display: none;
  iframe {
    width: 100%;
    height: 406px;
  }
  .wrapper{
    position: relative;
  }
  .close{
    position: absolute;
    right: -48px;
    top: 0;
    color: #000;
    background: rgba(255,255,255,0.8);
    border-radius: 0;
    z-index: 99;
  }
}
</style>
