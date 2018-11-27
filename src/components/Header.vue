<template>
  <div>
    <div id="jh_header">
      <div class="jh_container">
        <div class="header_logo">
            <a href="http://www.jihui88.com/" title="机汇网"><img src="http://img.jihui88.com/upload/k/k3/kokbd/picture/2018/11/14/dfdc67a2-1c6c-46cc-ac99-1354227c08d8.png" alt="机汇网"/><span class="hidden-sm hidden-xs">全网营销云平台</span></a>
        </div>
        <div class="header_content">
            <div class="header_nav">
                <div class="mobile_btn visible-xs-block">
                    <ul class="sign_list btn_list" data-logined="0" v-if="!user.username">
                        <li class="register_item">
                            <a href="javascript:;" rel="nofollow">免费注册</a>
                        </li>
                        <li class="login_item">
                            <a href="javascript:;" rel="nofollow">登录</a>
                        </li>
                    </ul>
                    <ul class="accout_list btn_list"  v-if="user.username">
                        <li class="accout_item">
                            <a href="http://www.jihui88.com/manage_v4/index.html" rel="nofollow">{{user.nickname || user.username}}</a>
                        </li>
                        <li class="exit_item">
                            <a href="javascript:;" rel="nofollow" @click="toLogout">退出</a>
                        </li>
                    </ul>
                </div>
                <div class="main_nav">
                    <ul>
                        <li id="nav_index">
                            <p>
                                <a href="http://www.jihui88.com/">首页</a>
                            </p>
                        </li>
                        <li id="nav_create">
                            <p>
                                <a href="http://www.jihui88.com/create.html">代建</a>
                            </p>
                        </li>
                        <li id="nav_buy">
                            <p>
                                <a href="http://buy.jihui88.com/">购买</a>
                            </p>
                        </li>
                        <li id="nav_demo">
                            <p>
                                <a href="http://www.jihui88.com/demo.html">模板</a>
                            </p>
                        </li>
                        <li id="nav_case" class="hasChild" data-slide="0" ref="button" @click="toggle">
                            <p>
                                <a href="javascript:;">案例</a>
                                <i class="material-icons iconfont">
                                  keyboard_arrow_down
                                </i>
                            </p>
                            <mu-popover :trigger="trigger" :open="open" @close="handleClose">
                              <ol class="header_nav_ol">
                                <li>
                                  <a href="http://case.jihui88.com/case_website.html">网站案例</a>
                                </li>
                                <li>
                                  <a href="http://case.jihui88.com/case_applet.html">小程序案例</a>
                                </li>
                              </ol>
                            </mu-popover>
                        </li>
                        <li id="nav_join">
                            <p>
                                <a href="http://www.ykcs.cn/">加盟</a>
                            </p>
                        </li>
                        <li id="nav_college">
                            <p>
                                <a href="http://xueyuan.jihui88.com/news.html">学院</a>
                            </p>
                        </li>
                        <li id="nav_about">
                            <p>
                                <a href="http://about.jihui88.com/">关于</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="header_btn">
                <div class="pc_btn hidden-xs">
                    <ul class="sign_list btn_list" data-logined="0" v-if="!user.username">
                        <li class="register_item">
                            <a href="javascript:;" rel="nofollow">免费注册</a>
                        </li>
                        <li class="login_item">
                            <a href="javascript:;" rel="nofollow">登录</a>
                        </li>
                    </ul>
                    <ul class="accout_list btn_list" v-if="user.username">
                        <li class="accout_item">
                            <a href="http://www.jihui88.com/manage_v4/index.html" rel="nofollow">{{user.nickname || user.username}}</a>
                        </li>
                        <li class="exit_item">
                            <a href="javascript:;" rel="nofollow" @click="toLogout">退出</a>
                        </li>
                    </ul>
                </div>
                <div class="mobile_menu_btn visible-xs-block">
                    <span class="open_line open_line_1"></span><span class="open_line open_line_2"></span><span class="open_line open_line_3"></span><span class="close_line close_line_1"></span><span class="close_line close_line_2"></span>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!--
    <div class="header">
    <div class="wrap">
      <div class="logo">
        <img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/8a688605-44c1-4729-88b3-c818641b12cc.png" alt="">
      </div>
      <div class="nav">
        <ul>
          <li><a href="http://www.jihui88.com/">首页</a></li>
          <li><a href="http://www.jihui88.com/product_1.html">全网营销云平台</a></li>
          <li><a href="http://www.jihui88.com/applets.html">小程序</a></li>
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
        <mu-icon-menu icon="person" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin" :open="open" @close="handleClose" :width="112" :style="'position: absolute;height:0;right:0;opacity: ' + opacity" v-if="user.username">
          <a href="http://www.jihui88.com/manage_v4/index.html" target="_blank"><mu-menu-item title="新版后台"/></a>
          <a href="http://www.jihui88.com/manage_v3/index.html" target="_blank"><mu-menu-item title="老版后台"/></a>
          <mu-menu-item title="退出" @click="toLogout" />
        </mu-icon-menu>
      </div>
    </div>>
    </div>
  -->
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
      opacity: 0,
      trigger: null
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
  mounted () {
    this.trigger = this.$refs.button
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
            ctx.$store.commit('setLoginUrl', res.headers.requires_auth_url)
            ctx.$parent.$refs.iframe && ctx.$parent.$refs.iframe.open('none')
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
        }, 1000)
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
    handleOpen () {
      this.open = true
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
#jh_header {
    z-index:4;
    width:100%;
    height:70px;
    line-height:70px;
    background:#fff;
    border-bottom:1px solid #e5e5e5;
    box-shadow:0 3px 4px rgba(0,0,0,0.1);
}
#jh_header .header_logo {
    float:left;
}
#jh_header .header_logo a {
    display:block;
    height:70px;
}
#jh_header .header_logo img {
    height:100%;
    vertical-align:top;
    padding-right:15px;
}
#jh_header .header_logo span {
    vertical-align:middle;
    padding-left:15px;
    border-left:1px solid #ccc;
    color:#333;
    font-size:22px;
    font-family:"header_logo_light";
}
#jh_header .header_content {
    float:right;
    font-size:0;
}
#jh_header .header_content .header_nav {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
}
#jh_header .header_content .header_nav .main_nav {

}
#jh_header .header_content .header_nav .main_nav ul {

}
#jh_header .header_content .header_nav .main_nav ul>li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    margin-right:1.5vw;
    height:100%;
    line-height:100%;
    position:relative;
}
#jh_header .header_content .header_nav .main_nav ul>li p {
    position:relative;
}
#jh_header .header_content .header_nav .main_nav ul>li p .iconfont {
    display:inline-flex;
    display:-webkit-inline-flex;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    align-items:center;
    justify-content:center;
    width:10px;
    margin-left:10px;
    font-size:18px;
    color:#999;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
}
#jh_header .header_content .header_nav .main_nav ul>li p:hover .iconfont {
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
    color:#fc6821;
}
#jh_header .header_content .header_nav .main_nav ul>li p a {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    color:#333;
    font-size:16px;
    line-height:1;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
}
#jh_header .header_content .header_nav .main_nav ul>li p.active a,
#jh_header .header_content .header_nav .main_nav ul>li p:hover a {
    color:#fc6821;
}
.header_nav_ol{
    position:absolute;
    left: 26px;
    background:#fff;
    border-radius:4px;
    box-shadow:0 0 20px 0 rgba(0,0,0,0.15);
    padding:10px;
    min-width:120px;
    margin-top:18px;
    -webkit-transform:translateX(-50%);
    transform:translateX(-50%);
}
.header_nav_ol:before {
    content:'';
    display:none;
    position:absolute;
    top:-16px;
    left:50%;
    margin-left:-8px;
    border:8px solid transparent;
    border-bottom-color:#fff;
}
.header_nav_ol li {

}
.header_nav_ol li a {
    display:block;
    line-height:41px;
    text-align:center;
    color:#333;
    font-size:14px;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
}
.header_nav_ol a:hover {
    color:#fc6821;
}
#jh_header .header_content .header_btn {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    margin-left:0.78125vw;
}
#jh_header .header_content .header_btn ul.accout_list {
    display:none;
}
#jh_header .header_content .header_btn ul li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
}
#jh_header .header_content .header_btn ul li.register_item a,
#jh_header .header_content .header_btn ul li.accout_item a {
    display:block;
    min-width:118px;
    height:34px;
    line-height:32px;
    text-align:center;
    font-size:14px;
    border-radius:28px;
    padding:0 15px;
    margin-right:10px;
    border-width:1px;
    border-style:solid;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    color:#fff;
    border-color:#fc6821;
    background:#fc6821;
}
#jh_header .header_content .header_btn ul li.register_item a:hover,
#jh_header .header_content .header_btn ul li.accout_item a:hover {
    border-color:#ff942f;
    background:#ff942f;
}
#jh_header .header_content .header_btn ul li.login_item a,
#jh_header .header_content .header_btn ul li.exit_item a {
    display:block;
    min-width:80px;
    height:34px;
    border-radius:28px;
    text-align:center;
    line-height:32px;
    font-size:14px;
    border-width:1px;
    border-style:solid;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    border-color:#dcdcdc;
    color:#333;
    background:#fff;
}
#jh_header .header_content .header_btn ul li.login_item a:hover,
#jh_header .header_content .header_btn ul li.exit_item a:hover {
    border-color:#999;
    background:#f5f5f5;
}

