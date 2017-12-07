<template>
  <div class="iframe_login" v-if="dialog">
    <iframe id="iframeLogin" name="header" :src="$store.state.loginUrl" frameBorder="0" scrolling="no"></iframe>
    <mu-flat-button slot="actions" @click="close" label="取消" class="close"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      switch (data.type) {
        case 1:
          ctx.close()
          break
      }
    }, false)
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
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
  iframe {
    width: 100%;
    height: 710px
  }
  .close{
    float: right;
  }
}
</style>
