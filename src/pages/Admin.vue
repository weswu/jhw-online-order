<template>
  <div id="A_Page">
    <div class="layout">
      <div class="content">
        <Header :homeInfo="homeInfo"/>
        <Menu :homeInfo="homeInfo" :title="'订单系统后台管理'"/>
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
      homeInfo: 'admin/homeInfo'
    })
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$store.dispatch('admin/getHomeInfo')
    }
  }
}
</script>

<style lang="less">
</style>
