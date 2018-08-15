<template>
  <Order :height="height"/>
</template>

<script>
import Order from '@/components/pay/Order'
export default {
  components: {
    Order
  },
  data () {
    return {
      height: ''
    }
  },
  created () {
    this.height = this.$route.query.height || '428'
    // 选项
  },
  methods: {}
}
</script>
