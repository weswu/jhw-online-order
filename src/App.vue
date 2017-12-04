<template>
  <div id="app">
    <router-view/>
    <page-footer></page-footer>
    <!--加载中...-->
    <Loading></Loading>
    <!--加载中...-->
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
import PageFooter from '@/components/Footer'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'
export default {
  components: {
    PageFooter,
    Loading,
    Toast
  },
  name: 'app'
}
</script>