.jh_container {
    margin:0 auto;
    padding:0 15px;
}

@font-face {font-family: 'header_logo_light';
    src: url('http://at.alicdn.com/t/webfont_rh1tu6i1hw.eot'); /* IE9*/
    src: url('http://at.alicdn.com/t/webfont_rh1tu6i1hw.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('http://at.alicdn.com/t/webfont_rh1tu6i1hw.woff') format('woff'), /* chrome、firefox */
    url('http://at.alicdn.com/t/webfont_rh1tu6i1hw.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('http://at.alicdn.com/t/webfont_rh1tu6i1hw.svg#思源黑体-细') format('svg'); /* iOS 4.1- */
}
@media (min-width: 768px){
    .jh_container {
        width: 765px;
    }
    .visible-xs-block {
        display:none;
    }
    .visible-xs-inline {
        display:none;
    }
    .visible-xs-inline-block {
        display:none;
    }
}
@media (min-width: 992px){
    .jh_container {
        width: 970px;
    }
}
@media (min-width: 1200px){
    .jh_container {
        width: 1170px;
    }
}

@media (max-width: 667px){
  .hidden-xs {
    display:none;
  }
}
@media (max-width: 768px){
  .header_nav{
    display: none !important;
  }
}
@media (min-width: 667px){
  .mobile_menu_btn{
    display: none !important;
  }
}
@media (max-width: 667px){
    .visible-xs-block {
        display:block;
    }
    .visible-xs-inline {
        display:inline;
    }
    .visible-xs-inline-block {
        display:inline-block;
    }
}


@media (min-width: 768px) and (max-width: 991px) {
    .visible-sm-block {
        display:block;
    }
    .visible-sm-inline {
        display:inline;
    }
    .visible-sm-inline-block {
        display:inline-block;
    }
    .hidden-sm {
        display:none;
    }
}
@media (min-width: 992px) and (max-width: 1199px) {
    .visible-md-block {
        display:block;
    }
    .visible-md-inline {
        display:inline;
    }
    .visible-md-inline-block {
        display:inline-block;
    }
    .hidden-md {
        display:none;
    }
}



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
}/* 手机 */
#jh_header .header_content .mobile_header_nav {
    position:absolute;
    width:100%;
    top:70px;
    left:0;
    background:#fff;
    display:none;
}
#jh_header .header_content .header_btn .mobile_menu_btn {
    position:relative;
    width:24px;
    height:24px;
    margin:23px 0;
}
#jh_header .header_content .header_btn .mobile_menu_btn .open_line {
    position:absolute;
    width:100%;
    height:2px;
    background:#333;
    transform-origin:right center;
    -webkit-transition:0.5s;
    transition:0.5s;
}
#jh_header .header_content .header_btn .mobile_menu_btn .open_line_1 {
    top:3px;
    transition-delay:0.15s;
}
#jh_header .header_content .header_btn .mobile_menu_btn .open_line_2 {
    top:11px;
    transition-delay:0.25s;
}
#jh_header .header_content .header_btn .mobile_menu_btn .open_line_3 {
    top:19px;
    transition-delay:0.2s;
}
#jh_header .header_content .header_btn .mobile_menu_btn.active .open_line {
    -webkit-transform:scale(0);
    transform:scale(0);
}
#jh_header .header_content .header_btn .mobile_menu_btn .close_line {
    position:absolute;
    width:100%;
    height:2px;
    top:50%;
}
#jh_header .header_content .header_btn .mobile_menu_btn .close_line_1 {
    -webkit-transform:rotate(45deg);
    transform:rotate(45deg);
}
#jh_header .header_content .header_btn .mobile_menu_btn .close_line_2 {
    -webkit-transform:rotate(135deg);
    transform:rotate(135deg);
}
#jh_header .header_content .header_btn .mobile_menu_btn .close_line:before {
    content:"";
    display:block;
    width:100%;
    height:2px;
    background:#333;
    transform-origin:left center;
    -webkit-transform:scale(0);
    transform:scale(0);
    -webkit-transition:0.5s;
    transition:0.5s;
}
#jh_header .header_content .header_btn .mobile_menu_btn.active .close_line:before {
    -webkit-transform:scale(1);
    transform:scale(1);
}
#jh_header .header_content .header_btn .mobile_menu_btn.active .close_line_1:before {
    transition-delay:0.15s;
}
#jh_header .header_content .header_btn .mobile_menu_btn.active .close_line_2:before {
    transition-delay:0.2s;
}


