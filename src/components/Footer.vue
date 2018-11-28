<template>
  <div id="jh_footer">
      <div class="footer_info">
          <div class="jh_container">
              <div class="footer_info_wrapper">
                  <div class="info_block block_1">
                      <div class="block_title">
                          <div class="block_title_txt">
                              关于机汇
                          </div>
                          <i class="material-icons visible-xs-block" @click="icon1 === 'add' ? (icon1 = 'remove') : (icon1 = 'add')">{{icon1}}</i>
                      </div>
                      <div class="block_list" :style="icon1 === 'remove' ? 'display: block;' : ''">
                          <ul>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">公司简介</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">机汇动态</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">发展历程</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">企业文化</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="info_block block_2">
                      <div class="block_title">
                          <div class="block_title_txt">
                              用户服务
                          </div>
                          <i class="material-icons visible-xs-block" @click="icon2 === 'add' ? (icon2 = 'remove') : (icon2 = 'add')">{{icon2}}</i>
                      </div>
                      <div class="block_list" :style="icon2 === 'remove' ? 'display: block;' : ''">
                          <ul>
                              <li>
                                  <a href="mailto:2932555181@qq.com">意见反馈</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.ykyh.com/news-detail-122448.html">机汇网协议</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.jihui88.com/agent_v4/index.html">经销商资格</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="info_block block_3">
                      <div class="block_title">
                          <div class="block_title_txt">
                              产品与服务
                          </div>
                          <i class="material-icons visible-xs-block" @click="icon3 === 'add' ? (icon3 = 'remove') : (icon3 = 'add')">{{icon3}}</i>
                      </div>
                      <div class="block_list" :style="icon3 === 'remove' ? 'display: block;' : ''">
                          <ul class="list_left">
                              <li>
                                  <a target="_blank" href="http://www.ykyh.com">网站/手机网站</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.jihui88.com/seo.html">SEO推广</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://wcd.jihui88.com">微传单</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.jihui88.com/brain.html">企业大脑</a>
                              </li>
                          </ul>
                          <ul class="list_right">
                              <li>
                                  <a target="_blank" href="http://www.jihui88.com/applet.html">小程序</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://zc.jihui88.com">机汇众筹</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.jihui88.com/card.html">机汇名片</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2594969476&site=qq&menu=yes">更多服务</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="info_block block_4">
                      <div class="block_title">
                          <div class="block_title_txt">
                              商务合作
                          </div>
                          <i class="material-icons visible-xs-block" @click="icon4 === 'add' ? (icon4 = 'remove') : (icon4 = 'add')">{{icon4}}</i>
                      </div>
                      <div class="block_list" :style="icon4 === 'remove' ? 'display: block;' : ''">
                          <ul>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">联系我们</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://www.ykcs.cn">加盟机汇</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="info_block block_5">
                      <div class="block_title hidden-xs">
                          <div class="block_title_txt">
                              资质证书
                          </div>
                          <i class="material-icons visible-xs-block">add</i>
                      </div>
                      <div class="block_list">
                          <ul>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">营业执照</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">高新技术企业</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">优秀服务机构</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">重点文化企业</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">实践基地</a>
                              </li>
                              <li>
                                  <a target="_blank" href="http://about.jihui88.com">战略合作伙伴</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div class="info_block block_6">
                      <div class="block_title hidden-xs">
                          <div class="block_title_txt">
                              关注机汇
                          </div>
                      </div>
                      <div class="block_list">
                          <img src="http://img.jihui88.com/upload/a/a1/about/picture/2018/11/28/14686729-9745-474c-bce1-2f671009b691.jpg"/>
                      </div>
                  </div>
              </div>
              <div class="info_friendlink hidden-xs">
                  <div class="info_friendlink_title">
                      友情链接
                  </div>
                  <ul>
                      <li>
                          <a target="_blank" href="http://www.ykit.net" title="东方五金网">东方五金网</a>
                      </li>
                      <li>
                          <a target="_blank" href="http://www.ykyh.com" title="自助建站">自助建站</a>
                      </li>
                      <li>
                          <a target="_blank" href="http://www.ykcs.cn" title="加盟中心">加盟中心</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="footer_copyright">
          <div class="jh_container">
              <div class="copyright_wrapper">
                  <p class="copyright_info">
                      <span>Copyright © 浙江机汇网络科技有限公司</span>
                  </p>
                  <p class="psr_link hidden-xs">
                      <a traget="_blank" href="javascript:;"><em><img src="http://dfwjjingtai.b0.upaiyun.com/upload//k//k3//kokbd//picture//2018//11//05/35bf7990-32df-4549-8389-0d6eb4ac9f36.png"/></em><span>网安备案</span></a><span>浙ICP备14038176号</span>
                  </p>
              </div>
              <ul class="hidden-xs hidden-sm">
                  <li>
                      <a traget="_blank" href="http://www.jihui88.com/sitemap.xml">Sitemap</a>
                  </li>
                  <li>
                      <a traget="_blank" href="http://www.jihui88.com/manage_v4/login.html">后台登录</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon1: 'add',
      icon2: 'add',
      icon3: 'add',
      icon4: 'add'
    }
  }
}
</script>
<style lang="less">
/* 底部 */
#jh_footer {
  background:#2c2c2c;
  .jh_container {
    margin: 0 auto;
    padding: 0 15px;
  }
}
#jh_footer .footer_info {
    padding:64px 0 40px;
    border-bottom-width:1px;
    border-bottom-style:solid;
    border-color:#343434;
}
#jh_footer .footer_info .footer_info_wrapper {
    display:flex;
    display:-webkit-flex;
    align-items:flex-start;
    justify-content:space-between;
}
#jh_footer .footer_info .info_block {

}
#jh_footer .footer_info .info_block .block_title {
    margin-bottom:20px;
    position:relative;
}
#jh_footer .footer_info .info_block .block_title .block_title_txt {
    width:100%;
    font-size:15px;
    line-height:20px;
    position:relative;
    color:#5d5d5d;
}
#jh_footer .footer_info .info_block .block_title .material-icons {
    position:absolute;
    top:0;
    right:0;
    width:20px;
    height:20px;
    line-height:20px;
    text-align:center;
    font-size:14px;
    color:#5d5d5d;
    cursor: pointer;
}
#jh_footer .footer_info .info_block .block_list {

}
#jh_footer .footer_info .info_block .block_list ul {
    font-size:0;
}
#jh_footer .footer_info .info_block .block_list ul li {
    margin-bottom:20px;
}
#jh_footer .footer_info .info_block .block_list ul li a {
    font-size:15px;
    line-height:20px;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    color:#5d5d5d;
}
#jh_footer .footer_info .info_block .block_list ul li a:hover {
    color:#fc6821;
}
#jh_footer .footer_info .block_3 ul {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:top;
}
#jh_footer .footer_info .block_3 ul.list_right {
    margin-left:1.875vw;
}
#jh_footer .footer_info .block_5 .block_list {
    max-width:162px;
}
#jh_footer .footer_info .block_5 .block_list ul li,
#jh_footer .footer_info .block_5 .mobile_block_list ul li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:top;
    margin:0 5px 2px 0;
    padding:5px;
    width:76px;
    height:46px;
    text-align:center;
    border-width:1px;
    border-style:solid;
    position:relative;
    border-color:#5d5d5d;
}
#jh_footer .footer_info .block_5 .block_list ul li:after,
#jh_footer .footer_info .block_5 .mobile_block_list ul li:after {
    content:"";
    display:block;
    width:50%;
    height:1px;
    position:absolute;
    bottom:10px;
    left:25%;
    background-color:#5d5d5d;
}
#jh_footer .footer_info .block_5 .block_list ul li a,
#jh_footer .footer_info .block_5 .mobile_block_list ul li a {
    display:block;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:12px;
    line-height:23px;
    color:#5d5d5d;
}
#jh_footer .footer_info .block_6 .block_list,
#jh_footer .footer_info .block_6 .mobile_block_list {
    max-width:120px;
}
#jh_footer .footer_info .block_6 .block_list img,
#jh_footer .footer_info .block_6 .mobile_block_list img {
    display:block;
    width:100%;
}
#jh_footer .info_friendlink {
    margin-top:15px;
}
#jh_footer .info_friendlink .info_friendlink_title {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    margin-right:1.3vw;
    font-size:14px;
    color:#5d5d5d;
}
#jh_footer .info_friendlink ul {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
}
#jh_footer .info_friendlink ul li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    margin-right:1.3vw;
}
#jh_footer .info_friendlink ul li a {
    font-size:14px;
    line-height:1;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    color:#5d5d5d;
}
#jh_footer .info_friendlink ul li a:hover {
    color:#fc6821;
}
#jh_footer .footer_copyright {
    height:75px;
    padding:27.5px 0;
    text-align:center;
    font-size:0;
    border-top-width:1px;
    border-top-style:solid;
    border-color:#202020;
}
#jh_footer .footer_copyright .copyright_wrapper {
    float:left;
}
#jh_footer .footer_copyright p {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    font-size:13px;
    line-height:20px;
    padding:0 10px;
    color:#777;
}
#jh_footer .footer_copyright p:first-child {
    padding-left:0;
    border-right-width:1px;
    border-right-style:solid;
    border-color:#777;
}
#jh_footer .footer_copyright p:nth-child(2) span {
    padding-left:10px;
}
#jh_footer .footer_copyright p i,
#jh_footer .footer_copyright p em,
#jh_footer .footer_copyright p a,
#jh_footer .footer_copyright p span {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
}
#jh_footer .footer_copyright p a {
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    color:#777;
}
#jh_footer .footer_copyright ul {
    float:right;
}
#jh_footer .footer_copyright ul li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    margin:0 3px;
}
#jh_footer .footer_copyright ul li a {
    font-size:13px;
    line-height:20px;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
    color:#777;
}
#jh_footer .footer_copyright ul li a:hover {
    color:#fc6821;
}
/* 手机 */
@media (max-width:767px) {
    #jh_footer .footer_info {
        padding:32px 0 20px 0;
    }
    #jh_footer .footer_info .footer_info_wrapper {
        flex-wrap:wrap;
    }
    #jh_footer .footer_info .info_block {
        width:100%;
    }
    #jh_footer .footer_info .block_5 {
        max-width:50%;
    }
    #jh_footer .footer_info .info_block .block_list {
        display:none;
    }
    #jh_footer .footer_info .info_block .block_list ul {
        display:block;
        width:100%;
        margin:0;
        padding-left:15px;
    }
    #jh_footer .footer_info .info_block .block_list ul li a {
        font-size:13px;
        line-height:20px;
        -webkit-transition:all 0.3s;
        transition:all 0.3s;
        border-color:#999;
    }
    #jh_footer .footer_info .info_block .block_title .block_title_txt {
        padding-right:20px;
    }
    #jh_footer .footer_copyright {
        height:auto;
        padding:15px 0;
    }
    #jh_footer .footer_copyright .copyright_wrapper {
        float:none;
    }
    #jh_footer .footer_copyright p {
        display:block;
        width:100%;
    }
    #jh_footer .footer_copyright p:first-child {
        border-right:0 none;
    }
}
@media (max-width: 767px) {
  #jh_footer .hidden-xs {
      display: none;
  }
}

</style>
