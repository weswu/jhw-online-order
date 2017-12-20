<template>
  <div id="app">
    <PageHeader v-if="$route.name !== 'redirect'"></PageHeader>
    <router-view/>
    <PageFooter></PageFooter>
    <!--加载中...-->
    <Loading></Loading>
    <!--文字提示...-->
    <Tooltip ref="tooltip"></Tooltip>
    <!--登录...-->
    <IframeLogin ref="iframe" v-if="$route.name !== 'redirect'"></IframeLogin>
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
  name: 'app'
}
</script>
