<template>
  <div class="header">
    <div class="wrap">
      <div class="logo">
        <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/8a688605-44c1-4729-88b3-c818641b12cc.png" alt="">
      </div>
      <div class="nav" v-if="!uc">
        <ul>
          <li><a href="http://www.jihui88.com/">首页</a></li>
          <li><a href="http://www.jihui88.com/product_1.html">全网营销平台</a></li>
          <li :class="{ 'active': activeName === 'shop' || activeName === 'order' }"><router-link to="/">购买</router-link></li>
          <li><a href="http://anli.jihui88.com/case.html">案例</a></li>
          <li><a href="http://www.jihui88.com/join.html">加盟</a></li>
          <li><a href="http://xueyuan.jihui88.com/news.html">学院</a></li>
          <li><a href="http://about.jihui88.com/">关于</a></li>
        </ul>
        <div class="nav-login">
          <a href="javascript:;" @click="login" v-if="!$store.state.user.nickname">登录</a>
          <a href="#/reg" class="nav-reg" v-if="!$store.state.user.nickname">免费注册</a>
          <a href="javascript:;" class="nav-reg nickname" @click="toggle" v-if="$store.state.user.nickname">{{$store.state.user.nickname}}</a>
          <mu-icon-menu icon="more_vert" :open="open" @close="handleClose" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin">
            <mu-menu-item title="退出"  @click="toLogin"/>
          </mu-icon-menu>
        </div>
      </div>
      <div class="nav" v-else>
        <div class="nav-account">
          <mu-icon-menu icon="person" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin">
            <mu-menu-item title="帮助" />
            <mu-menu-item title="退出" @click="toLogin" />
          </mu-icon-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeName', 'uc'],
  data () {
    return {
      anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
      targetOrigin: {horizontal: 'right', vertical: 'top'},
      open: false
    }
  },
  methods: {
    toAccount () {
      this.$router.push({ name: 'account' })
    },
    toLogin () {
      let ctx = this
      this.$http.get('/api/user/logout').then((res) => {
        ctx.$store.commit('setUser', {})
      })
    },
    login () {
      this.$store.dispatch('getUser', this.$http)
    },
    toggle () {
      this.open = !this.open
    },
    handleClose (e) {
      this.open = false
    }
  }
}
</script>

<style>
.header{
  background-color: #1e2328;
  height: 60px;
}
.header > .wrap {
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}
.logo {
  float: left;
  height: 100%;
}
.logo img {
  height: 100%;
}
.nav{
  float: right;
  height: 60px;
  line-height: 60px;
}
.nav ul,
.nav-login {
  float: left;
}

.nav li {
  float: left;
}
.nav li a {
  color: #fff;
  display: inline-block;
  padding: 0 25px;
  position: relative;
}
.nav li a::after,
.nav li.active a::after {
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  border-bottom: 2px  solid #ff6700;
  height: 2px;
}
.nav li a::after {
  transform: scaleX(0);
  transition: all .2s ease-in-out;
}
.nav li.active a::after,
.nav li a:hover::after {
  transform: scaleX(1);
}
.nav-login {
  padding-left: 50px;
}
.nav-login a {
  display: inline-block;
  color: #fff;
  margin-left: 10px;
  padding: 0 20px;
  border-radius: 30px;
  height: 30px;
  line-height: 30px;
  transition: all .2s ease-in-out;
}
.nav-login a.nav-reg {
  background: #fff;
  color: #000;
}
.nav-login a:hover {
  color: #fff;
  background: #ff6700;
}
.nav-account {
  padding: 0 25px;
  color: #fff;
  line-height: 1;
  height: 60px;
  position: relative;
}
.nav-account .mu-icon-menu {
  padding-top: 12px;
  height: 60px;
}
.nav-account .mu-icon-button {
  width: 36px;
  height: 36px;
  padding: 0;
  background: #7e57c2;
  overflow: hidden;
}
.nav-account .mu-icon {
  font-size: 42px;
  margin-top: 2px;
  margin-left: -3px;
}
.nickname{
  position: absolute;
z-index: 999;
top: 15px;
right: 15px;
}
</style>
