const state = {
  showDesigner: false,
  totalPrice: 0,
  priceItemIds: '',
  designerId: '',
  magenif: 1,
  year: 1,
  yearList: [1, 2, 3, 5, 10],
  shopFunction: [
    {
      title: '常规功能 (免费)',
      icon: 'standard.png',
      groups: [
        {
          title: '',
          needCheck: false,
          type: 'check',
          price: 0,
          items: [
            {name: '文章发布', html: '功能说明：<br/>支持文章多级分类，关键词标签，不限文章发布数量，定时发送等各种CMS功能。'},
            {name: '产品发布', html: '功能说明：<br/>支持产品多级分类，关键词标签，不限产品发布数量，支持批量导入导出，图片SEO等。'},
            {name: '栏目定义', html: '功能说明：<br/>支持栏目多级分类，不限栏目发布数量，每个栏目独立SEO。'},
            {name: '多级页面', html: '功能说明：<br/>支持网站多级页面，可在网页中添加次级页面链接。'},
            {name: '在线相册', html: '功能说明：<br/>支持相册分组分类，炫酷的图片展示效果，满足对图片较多的客户，展示效果的多样化需求。'},
            {name: '会员注册', html: '功能说明：<br/>支持用户注册成为本网站会员，支持微信、QQ快捷登录，实现邀请码功能。'},
            {name: '实力证书', html: '功能说明：<br/>此功能主要用于给网站增加公信力，发布各类机构颁发的证明、荣誉、资格、专利证书等。'},
            {name: '在线客服', html: '功能说明：<br/>此功能主要用于给网站增加在线客服沟通方式，让对你网站产品或服务有需求的客户便捷的与您沟通咨询。目前可以设置网站内置客服、QQ在线或其他第三方在线客服。'},
            {name: '留言板', html: '功能说明：<br/>访客可以在留言板中进行快速留言，管理员可以在手机APP、微信公众号、网站后台查看访客留言并回复访客的留言。'},
            {name: '标准公信力', html: '功能说明：<br/>提高网站公信力，支持公安备案，ICP备案，工商亮照，实地认证等。如何提高网站公信力？'},
            {name: 'APP管理', html: '功能说明：<br/>网站管理员可以在手机上快捷、高效的维护、管理网站信息，处理商机，获得积分。'},
            {name: '微信管理', html: '功能说明：<br/>与微信公众号关联后，网站管理员可以在微信上快捷、高效的维护、管理网站信息，处理商机，获得积分。'},
            {name: '分权管理', html: '功能说明：<br/>网站管理员可以创建子管理员并分配管理权限，实现不同管理员对网站后台内容及功能的不同管理。'},
            {name: '社交分享', html: '功能说明：<br/>访客在浏览网站时可以方便分享网站的产品和新闻，来提升网站的优质外链、增加社会化流量、带来更多的用户!'},
            {name: '每页关键词', html: '功能说明：<br/>在网站后台添加每个页面的关键字，定义URL，html页面静态化让访问者最大程度的搜索到公司内容。'},
            {name: '站点地图', html: '功能说明：<br/>自动生成匹配各大搜索引擎的站点地图，让搜索引擎收录、抓取更多的页面，让网站排名更靠前。'},
            {name: '关键词库', html: '功能说明：<br/>管理员可以在网站后台添加各种组合关键词，在设置SEO模板时可以随时抽取，提高SEO效果。'},
            {name: '数据统一', html: '功能说明：<br/>手机端、PC端、微信端、小程序的各类数据，通过统一接口展示产品，新闻，栏目等相关数据，只需维护一次。'},
            {name: '数据分析', html: '功能说明：<br/>管理员可以在网站后台查看网站的各项数据；如：<br/>A、网站产品、新闻访问数据<br/>B、网站会员数据分析<br/>C、商城销售数据<br/>D、网站登录日志分析<br/>E、SEO排名数据'},
            {name: '批量导入', html: '功能说明：<br/>网站管理员可以对网站的文章、产品、订单、会员等各项数据进行导出导入。'},
            {name: '定期备份', html: '功能说明：<br/>网站管理员可以对网站的文章、产品、订单、会员等各项数据进行导出导入。'},
            {name: '无缝升级', html: '功能说明：<br/>手机端、PC端、微信端、小程序等的各类数据无缝升级，版本无缝升级，SEO无缝升级，每周迭代升级。'},
            {name: '后台APP', html: '<img src="http://dfwjjingtai.b0.upaiyun.com/upload//j//j2//jihui88//picture//2017//03//06/f43c65d5-b300-47de-89b4-91754a91d02e.png"/><br>扫一扫，立即下载'}
          ]
        }
      ]
    },
    {
      title: '基础类',
      icon: 'base.png',
      groups: [
        {
          title: '域名',
          sub: '自有域名免费绑定',
          name: 'domain',
          needCheck: true,
          type: 'radio',
          price: 0,
          value: '297e26696001918601600213ce290047',
          items: [
            {name: '自有域名', price: 0, value: '297e26696001918601600213ce290047', html: '详细说明：<br/>客户已经购买独立域名，使用自己的域名指向绑定。'},
            {name: '申请域名', price: 100, value: '297e26696001918601600215039f004f', unit: '元/年', html: '详细说明：<br/>客户未注册独立域名，需由机汇网注册购买。'}
          ]
        },
        {
          title: '委托服务',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '自助ICP备案', price: 100, value: '297e266960019186016002193c9a0060', unit: '元', html: '服务说明：<br/>机汇网提供备案入口，客户自助进行网站备案操作，机汇网提供指导说明。'},
            {name: '委托ICP备案', price: 300, value: '297e266960019186016002195ebf0063', unit: '元', html: '服务说明：<br/>A、帮助您完成网站ICP备案<br/>B、客户需提供网站备案所需资料并配合完成'},
            {name: '自助网安备案', price: 100, value: '297e266960019186016002198ec20065', unit: '元', html: '服务说明：<br/>机汇网提供备案入口，客户自助进行网安备案操作，机汇网提供指导说明。'},
            {name: '委托网安备案', price: 300, value: '297e26696001918601600219bb2a0068', unit: '元', html: '服务说明：<br/>A、帮助您完成网站网安备案<br/>B、客户需提供网站网安备案所需资料并配合完成'},
            {name: '去技术支持', price: 300, value: '297e26696001918601600219f94d006b', unit: '元', html: '服务说明：<br/>去掉网站底部的技术支持和管理登陆按钮。'},
            {name: '全网营销培训', price: 100, value: '297e2669600191860160021a2264006d', unit: '元', html: '服务说明：<br/>为您提供一对一培训，让您成为建站专家<br/>A、以任务的形式引导您熟悉后台操作逻辑<br/>B、以任务的形式引导您掌握后台操作设置'},
            {name: '公众号申请', price: 300, value: '297e2669600191860160021a516d0070', unit: '元', html: '服务说明：<br/>为客户注册和认证微信公众号<br/>A、客户需提供注册和认证的相关资料<br/>B、300元(不包含腾讯收取300元认证费）'},
            {name: '公众号配置', price: 200, value: '297e2669600191860160021a7ed50072', unit: '元', html: '服务说明：<br/>A、帮您进行微信接口与微网站后台对接B、帮您进行网站微信菜单配置<br/>C、帮您进行网站关注回复语配置'},
            {name: '即时通讯绑定', price: 100, value: '297e2669600191860160021aa7540075', unit: '元', html: '服务说明：<br/>绑定类似QQ客服、百度商桥、第三方等网站即时通讯插件。'},
            {name: '地图定位', price: 300, value: '297e2669600191860160021b5019007c', unit: '元', html: '服务说明：<br/>在相关栏目中插入百度，高德地图的公司地址，并且实现一键导航到公司。'}
          ]
        }
      ]
    },
    {
      title: '设计制作',
      icon: 'design.png',
      groups: [
        {
          title: '界面设计',
          name: 'layout',
          needCheck: true,
          type: 'radio',
          price: 0,
          value: '297e2669600191860160021b8fcc007f',
          custom: true,
          items: [
            {name: '自选模板', price: 0, value: '297e2669600191860160021b8fcc007f', html: '详细说明： <br/>可以使用所有网站模板，包括：电脑版、手机版、微信版、商城、小程序。'},
            {name: '定制设计', price: 0, value: '297e2669600191860160021c49970083', html: '详细说明： <br/>由经验丰富的专业设计师来定制网站相关内容。价格=基础价格X设计师经验值'}
          ]
        },
        {
          title: '设计项目',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          magenif: true,
          items: [
            {name: '网站群建设', price: 1200, value: '297e2669600191860160021c7c1c0086', disabled: false, unit: '元', html: '服务说明：<br/>集团公司、上市公司、多产品类企业网站群，对规划要求高。'},
            {name: '定位策划', price: 2000, value: '297e2669600191860160021ca3080088', disabled: false, unit: '元', html: '服务说明：<br/>梳理出网站盈利模式、目标客户定位、核心产品定位、产品卖点定位、关键词定位、品牌定位；然后再设计。'},
            {name: '栏目规划', price: 600, value: '297e2669600191860160021cf065008d', disabled: false, unit: '元', html: '服务说明：<br/>根据商业定位规划：主导航布局、关键词、关键图<b>吸引访问者</b>；打造让访问者立刻对号座的副导航，<b>留住访问者</b>；'},
            {name: '页面成交逻辑', price: 2000, value: '297e2669600191860160021ccaad008b', disabled: false, unit: '元', html: '服务说明：<br/>我是做什么的？我的优势是？为什么要选择我？为什么要相信我？为什么要马上联系我？<b>......咨询即送《成交模型图》</b>。<br/>招商类、工程类、项目类、定制类、零售页面都需要策划成交逻辑，成交访问者。'},
            {name: '首页定制', price: 800, value: '297e2669600191860160021d84ac0091', disabled: false, unit: '元', html: '服务说明：（首页定制费用800元/3屏内）<br/>A、支付后，客户需提供参考网站供机汇网参考；<br/>B、客户可以提供已经做好的网站设计图；<br/>C、客户所提参考网站或设计图，经过评估，需符合机汇网系统支持；<br/>D、如客户提供的参考网站或设计图，机汇网系统不支持，可以将首页定制费退还。'},
            {name: '产品布局', price: 800, value: '297e2669600191860160021dffbe0094', disabled: false, unit: '元', html: '服务说明：<br/>点2次找到想要的产品，恰到好处的推荐关联的产品，提高重点产品的点击量，引流产品、利润产品、新产品的布局策划。'},
            {name: '公信力建设', price: 900, value: '297e2669600191860160021e2ba60097', disabled: false, unit: '元', html: '服务说明：<br/>网络成交关键看访问者是否相信你，打造强大的公信力有八大方式，我们经验丰富。<b>......咨询即送《网站公信力的因素》</b>'},
            {name: 'LOGO设计', price: 200, value: '297e2669600191860160021e6c5c009a', disabled: false, unit: '元', html: '服务说明：<br/>为您网站设计一个LOGO，提升企业形象<br/>A、定稿前限3次修改<br/>B、资深设计师创作'},
            {name: '广告图设计', price: 200, value: '297e2669600191860160021ea3df009c', disabled: false, unit: '元', html: '服务说明：<br/>A、需由客户提供图片素材及广告语；<br/>B、客户提供素材需要清晰（无水印）；<br/>C、提供广告图PSD源文件给客户。'},
            {name: '按钮图标制作', price: 300, value: '297e2669600191860160021ed7fd009f', disabled: false, unit: '元', html: '服务说明：<br/>为您的网站设计按钮图标（一组9个图标）<br/>A、定稿前限2次修改<br/>B、资深设计师创作'},
            {name: '商品图片修图', price: 100, value: '297e2669600191860160021efcaf00a1', disabled: false, unit: '元', html: '服务说明：100元/5张<br/>A、为您的产品图片进行尺寸修改<br/>B、为您的产品图片添加水印'},
            {name: '实地拍照', price: 0, value: '297e2669600191860160021f2fae00a4', disabled: false, unit: '面议', html: '服务说明：<br/>为你网站照片上门实地拍照'}
          ]
        }
      ]
    },
    {
      title: '功能模块',
      icon: 'function.png',
      groups: [
        {
          title: '手机端',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '小程序', price: 1500, value: '297e2669600191860160021f845900a7', unit: '元/年', html: '功能说明：<br/>小程序是一种不需要下载安装即可使用的应用<br/>小程序内容支持与网站数据同步<br/>小程序支持自主设计页面<br/>小程序分为展示型、商城型<br/><span style="color:#ff5500">5800—8800元</span>'},
            {name: '手机网站', price: 0, value: '297e2669600191860160021fada500aa', unit: '元', html: '功能说明：<br/>适合手机端访问的网站版本，独立企业二级域名，手机搜索SEO全面，数据同步。'},
            {name: '微网站', price: 1500, value: '297e2669600191860160021fe16100ac', unit: '元/年', html: '功能说明：<br/>与微信公众号关联后，可以通过微信端访问的网站版本。'},
            {name: '微传单H5', price: 0, value: '297e26696001918601600220127d00af', unit: '元', html: '功能说明：<br/>海量模版+傻瓜式操作=5分钟制作微传单<br/>可以制作出单页面/多页面/展示型/互动型/微网站等，支持全业务场景应用<br/>微传单自动适配电脑、手机、PAD等多终端，<br/>网站中的文章、产品、广告都可以同步生成微传单，统一管理数据，各类个人推广、组织推广数据全面。'},
            {name: '多语言版本', price: 0, value: '297e26696001918601600220721b00b4', unit: '原版本30%', html: '功能说明：<br/>功能说明：<br/>多语言支持，包括：简体中文、英语、日语、韩语。'},
            {name: '问卷调查', price: 1000, value: '297e2669600191860160022099eb00b6', unit: '元', html: '功能说明：<br/>了解客户想法，改善产品和服务<br/>使用调查问卷好优化活动主题及计划<br/>卷调查帮您发现教学中的优势和不足'}
          ]
        },
        {
          title: '工具类',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '在线交易模块', price: 9000, value: '297e26696001918601600220d52900b9', unit: '元', html: '功能说明：<br/>详见商城系统。'},
            {name: '关键词监测', price: 600, value: '297e26696001918601600220f6e300bc', unit: '元/年', html: '功能说明：<br/>每天、每个搜索平台、每个关键词的时时排名监测，追踪关键词排名，实现按天、按排名付费给优化公司。'},
            {name: '首页热力图', price: 300, value: '297e26696001918601600221269300be', unit: '元', html: '功能说明：<br/>利用访问大数据分析，以特殊亮度的形式显示访客热衷的页面区域和点击区域，追踪访客行为，分析行为，以提升网站转化率、成交率。'},
            {name: '访问统计配置', price: 100, value: '297e26696001918601600221caa800c2', unit: '元', html: '功能说明：<br/>申请、配置、安装第三方访问统计器，实现大数据统计,把握网站脉搏,分析数据,挖掘价值!'},
            {name: 'FAQ栏目', price: 500, value: '297e26696001918601600221f53300c5', unit: '元', html: '功能说明：<br/>实现客户在网站上对相应的问题，进行提问，公司进行回复，一个是满足在线客服需求，另一个可以实现像百度专家知道一样，用户对有些问题，可以付费提问，企业可以组织专家回复，提升公司销售额和服务增值。'},
            {name: '视频库', price: 200, value: '297e26696001918601600222828400c8', unit: '元', html: '功能说明：<br/>视频有产品视频、品牌视频、企业宣传片、微电影等形式<br/>各种视频短片放到网站上，达到一定宣传的营销手段'},
            {name: '众筹', price: 0, value: '297e26696001918601600222a5d700cb', unit: '面谈', html: '功能说明：<br/>团购+预购的形式，向网友募集项目资金的模式<br/>在微信上支付和留言。'},
            {name: '抽奖', price: 200, value: '297e26696001918601600222c87100cd', unit: '元', html: '功能说明：<br/>抽奖转盘，可设置抽奖等级、次数、中奖率，中奖用户数据'}
          ]
        }
      ]
    },
    {
      title: '推广运营',
      icon: 'marketing.png',
      groups: [
        {
          title: '搜索优化',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '关键词监测', price: 600, value: '297e26696001918601600223006c00d0', unit: '元/年', html: '服务说明：<br/>每天、每个搜索平台、每个关键词的时时排名监测，追踪关键词排名，实现按天、按排名付费给优化公司。'},
            {name: '关键词向导', price: 500, value: '297e266960019186016002232fe100d2', unit: '元', html: '服务说明：<br/>网站后台的优化步骤，建立关键词库、系统关键词、文章SEO规则、产品SEO规则。'},
            {name: '深度SEO', price: 9800, value: '297e266960019186016002239e1a00d6', unit: '元/年', html: '服务说明：<br/>A、计费方式：<br/>1、9800元为SEO优化服务预付款；<br/>2、优化周期为3个月，以付款确认关键词计时；<br/>3、客户可以提供10个关键词，保证至少5个排名在首页、二页；<br/>4、关键词需要客户先提供，然后双方进行确认；<br/>5、百度SEO套餐搜索引擎优化是针对百度PC端的优化。<br/><br/>B、网站要求：<br/>1、要求您的网站内容合规合法，百度正常收录。'},
            {name: '全网SEO', price: 19800, value: '297e26696001918601600223c55500d8', unit: '元/年', html: '服务说明：<br/>A、计费方式：<br/>1、19800元为SEO优化服务预付款；<br/>2、优化周期为3个月，以付款确认关键词计时；<br/>3、客户可以提供10个关键词，保证至少5个排名在首页；<br/>4、关键词需要客户先提供，然后双方进行确认；<br/>5、全网排名包括以下搜索引擎：百度PC、移动百度、360搜索PC、搜狗PC。<br/><br/>B、网站要求：<br/>1、要求您的网站内容合规合法，百度正常收录。'},
            {name: '外链资源', price: 2000, value: '297e26696001918601600223f17600db', unit: '元', html: '服务说明：<br/>提供优质的外链资源'}
          ]
        },
        {
          title: '推广类',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '网站内容更新', price: 7200, value: '297e26696001918601600224212700dd', unit: '元/年', html: '服务说明：<br/>帮您为网站进行内容更新，节省您的时间<br/>A、需客户提供所需内容素材<br/>B、每月更新的内容4条原创'},
            {name: '竞价托管', price: 6800, value: '297e26696001918601600224737f00e2', unit: '元/年', html: '服务说明：<br/>百度竞价后台托管。不包含第三方费用。'},
            {name: '微托管', price: 2400, value: '297e2669600191860160022587b500f6', unit: '元/年', html: '服务说明：<br/>帮您公众号进行内容更新，节省您的时间<br/>A、需客户提供所需内容素材<br/>B、每月更新的内容4条原创'},
            {name: '微博矩阵', price: 600, value: '297e26696001918601600225b5d400f8', unit: '元', html: '服务说明：<br/>帮您理清公司所有微博之间的关系，老板微博、官方微博、品牌微博、产品微博、员工微博等。'},
            {name: '媒体软文', price: 200, value: '297e2669600191860160022499b300e5', html: '欢迎三方合作'},
            {name: '微博营销', price: 0, value: '297e26696001918601600224bff500e7', html: '欢迎三方合作'},
            {name: '微信营销', price: 0, value: '297e26696001918601600224dd7800ea', html: '欢迎三方合作'},
            {name: '网红', price: 0, value: '297e26696001918601600224fe6900ec', html: '欢迎三方合作'},
            {name: '直播', price: 0, value: '297e266960019186016002251e5300ef', html: '欢迎三方合作'},
            {name: '朋友圈广告', price: 0, value: '297e266960019186016002253b7300f1', html: '欢迎三方合作'},
            {name: '今日头条广告', price: 0, value: '297e266960019186016002255d9000f3', html: '欢迎三方合作'}
          ]
        },
        {
          title: '线下引流',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '产品二维码', price: 1200, value: '297e26696001918601600225f10c00fb', unit: '元', html: '服务说明：<br/>每个产品详情页面生成的二维码用于推广。'},
            {name: '展会策划', price: 1200, value: '297e2669600191860160022612f300fd', unit: '元', html: '服务说明：<br/>展示现场如何用二维码引流、吸粉。'},
            {name: '经销商大会', price: 1200, value: '297e266960019186016002262fa90100', unit: '元', html: '服务说明：<br/>互联网工具现场支持，传播、引流。'}
          ]
        }
      ]
    },
    {
      title: '增值服务',
      icon: 'service.png',
      groups: [
        {
          title: '增值服务',
          needCheck: true,
          type: 'check',
          price: 0,
          value: [],
          items: [
            {name: '上门服务', price: 600, value: '297e2669600191860160022665960102', unit: '元', html: '服务说明：<br/>客服上门服务，了解网站使用情况。（限浙江）'},
            {name: '定期服务', price: 300, value: '297e26696001918601600226889e0105', unit: '元', html: '服务说明：<br/>定期联系你，为您提供建议，提醒更新资料，处理用户的反馈；提供运营数据。'},
            {name: '营销型网站标准', price: 300, value: '297e26696001918601600226a9e20107', unit: '元', html: '服务说明：<br/>以营销的思想、方法和技巧融入到网站策划、设计与制作中的网站。<br/>提供《营销型网站标准》一书。'},
            {name: '后台操作视频', price: 0, value: '297e26696001918601600226cc6a010a', unit: '元', html: '服务说明：<br/>有专门的视频，详细说明网站后台操作的步骤'},
            {name: '阿里巴巴装修', price: 5800, value: '297e26696001918601600226eb67010c', unit: '元', html: '服务说明：<br/>诚信通。'}
          ]
        }
      ]
    }
  ],
  designers: [
    {
      value: '297e2669600b5fea01600b61e8a80004',
      name: '小王',
      sub: '五年经验，擅长简约风格',
      price: 3,
      avatar: 'd1.png',
      html: '服务说明：<br/>五年经验，擅长简约风格；首席设计师，案例数200以上（经验值3）'
    },
    {
      value: '297e2669600b5fea01600b62995a0006',
      name: '小李',
      sub: '六年经验，擅长整体策划',
      price: 3,
      avatar: 'd2.png',
      html: '服务说明：<br/>六年经验，擅长整体策划；高级设计师，案例数300以上（经验值3）'
    },
    {
      value: '297e2669600b5fea01600b63217b000b',
      name: '小胡',
      sub: '三年经验，擅长中国风',
      price: 2,
      avatar: 'd3.png',
      html: '服务说明：<br/>三年经验，擅长中国风；中级设计师，案例数100以上（经验值2）'
    },
    {
      value: '297e2669600b5fea01600b6361dc000d',
      name: 'Amy',
      sub: '三年经验，擅长欧美风',
      price: 1,
      avatar: 'd4.png',
      html: '服务说明：<br/>三年经验，擅长欧美风；初级设计师，案例数50以上（经验值1）'
    }
  ]
}

