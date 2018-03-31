<template>
  <div id="A_Page">
    <div class="layout">
      <div class="content">
        <AHeader :homeInfo="homeInfo"/>
        <AMenu :homeInfo="homeInfo" :title="'经销商补单系统'"/>
        <div class="content-right">
          <div class="body">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
    <!--消息...-->
    <Toast ref="toast"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Toast from '@/components/Toast'
import AHeader from '@/components/common/header'
import AMenu from '@/components/common/menu'
export default {
  components: {
    Toast,
    AHeader,
    AMenu
  },
  computed: {
    ...mapGetters({
      homeInfo: 'agent/homeInfo'
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('agent/getHomeInfo')
    }
  }
}
</script>

<style lang="less">
</style>
