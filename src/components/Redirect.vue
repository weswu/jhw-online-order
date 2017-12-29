<template>
  <div style="text-align:center;padding: 120px 0;font-size:18px">
    登录成功
  </div>
</template>

<script>
export default {
  mounted () {
    let dataJson = {
      type: 1
    }
    if (top.location === self.location) {
      window.location.href = '/'
    }
    window.parent.postMessage(dataJson, '*')
  }
}
</script>
