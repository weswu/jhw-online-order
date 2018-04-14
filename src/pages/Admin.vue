<template>
  <div id="A_Page">
    <div class="layout">
      <div class="content">
        <AHeader :homeInfo="homeInfo"/>
        <AMenu :homeInfo="homeInfo" :title="'订单管理系统'"/>
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
