<template>
  <div class="iframe_login" ref="login" :style="'display:' + display">
    <div class="wrapper">
      <iframe id="iframeLogin" name="header" :src="$store.state.loginUrl" frameBorder="0" scrolling="no"></iframe>
      <mu-flat-button slot="actions" @click="close" label="关闭" class="close"/>
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
      switch (data.type) {
        case 1:
          console.log('close iframe: 1')
          ctx.close()
          break
      }
    }, false)
  },
  methods: {
    open () {
      setTimeout(() => {
        this.display = 'block'
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
        }
        ctx.$store.commit('setLoading', false)
        ctx.$store.dispatch('getHomeInfo', this.$http)
      })
    }
  }
}
</script>

<style lang="less">
.iframe_login{
  width: 1000px;
  height: 725px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -408px 0 0 -500px;
  display: none;
  iframe {
    width: 100%;
    height: 725px
  }
  .wrapper{
    position: relative;
  }
  .close{
    position: absolute;
    right: 0;
    top: 0;
    color: #000;
    background: rgba(255,255,255,0.8);
    border-radius: 0;
  }
}
</style>
