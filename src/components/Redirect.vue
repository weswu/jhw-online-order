<template>
  <div style="text-align:center;padding: 120px 0;font-size:18px">
    登录成功
  </div>
</template>

<script>
export default {
  mounted () {
    var addBind = this.$route.query.addBind
    if (addBind && addBind === '1') {
      window.parent.postMessage({ type: 'bind' }, '*')
    } else {
      window.parent.postMessage({ type: 1 }, '*')
    }
    // 判断是否有父窗口,即打开本页面的窗口
    if (window.opener) {
      if (addBind && addBind === '1') {
        window.opener.postMessage({type: 'bind'}, '*')
      } else {
        window.opener.postMessage({type: 1}, '*')
      }
      window.close()  // 关闭窗口
    }
  }

}
</script>
