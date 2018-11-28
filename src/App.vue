<template>
  <div id="app">
    <PageHeader v-show="!$route.meta.navHide" v-if="!$route.meta.admin"></PageHeader>
    <router-view/>
    <PageFooter v-if="!$route.meta.navHide && !$route.meta.admin"></PageFooter>
    <!--加载中...-->
    <Loading></Loading>
    <!--文字提示...-->
    <Tooltip ref="tooltip" v-if="!$route.meta.navHide && !$route.meta.admin"></Tooltip>
    <!--登录...-->
    <IframeLogin ref="iframe" v-if="$route.name !== 'redirect' && !$route.meta.admin"></IframeLogin>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import PageFooter from '@/components/Footer'
import Loading from '@/components/Loading'
import Tooltip from '@/components/shop/Tooltip'
import IframeLogin from '@/components/Iframe'
export default {
  components: {
    PageHeader,
    PageFooter,
    Loading,
    Tooltip,
    IframeLogin
  },
  name: 'app',
  created () {
    this.$store.commit('setIds', this.$route.query.ids || '')
    this.$store.commit('setLayoutId', this.$route.query.layoutId || '')
    this.$store.commit('shop/setYear', this.$route.query.year || 1)
    this.$store.commit('shop/setActiveTab', this.$route.query.tab || 'tab1')
  }
}
</script>
