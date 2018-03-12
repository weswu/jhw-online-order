<template>
  <div style="text-align:center;padding: 120px 0;font-size:18px">
    登录成功
  </div>
</template>

<script>
export default {
  mounted () {
    var addBind = this.$route.query.addBind
    var bindType = this.$route.query.bindType
    // （在没有解决掉微信跳转问题前不要删除）如果当前页面不在iframe内， 则跳转到相应页面
    if (window.location === window.parent.location) {
      console.log('微信登录')
      if (addBind && addBind === '1') {
        window.location.href = 'http://www.jihui88.com/member/login.html?addBind=1&bindType=' +
          bindType + '&backURL=http://buy.jihui88.com&page=bind'
      } else {
        window.location.href = 'http://buy.jihui88.com'
      }
    } else {
      console.log(window.location.href)
      if (addBind && addBind === '1') {
        console.log('QQbid')
        window.parent.postMessage({ type: 'bind' }, '*')
      } else {
        console.log('QQclose')
        window.parent.postMessage({ type: 1 }, '*')
      }
    }
  }

}
</script>