#jh_header .header_content .mobile_header_nav .btn_list {
    line-height:normal;
}
#jh_header .header_content .mobile_header_nav .btn_list li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    width:50%;
}
#jh_header .header_content .mobile_header_nav .btn_list li a {
    display:block;
    text-align:center;
    font-size:14px;
    line-height:4;
}
#jh_header .header_content .mobile_header_nav .btn_list li.register_item a,
#jh_header .header_content .mobile_header_nav .btn_list li.accout_item a {
    background:#ff942f;
    color:#fff;
}
#jh_header .header_content .mobile_header_nav .btn_list li.login_item a,
#jh_header .header_content .mobile_header_nav .btn_list li.exit_item a {
    background:#eee;
    color:#333;
}
#jh_header .header_content .mobile_header_nav .accout_list {
    display:none;
}
#jh_header .header_content .mobile_header_nav .main_nav {

}
#jh_header .header_content .mobile_header_nav .main_nav ul {

}
#jh_header .header_content .mobile_header_nav .main_nav ul>li {
    line-height:normal;
    border-bottom:1px solid #eee;
    text-align:center;
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li:last-child {
    border-bottom:0 none;
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li p {
    position:relative;
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li p a {
    color:#333;
    font-size:14px;
    line-height:4;
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li p .iconfont {
    font-size:18px;
    color:#999;
    position:absolute;
    top:50%;
    margin-left:5px;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li p .iconfont:before {
    content:"\e7c3";
}
#jh_header .header_content .mobile_header_nav .main_nav ul>li p.active .iconfont {
    -webkit-transform:translateY(-50%) rotate(180deg);
    transform:translateY(-50%) rotate(180deg);
}
#jh_header .header_content .mobile_header_nav .main_nav ol {
    display:none;
    background:#eee;
    position:relative;
}
#jh_header .header_content .mobile_header_nav .main_nav ol:before {
    content:'';
    display:block;
    position:absolute;
    top:-16px;
    left:50%;
    margin-left:-8px;
    border:8px solid transparent;
    border-bottom-color:#eee;
}
#jh_header .header_content .mobile_header_nav .main_nav ol li {
    border-bottom:1px solid #ccc;
}
#jh_header .header_content .mobile_header_nav .main_nav ol li:last-child {
    border-bottom:0 none;
}
#jh_header .header_content .mobile_header_nav .main_nav ol li a {
    display:block;
    line-height:4;
    text-align:center;
    color:#333;
    font-size:14px;
}
</style>
