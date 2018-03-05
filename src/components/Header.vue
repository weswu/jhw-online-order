<template>
  <div class="header">
    <div class="wrap">
      <div class="logo">
        <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/8a688605-44c1-4729-88b3-c818641b12cc.png" alt="">
      </div>
      <div class="nav">
        <ul>
          <li><a href="http://www.jihui88.com/">首页</a></li>
          <li><a href="http://www.jihui88.com/product_1.html">全网营销云平台</a></li>
          <li :class="{ 'active': $route.name === 'shop' || $route.name === 'paid' }"><router-link to="/">购买</router-link></li>
          <li><a href="http://anli.jihui88.com/case.html">案例</a></li>
          <li><a href="http://www.jihui88.com/join.html">加盟</a></li>
          <li><a href="http://xueyuan.jihui88.com/news.html">学院</a></li>
          <li><a href="http://about.jihui88.com/">关于</a></li>
        </ul>

        <mu-icon-menu icon="menu" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin2" slot="left" class="nav-menu">
          <a href="http://www.jihui88.com/"><mu-menu-item title="首页"/></a>
          <a href="http://www.jihui88.com/product_1.html"><mu-menu-item title="全网营销云平台"/></a>
          <a :class="{ 'active': $route.name === 'shop' || $route.name === 'paid' }" href="#"><mu-menu-item title="购买"/></a>
          <a href="http://anli.jihui88.com/case.html"><mu-menu-item title="案例"/></a>
          <a href="http://www.jihui88.com/join.html"><mu-menu-item title="加盟"/></a>
          <a href="http://xueyuan.jihui88.com/news.html"><mu-menu-item title="学院"/></a>
          <a href="http://about.jihui88.com/"><mu-menu-item title="关于"/></a>
        </mu-icon-menu>
      </div>

      <div class="account">
        <a href="javascript:;" class="btn-login" @click="toLogin" v-if="!user.username">登录</a>
        <a href="javascript:;" class="btn-register" @click="toLogin('signup')" v-if="!user.username">免费注册</a>

        <div class="" @click="toggle" v-if="user.username && opacity === 0">
          <a href="javascript:;" class="btn-register">{{user.nickname || user.username}}</a>
        </div>
        <mu-icon-menu icon="person" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin" :open="open" @close="handleClose" :style="'position: absolute;height:0;right:0;opacity: ' + opacity" v-if="user.username">
          <mu-menu-item title="会员中心" @click="toUc" />
          <a href="http://www.jihui88.com/member/index.html#/account"><mu-menu-item title="账号设置"/></a>
          <mu-menu-item title="退出" @click="toLogout" />
        </mu-icon-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
      targetOrigin: {horizontal: 'right', vertical: 'top'},
      targetOrigin2: {horizontal: 'left', vertical: 'top'},
      open: false,
      opacity: 0
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      let ctx = this
      // 自动登录
      if (!this.$store.state.user.nickname) {
        this.$http.get('/api/user/info').then((res) => {
          if (res.data.code !== 5) {
            ctx.$store.commit('setUser', res.data)
            ctx.$store.dispatch('getHomeInfo')
          } else {
            ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url + '&dialog=1')
            ctx.$parent.$refs.iframe.open('none')
          }
        })
      }
    },
    toAccount () {
      this.$router.push({ name: 'account' })
    },
    toUc () {
      this.$router.push({path: 'uc'})
    },
    toLogin (e) {
      var data = this.$parent.$refs.iframe
      if (e === 'signup') {
        data = {
          ifr: this.$parent.$refs.iframe,
          type: 'signup'
        }
      }
      this.$store.dispatch('getUser', data)
    },
    toLogout () {
      let ctx = this
      this.$http.get('/api/user/logout').then((res) => {
        ctx.$store.commit('setUser', {})
        // 跳到退出页面
        ctx.$store.commit('setLoginUrl', res.data)
        setTimeout(() => {
          ctx.$store.commit('setLoginUrl', '')
        }, 2000)
        let homeInfo = {
          interalRecordList: {
            content: [],
            totalElements: 0
          },
          activeMqList: {
            content: [],
            totalElements: 0
          },
          messageList: {
            content: [],
            totalElements: 0
          },
          orderList: [],
          logList: {
            content: []
          },
          userInfo: {},
          logo: ''
        }
        ctx.$store.commit('setHomeInfo', homeInfo)
      })
    },
    toggle () {
      this.open = !this.open
    },
    handleClose (e) {
      this.open = false
    },
    setErrorImg () {
      this.opacity = 1
    }
  }
}
</script>

