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

    function getUrlParam (name, url) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      if (typeof url !== 'undefined') {
        url = url.substring(url.indexOf('?'), url.length)
      }
      var path = url || window.location.search
      var r = path.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    }

    var addBind = getUrlParam('addBind')
    var bindType = getUrlParam('bindType')

    if (addBind && addBind === '1') {
      top.postMessage({ type: 'bind' }, '*')
    } else {
      top.postMessage(dataJson, '*')
    }

    // （在没有解决掉微信跳转问题前不要删除）如果当前页面不在iframe内， 则跳转到相应页面
    if (window.location === window.parent.location) {
      if (addBind && addBind === '1') {
        window.location.href = 'http://www.jihui88.com/member/login.html?addBind=1&bindType=' +
          bindType + '&backURL=http://buy.jihui88.com&page=bind'
      } else {
        window.location.href = 'http://buy.jihui88.com'
      }
    }
  }

}
</script>