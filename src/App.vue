<template>
  <div id="app">
    <PageHeader></PageHeader>
    <router-view/>
    <PageFooter></PageFooter>
    <!--加载中...-->
    <Loading></Loading>
    <!--加载中...-->
    <Toast ref="toast"></Toast>
    <!--提示中...-->
    <Tooltip ref="tooltip"></Tooltip>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import PageFooter from '@/components/Footer'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'
import Tooltip from '@/components/shop/Tooltip'
export default {
  components: {
    PageHeader,
    PageFooter,
    Loading,
    Toast,
    Tooltip
  },
  name: 'app'
}
</script>
