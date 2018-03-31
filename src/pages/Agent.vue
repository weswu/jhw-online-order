<template>
  <div id="A_Page">
    <div class="layout">
      <div class="content">
        <Header :homeInfo="homeInfo"/>
        <Menu :homeInfo="homeInfo"/>
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
import Header from '@/components/common/header'
import Menu from '@/components/common/menu'
export default {
  components: {
    Toast,
    Header,
    Menu
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
