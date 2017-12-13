<template>
  <div class="" style="text-align:center">
    登录成功
  </div>
</template>

<script>
export default {
  mounted () {
    let dataJson = {
      type: 1
    }
    window.parent.postMessage(dataJson, '*')
  }
}
</script>
