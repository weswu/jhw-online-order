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
      title: ''
    }
  },
  mounted () {
    this.title = this.$route.query.title || '代付'
    this.$refs.pay.open('another')
  }
}
</script>
