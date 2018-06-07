<template>
  <div class="main-content">
    <Pay ref="pay" :title="title"></Pay>
  </div>
</template>

<script>
import Pay from '@/components/Pay'
export default {
  components: {
    Pay
  },
  data () {
    return {
      no: '',
      title: ''
    }
  },
  mounted () {
    this.title = this.$route.query.orderId || '代付'
    this.$refs.pay.openDialog('another', this.$route.query.orderId)
  }
}
</script>
