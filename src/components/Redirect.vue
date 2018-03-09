<template>
  <div style="text-align:center;padding: 120px 0;font-size:18px">
    登录成功
  </div>
</template>

<script>
export default {
  mounted () {
    window.parent.postMessage({type: 1}, '*')
  }
}
</script>