const getters = {
  shopFunction: state => state.shopFunction,
  totalPrice: state => state.totalPrice,
  priceItemIds: state => state.priceItemIds,
  showDesigner: state => state.showDesigner,
  designers: state => state.designers,
  year: state => state.year,
  yearList: state => state.yearList,
  orderDetail: state => {
    let rowArr = []
    state.shopFunction.map((row, index) => {
      if (index > 0) {
        let groupArr = []
        row.groups.map(group => {
          let itemArr = []
          group.items.map(item => {
            if (group.type === 'radio') {
              if (item.value === group.value) {
                itemArr.push({
                  title: item.name,
                  price: item.price
                })
              }
            } else {
              group.value.map(val => {
                if (item.value === val) {
                  console.log(item.name)
                  itemArr.push({
                    title: item.name,
                    price: item.price
                  })
                }
              })
            }
          })
          console.log(itemArr)
          if (itemArr.length) {
            groupArr.push({
              title: group.title,
              items: itemArr
            })
          }
        })
        if (groupArr.length) {
          rowArr.push({
            title: row.title,
            groups: groupArr
          })
        }
      }
    })
    return rowArr
  }
}

const actions = {
  chooseRadio ({commit, state}, params) {
    params.type = 'radio'
    commit('CHOOSE_RADIO', params)
    commit('TOTAL')
  },
  chooseCheck ({commit, state}, params) {
    params.type = 'check'
    commit('CHOOSE_CHECK', params)
    commit('TOTAL')
  },
  chooseDesigner ({commit, state}, params) {
    commit('CHOOSE_DESIGNER', params)
    commit('TOTAL')
  },
  chooseYear ({commit, state}, params) {
    // 异步可执行
    commit('CHOOSE_YEAR', params)
    commit('TOTAL')
  }
}

