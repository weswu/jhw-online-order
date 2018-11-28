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
                            <a href="javascript:;" rel="nofollow" @click="toLogin('signup')">免费注册</a>
                        </li>
                        <li class="login_item">
                            <a href="javascript:;" rel="nofollow" @click="toLogin">登录</a>
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
                            <p class="active">
                                <a href="http://buy.jihui88.com/">购买</a>
                            </p>
                        </li>
                        <li id="nav_demo">
                            <p>
                                <a href="http://www.jihui88.com/demo.html">模板</a>
                            </p>
                        </li>
                        <li id="nav_case" class="hasChild" data-slide="0" ref="button" @click="toggle" style="cursor: pointer;">
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
                                <a href="http://www.ykcs.cn/" target="_blank">加盟</a>
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
                            <a href="javascript:;" rel="nofollow" @click="toLogin('signup')">免费注册</a>
                        </li>
                        <li class="login_item">
                            <a href="javascript:;" rel="nofollow" @click="toLogin">登录</a>
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
            </div>
        </div>
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

/* 自适应 */
@media (min-width: 768px){
    .jh_container {
        width: 769px;
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


@media (min-width: 768px) and (max-width: 993px) {
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

</style>
