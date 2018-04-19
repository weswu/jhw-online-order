<template>
    <transition name="toast-fade">
        <div class="toast-wrap" v-show="showing">{{text}}</div>
    </transition>
</template>
<script>
const DEFAULT_DURATION = 3000
export default {
  name: 'toast',
  data () {
    return {
      text: '',
      showing: false,
      timer: null
    }
  },
  methods: {
    show (text, duration) {
      this.text = text
      this.showing = true
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setTimeout(() => {
        this.showing = false
      }, duration || DEFAULT_DURATION)
    }
  }
}
</script>
<style>
.toast-wrap{position:fixed;top:100px;left:0;right:0;width:200px;margin-left:auto;margin-right:auto;background:#fafafa;color:#000;text-align:center;padding:5px;font-size:12px;border-radius:5px;z-index:99999999;border: 1px solid #f0f0f0;}
.toast-fade-enter-active,.toast-fade-leave-active{transition:opacity .5s}
.toast-fade-enter,.toast-fade-leave-active{opacity:0}
</style>
