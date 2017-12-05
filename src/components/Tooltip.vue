<template>
<transition name="toast-fade">
    <div class="tooltip-wrap" ref="tooltip" v-show="showing" :style="'left: ' + left + 'px; top: ' + top + 'px;'"  @mouseenter="enter" @mouseleave="hide">
      <div v-html='item.html' class="tooltip-cont"></div>
      <div class="tooltip-unit" v-if="item.unit"><span v-if="item.unit.match(/元/)">{{item.price}}</span>{{item.unit}}</div>
    </div>
</transition>
</template>
<script>
export default {
  name: 'tooltip',
  data () {
    return {
      item: {},
      showing: false,
      timer: null,
      left: 321,
      top: 76
    }
  },
  methods: {
    show (item, e) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.item = item
      let box = (e.target || e.srcElement).getBoundingClientRect()
      this.showing = true
      this.setTime(box, e.clientY - e.pageY)
    },
    setTime (box, page) {
      let ctx = this
      setTimeout(() => {
        let tool = ctx.$refs.tooltip.getBoundingClientRect()
        if (tool.width > 0) {
          ctx.left = box.left + box.width / 2 - tool.width / 2
          ctx.top = box.top - tool.height - 10 - page
        } else {
          ctx.setTime(box, page)
        }
      }, 1)
    },
    enter () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.loading = true
    },
    hide () {
      this.timer = setTimeout(() => {
        this.showing = false
      }, 100)
    }
  }
}
</script>
<style lang="less">
.tooltip-wrap {
  position:absolute;left: 0;
  top: 0;
  visibility: visible;
  max-width: 350px;
  min-width: 130px;
  z-index:20141231;
  &:after{
    content: '';
    border-color: #eee transparent;
    bottom: -10px;
    z-index: 1;
    position: absolute;
    border-width: 10px 10px 0;
    border-style: solid dashed;
    left: 50%;
    margin-left: -10px;
  }
  &:before{
    content: '';
    border-color: #fff transparent;
    bottom: -8px;
    z-index: 2;
    position: absolute;
    border-width: 10px 10px 0;
    border-style: solid dashed;
    left: 50%;
    margin-left: -10px;
  }
}
.tooltip-cont {
 border: 1px solid #eee;
 border-radius: 3px;
 padding: 10px;
 background: #fff;
 font-size: 12px;
}
.tooltip-unit{
  position: absolute;
    right: 10px;
    color: red;
    top: 10px;
    font-size: 12px;
}
.toast-fade-enter-active,.toast-fade-leave-active{transition:opacity .5s}
.toast-fade-enter,.toast-fade-leave-active{opacity:0}
</style>
