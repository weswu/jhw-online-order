<template>
  <div class="main-content">
    <Pay ref="pay" :title="'代付'"></Pay>
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
      no: ''
    }
  },
  mounted () {
    this.$refs.pay.openDialog('another', this.$route.query.orderId)
  }
}
</script>
