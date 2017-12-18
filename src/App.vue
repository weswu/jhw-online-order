<template>
  <div id="app">
    <PageHeader></PageHeader>
    <router-view/>
    <PageFooter></PageFooter>
    <!--加载中...-->
    <Loading></Loading>
    <!--文字提示...-->
    <Tooltip ref="tooltip"></Tooltip>
    <!--登录...-->
    <IframeLogin ref="iframe"></IframeLogin>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import PageFooter from '@/components/Footer'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'
import Tooltip from '@/components/shop/Tooltip'
import IframeLogin from '@/components/Iframe'
export default {
  components: {
    PageHeader,
    PageFooter,
    Loading,
    Toast,
    Tooltip,
    IframeLogin
  },
  name: 'app'
}
</script>
