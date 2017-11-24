<template>
  <div id="app">
    <router-view/>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageFooter from '@/components/Footer'
export default {
  components: {
    PageFooter
  },
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-image: url('http://dev.jihui88.net/jihui_uc/static/gplaypattern.png');
  background-color: rgb(236, 236, 236);
}
li {
  list-style: none;
}
.container{
  box-sizing: border-box;
  padding-top: 120px;
}
.login {
  margin: 0 auto;
  width: 640px;
  box-sizing: border-box;
  padding: 50px;
  background: #fff;
}
.login-ft {
  display: flex;
  justify-content: space-between;
}
h1 {
  color: #474a4f;
}
.input-row {
  display: flex;
  align-items: center;
}
.input-row-item {
  flex: 1;
}
</style>