const mutations = {
  CHOOSE_RADIO (state, params) {
    if (state.shopFunction[params.sIndex].groups[params.gIndex].custom) {
      // 判断是否选择了定制设计按钮，如果是，切换设计师界面显示状态
      state.showDesigner = !state.showDesigner
      // 去除设计师加成
      if (!state.showDesigner) {
        state.magenif = 1
        state.designerId = ''
      }
    }
    state.shopFunction[params.sIndex].groups[params.gIndex].value = params.item.value // 选中状态
  },
  CHOOSE_CHECK (state, params) {
    let value = state.shopFunction[params.sIndex].groups[params.gIndex].value
    let isSame = false
    if (!value.length) {
      // 第一次
      value = value.concat(params.item.value)
    } else {
      value.map((item, index) => {
        if (item === params.item.value) {
          isSame = true
          value.splice(index, 1)
        }
      })
      if (!isSame) {
        value = value.concat(params.item.value)
      }
    }
    state.shopFunction[params.sIndex].groups[params.gIndex].value = value
  },
  CHOOSE_DESIGNER (state, params) {
    state.magenif = params.key.price
    state.designerId = params.key.value
    // 首页定制
    let value = state.shopFunction[2].groups[1].value
    if (!value.join().match(new RegExp('297e2669600191860160021d84ac0091'))) {
      state.shopFunction[2].groups[1].value = value.concat('297e2669600191860160021d84ac0091')
    }
  },
  CHOOSE_YEAR (state, params) {
    state.year = state.yearList[params]
  },
  TOTAL (state) {
    // 计算各项单个金额
    state.shopFunction.map(row => {
      row.groups.map(item => {
        item.price = 0
        item.needCheck && item.items.map(key => {
          if (item.type === 'radio' && item.value.match(new RegExp(key.value))) {
            item.price = key.unit === '元/年' ? key.price * state.year : key.price
          } else if (item.type === 'check' && item.value.join().match(new RegExp(key.value)) && !key.disabled) {
            if (item.magenif) {
              // 设计师加成
              item.price += key.price * state.magenif
            } else {
              item.price += key.unit === '元/年' ? key.price * state.year : key.price
            }
          }
        })
      })
    })
    // 计算总金额
    let totalPrice = 0
    let priceItemIds = ''
    state.shopFunction.map(row => {
      row.groups.map((item, index) => {
        totalPrice += item.price
        let value = ''
        // 计算选中项
        if (item.type === 'radio') {
          value = item.value
        } else {
          item.needCheck && item.items.map(key => {
            if (!key.disabled && item.value.join().match(new RegExp(key.value))) {
              value ? value += (',' + key.value) : value = key.value
            }
          })
        }
        priceItemIds ? priceItemIds += (value ? ',' + value : '') : priceItemIds = value
      })
    })
    state.totalPrice = totalPrice
    state.priceItemIds = priceItemIds
  },
  UPGRADE (state, params) {
    // 升级 已购产品不可用
    if (params) {
      params.split(',').map((ids, index) => {
        state.shopFunction.map(row => {
          row.groups.map(item => {
            item.needCheck && item.type === 'check' && item.items.map(key => {
              if (ids === key.value) {
                key.disabled = true
                item.value = item.value.concat(key.value)
              }
            })
          })
        })
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
