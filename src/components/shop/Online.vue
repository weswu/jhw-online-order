<template>
  <div id="fixed_box">
  <!--在线QQ-->
    <div class="fixed_symble" @click="toggle=true" v-if="!toggle">
        <img width="40" height="133" src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//04//11/537fcf55-4a38-431d-aecd-39e02843630b.png" alt="在线咨询"/>
    </div>
    <div class="fixed_content" v-if="toggle">
        <div class="fixed_close" @click="toggle=false">
            <i class="material-icons">clear</i>
        </div>
        <div class="fixed_qq">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2594969476&site=qq&menu=yes" rel="nofollow"><div class="avatar_wrap">
                <div class="qq_avatar">
                    <img width="75" height="75" src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//09//29/2a7a24ad-fab0-4a79-9e1f-cc13d6cc7b31.jpg" alt="在线客服"/>
                </div>
            </div><span>建站咨询</span></a>
        </div>
        <div class="fixed_tel">
            <p>
                加盟热线
            </p><span><a rel="nofollow" href="tel:13819977477">13819977477</a></span>
            <p>
                客服热线
            </p><span><a rel="nofollow" href="tel:18966175526">18966175526</a></span>
        </div>
        <div class="fixed_code">
            <div class="code_info">
                <div class="code_pic">
                    <img width="100" height="100" src="http://dfwjjingtai.b0.upaiyun.com/upload//a//a4//applet//picture//2018//11//24/773fe2b7-7e90-4649-aa5e-0becce66addb.jpeg" alt="机汇网公众号"/>
                </div>
                <p>
                    关注公众号
                </p>
            </div>
            <div class="back_top" @click="backTop()">
              <img src="/static/top.png" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      toggle: false
    }
  },
  methods: {
    backTop () {
      let back = setInterval(() => {
        if (document.body.scrollTop || document.documentElement.scrollTop) {
          document.body.scrollTop -= 30
          document.documentElement.scrollTop -= 30
        } else {
          clearInterval(back)
        }
      })
    }
  }
}
</script>
<style lang="css">
/* 在线QQ */
#fixed_box {
    position:fixed;
    z-index:10000;
    right:0;
    top:50%;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
}
#fixed_box .fixed_symble {
    cursor:pointer;
}
#fixed_box .fixed_content {
    border:1px solid #ddd;
    border-radius:10px;
    background:#F9FAFB;
    position:relative;
}
#fixed_box .fixed_content .fixed_close {
    position:absolute;
    top:-12px;
    right:5px;
    display:flex;
    display:-webkit-flex;
    justify-content:center;
    align-items:center;
    width:24px;
    height:24px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    background:#F9FAFB;
    border:1px solid #ddd;
}
#fixed_box .fixed_content .fixed_close .material-icons {
    font-size:18px;
    color:#666;
    cursor: pointer;
}
#fixed_box .fixed_content .fixed_qq {
    width:120px;
    height:121px;
    border-bottom:1px solid #ddd;
    background:url(http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//04//11/587a8d0b-107a-4d31-9791-2c1f143872ca.png) center 9px no-repeat;
}
#fixed_box .fixed_content .fixed_qq span {
    display:block;
    width:100%;
    text-align:center;
    color:#ff6700;
    font-size:14px;
    margin-top:10px;
}
#fixed_box .fixed_content .fixed_qq .avatar_wrap {
    padding-top:10px;
}
#fixed_box .fixed_content .fixed_qq .qq_avatar {
    width:75px;
    height:75px;
    border-radius:50%;
    overflow:hidden;
    display:block;
    margin:0 auto;
    -webkit-transition:all 0.3s;
    transition:all 0.3s;
}
#fixed_box .fixed_content .fixed_qq a:hover .qq_avatar {
    -webkit-transform:scale(1.05);
    transform:scale(1.05);
}
#fixed_box .fixed_content .fixed_tel {

}
#fixed_box .fixed_content .fixed_tel p {
    color:#000;
    font-size:14px;
    line-height:1;
    text-align:center;
    margin-top:10px;
}
#fixed_box .fixed_content .fixed_tel span {
    display:block;
    font-size:14px;
    line-height:2;
    text-align:center;
    border-bottom:1px solid #ddd;
}
#fixed_box .fixed_content .fixed_tel span a {
    color:#ff6700;
}
#fixed_box .fixed_content .fixed_code {
    font-size:0;
    text-align:center;
}
#fixed_box .fixed_content .fixed_code .code_info {
    border-bottom:1px solid #ddd;
}
#fixed_box .fixed_content .fixed_code .code_info .code_pic {
    padding:10px;
    padding-bottom:0;
}
#fixed_box .fixed_content .fixed_code .code_info p {
    color:#000;
    font-size:14px;
    text-align:center;
    line-height:2;
    padding-bottom:10px;
}
#fixed_box .fixed_content .fixed_code .back_top {
    display:inline-block;
    *display:inline;
    *zoom:1;
    vertical-align:middle;
    width:50%;
    height:55px;
    cursor: pointer;
}
#fixed_box .fixed_content .fixed_code .back_top img {
  padding-top: 8px;
}
</style>
