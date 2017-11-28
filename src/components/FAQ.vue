<template lang="html">
  <div class="shop-group-wrap">
    <div class="shop-group" style="background:none">
      <div class="shop-icon" style="background:none"></div>
      <div class="shop-cont" style="background:#fff">
        <div>
          <p class="shop-group-title">常见问题<span></span></p>
          <div v-for="(item, index) in faq" :key="item.name">
            <div class="ask">
              <img src="/static/q.png"/><span>{{item.ask}}</span>
            </div>
            <div class="answer">
              <span v-html="item.answer"></span>
              <em></em>
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
      faq: [
        {
          ask: '你们与其它网站建设公司有哪些区别和优势？',
          answer: '我们线下团队以营销型网站制作为主，网站设计风格随时自由切换、网站功能栏目不受限的自由增加、网站首页内容自由规划、近50个网站功能提供给您自由选择。<br/>【机汇网】以营销效果、功能方便为核心的6大优势：<br/>1、强大的研发能力，18项国家级专利/高新技术企业/CMMI认证 <br/>2、全网营销理论体系完善，落地工具简单，实操经验丰富 <br/>3、专业网络策划、精准定位、全网营销 <br/>4、专业网站精美设计，系统每周升级 <br/>5、10000家服务成功经验 <br/>6、15年专注全网营销'
        },
        {
          ask: '网站在使用中遇到问题该怎么办？',
          answer: '您可以通过QQ的方式与我们进行在线咨询，QQ号：2594969476或者拨打我们的咨询热线4007111011进行咨询。<br/>经验丰富的设计师在线协助设计。'
        },
        {
          ask: '网站购买后有正式合同、正式发票吗？',
          answer: '您好，有的，购买后我们可以提供纸质合同和正规机打发票给您。'
        },
        {
          ask: '网站购买后，提供什么服务？',
          answer: '您购买网站产品之后，我们会给您开通相应的<b>产品、空间、功能和增值服务</b>，您在建站过程中的疑问，都可以直接通过QQ、微信在线咨询我们或者电话热线进行咨询。'
        },
        {
          ask: '除了网站建设，你们还有哪些产品、服务？',
          answer: '精美网站、微网站、商城、微商城、小程序、微信运营、网站运营，机汇网全网营销云，一站式、性价比最高，服务内容最全。'
        },
        {
          ask: '购买了网站产品之后，想升级或购买其他产品与服务可以吗？',
          answer: '可以的，所有产品与服务都可以随时购买，需要您补交差价即可。'
        },
        {
          ask: '网站能在百度收录吗？排名如何保证？',
          answer: '我们保证您的网站可以被百度搜索引擎收录。排名我们提供【关键词监测】功能，以实现按排名付费。'
        },
        {
          ask: '我支付了网站费用之后，什么时候可以开通使用？',
          answer: '您支付费用以后，我们会在24小时内及时联系您，给您开通相应的网站功能，并进行域名解析绑定，域名解析生效以后就可以正常打开网站。'
        },
        {
          ask: '我要支付网站费用，都支持什么付款方式？',
          answer: '网站后台支持支付宝、微信支付、网银、积分支付4种支付方式，如果您需要汇款转账，请注明会员名称。'
        },
        {
          ask: '【积分支付】是怎么来的？如何使用？',
          answer: '积分是根据您使用网站后台的活跃度（登录、机汇网APP、通过APP修改、维护等）、通过您介绍其他会员的注册、购买来获得，其中你介绍会员的购买可以获得<b>同比数量的积分</b>。通过邀请码：关系永久绑定、累计积分，把各类文字、图片分享到朋友圈即可。<br/>积分可以当现金使用，按10积分换1元，也可以提现。'
        },
        {
          ask: '购买网站服务器还花钱吗？',
          answer: '您在购买网站产品都是包含对应产品的网站空间费用，是不需要另外单独付费的。'
        },
        {
          ask: '购买了网站我不会域名解析怎么办？',
          answer: '如果域名是您自己的，我们会给您进行域名解析操作。'
        },
        {
          ask: '网站空间使用不够了怎么办？',
          answer: '网站空间有5G，真不够用了，可以单独付费进行扩容。也可以到阿里云购买。'
        },
        {
          ask: '网站可以不备案吗？',
          answer: '可以，如果您不想备案，我们会将您的网站放在香港、海外服务器上。'
        },
        {
          ask: '网站有几种语言版本？',
          answer: '我们目前支持的多语言类型有：简体中文，繁体中文，英文，日文，韩文多语言类型。'
        },
        {
          ask: '付费后可以退款吗？',
          answer: '可以。以下情况可以退费，<br/>1、7天内无条件退款；<br/>2、超过3个月百度不收录网站任何信息；<br/>3、支付费用后，不提供域名注册服务。<br/>其他情况请仔细核对网站服务内容。超出服务内容不做退费处理。'
        },
        {
          ask: '能去掉【技术支持：机汇网】 吗？',
          answer: '我们目前的价格是并不赢利的,所以技术支持,仅做为我们的一个宣传窗口,不影响你的网站.如果你坚持要去掉.这个是收费的,300元/永久去掉。'
        },
        {
          ask: '我不会建站，购买后我要怎么操作？',
          answer: '我们网站秉持着简单操作，通俗易懂的理念进行建站操作，我们网站后台也是有建站帮助文档、操作视频，按照文档操作就可以学会后台操作。<br/>如果不想自己操作，可以购买我们的设计、增值服务来委托我们帮您建站，这样子效率更高、效果更好！'
        },
        {
          ask: '我的网站以前备案过，购买之后还需要重新备案吗？',
          answer: '如果您的网站之前是在阿里云备案，购买之后无需重新备案。如果您的网站备案不是阿里云备案，需要做备案接入操作。'
        }
      ]
    }
  }
}
</script>

<style lang="css">
.ask {
    overflow: hidden;
    margin-bottom: 20px;
}
.ask img {
  width: 25px;
  vertical-align: middle;}
.ask span {
    display: inline-block;
    padding-left: 5px;
    height: 30px;
    line-height: 30px;
}
.answer {
    position: relative;
    margin-bottom: 20px;
    font-size: 14px;
    color: #555;
    padding: 20px;
    background-color: #F8F8F8;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -webkit-border-radius: 5px;
}
.answer em {
    position: absolute;
    top: -10px;
    left: 20px;
    display: block;
    width: 0;
    height: 0;
    border-color: #F8F8F8 transparent;
    border-style: solid;
    border-width: 0 10px 10px;
}
</style>
