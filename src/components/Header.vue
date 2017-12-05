<template>
  <div class="header">
    <div class="wrap">
      <div class="logo">
        <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/8a688605-44c1-4729-88b3-c818641b12cc.png" alt="">
      </div>
      <div class="nav" v-if="!uc">
        <ul>
          <li><a href="http://www.jihui88.com/">首页</a></li>
          <li><a href="http://www.jihui88.com/product_1.html">全网营销云平台</a></li>
          <li :class="{ 'active': activeName === 'shop' || activeName === 'order' }"><router-link to="/">购买</router-link></li>
          <li><a href="http://anli.jihui88.com/case.html">案例</a></li>
          <li><a href="http://www.jihui88.com/join.html">加盟</a></li>
          <li><a href="http://xueyuan.jihui88.com/news.html">学院</a></li>
          <li><a href="http://about.jihui88.com/">关于</a></li>
        </ul>
      </div>

      <div class="account">
        <a href="javascript:;" class="btn-login" @click="toLogin" v-if="!$store.state.user.nickname">登录</a>
        <a href="http://www.jihui88.com/member/register.html" class="btn-register" v-if="!$store.state.user.nickname">免费注册</a>
        <mu-icon-menu icon="person" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin" v-if="$store.state.user.nickname">
            <mu-menu-item title="用户中心" @click="toUc" />
            <mu-menu-item title="退出" @click="toLogin" />
          </mu-icon-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String
    },
    uc: {
      type: Boolean,
      default: false
    }
  },
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
    toUc () {
      this.$router.push({path: 'uc'})
    },
    toLogin () {
      let ctx = this
      this.$http.get('/api/user/logout').then((res) => {
        ctx.$store.commit('setUser', {})
      })
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
  }
  .account {
    float: right;
    position: relative;
    color: #fff;
    height: 66px;
    line-height: 66px;
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

/* 自适应 */
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