<style lang="less">
.header{
  background-color: #1e2328;
  height: 66px;
  .wrap {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    font-family: "Microsoft YaHei","SimHei","SimSun";
  }
  .logo {
    float: left;
    height: 100%;
    img {
      height: 100%;
    }
  }
  .nav {
    float: left;
    height: 66px;
    line-height: 66px;
    margin-left: 25px;
    ul {
      float: left;
    }
    li {
      float: left;
      a {
        color: #fff;
        display: inline-block;
        padding: 0 15px;
        transition: all .3s;
        -moz-transition: all .3s;
        -o-transition: all .3s;
        -webkit-transition: all .3s;
        &:hover{
          color: #ff6700
        }
      }
    }
    li.active {
      a {
        color: #ff6700
      }
    }
    .nav-menu {
      color: #fff;
      display: none;
      line-height: 59px;
      .mu-icon {
        padding-top: 7px;
      }
    }
  }
  .account {
    float: right;
    position: relative;
    color: #fff;
    height: 66px;
    line-height: 66px;
    .mu-avatar {
      width: 36px; height: 36px;
      cursor: pointer;
      position: absolute;
      margin-top: 13px;
    }
    a {
      display: inline-block;
      color: #fff;
      height: 34px;
      line-height: 34px;
      transition: all .2s ease-in-out;
    }
    .btn-login {
      &:hover{
        color: #ff6700;
      }
    }
    .btn-register {
      background: #fff;
      color: #000;
      border-radius: 34px;
      padding: 0 20px;
      margin-left: 15px;
      &:hover {
        color: #fff;
        background: #ff6700;
      }
    }
    .mu-icon-menu {
      line-height: 28px
    }
    .mu-icon-button {
      width: 36px;
      height: 36px;
      padding: 0;
      background: #7e57c2;
      overflow: hidden;
      margin-top: 13px;
    }
    .mu-icon {
      font-size: 42px;
      margin-top: 2px;
      margin-left: -3px;
    }
  }
}
.active .mu-menu-item-title{
  color: #ff6700
}
/* 自适应 */
@media only screen and (max-width: 835px) {
  .header{
    .nav {
      ul {
        display: none
      }
      .nav-menu {
        display: block
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .header{
    height: 78px;
    .wrap {
      width: 72%;
    }
    .nav {
      margin-left:55px;
      height: 78px;
      line-height: 78px;
      li a {
        padding: 0 25px;
        font-size: 16px;
      }
    }
    .account {
      font-size: 16px;
      height: 78px;
      line-height: 78px;
      .mu-avatar {
        margin-top: 16px;
      }
      .mu-icon-menu {
        line-height: 43px
      }
      .mu-icon-button {
        margin-top: 20px;
      }
    }
  }
}
@media screen and (min-width: 1200px) and (max-width: 1439px) {
  .header{
    height: 72px;
    .wrap {
      width: 80%;
    }
    .nav {
      margin-left:40px;
      height: 72px;
      line-height: 72px;
      li a {
        padding: 0 20px;
        font-size: 15px;
      }
    }
    .account {
      font-size: 15px;
      height: 72px;
      line-height: 72px;
      .mu-avatar {
        margin-top: 21px;
      }
      .mu-icon-menu {
        line-height: 37px
      }
      .mu-icon-button {
        margin-top: 16px;
      }
    }
  }
}
</style>
