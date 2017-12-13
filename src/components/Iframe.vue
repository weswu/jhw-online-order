<template>
  <div class="iframe_login" ref="login" :style="'display:' + display">
    <iframe id="iframeLogin" name="header" :src="$store.state.loginUrl" frameBorder="0" scrolling="no"></iframe>
    <mu-flat-button slot="actions" @click="close" label="取消" class="close"/>
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
      // this.display = 'none'
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
  width: 600px;
  height: 750px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -370px 0 0 -325px;
  display: none;
  iframe {
    width: 100%;
    height: 710px
  }
  .close{
    float: right;
    margin-top: -45px;
    color: #fff;
  }
}
</style>
