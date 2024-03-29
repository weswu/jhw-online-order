# jhw-online-order
>[机汇网官方网站产品订购](http://buy.jihui88.com/#/)

说明

- 用户访问购买页
  http://dev.jihui88.net/jihui_uc_demo/#/
- 点击购买时判断是否登录
- 订单结算时判断可用积分并抵扣支付金额，需要可以设置积分抵扣的比例
- 支付完成展现支付结果http://dev.jihui88.net/jihui_uc_demo/#/paid
- 用户进入引导页（用户中心）http://dev.jihui88.net/jihui_uc_demo/#/uc
- 点击编辑网站按钮进入新版PC的编辑后台
- 点击管理网站进入原网站后台
- 点击升级前往购买页面发起新的购买，已购买过的内容需要设置为不可选
- 邀请好友入驻是固定的展示，点击进入积分推广系统
- 双11位置是切换的促销banner，可以根据不同的促销活动进行发布，点击进入促销活动的介绍页（活动介绍页没做）
- 积分记录列表展现积分的增加和消费的记录
- 消息记录列表展现系统消息，如到期消息、服务器维护消息、培训通知等
- 留言记录列表展现网站上的客户留言
- 小程序、手机网站等模块部分用于直接发起购买，需要可以更换
- 消费记录展现每一笔订单的信息
- 更新日志展现我们系统的功能更新，点击可进入功能介绍页面

<br>

- 订购页面中界面设计那个项目有选择设计师的，每个设计师有不同的定价比例
- 这个订购页中的对应项目的价格和内容会需要修改
- 还有页面右侧结算部分也有个全局的折扣需要设置
- 订单的管理后台还是得有的，但是界面没要求，因为是我们内部查看和处理用的

## 启动service
java -Xms256m -jar jhw-online-order-java-0.0.1-SNAPSHOT.jar --spring.profiles.active=wxw


### 部署
把dist内的所有文件复制到jhw-online-order-java项目里的resource/static文件夹下


## 软件架构
- VUE2全家桶(vue vue-router vuex)
- [muse-ui] (https://muse-ui.org/2.1.0/#/layout)

## Install

下载

```shell
npm install
```

## Run

启动服务器

```shell
npm run dev
```

打包

```shell
npm run build
```

## 文件结构
```shell
.
├── build  项目构建配置
├── config  开发相关配置
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── app  全局样式
        └── filter  全局过滤
    └── components  业务组件
        ├── admin 订单管理系统
        ├── common 订单管理系统（通用模块）
        ├── pay 支付（通用模块）
        ├── shop 常见问题、在线咨询、个必化定制和优惠套餐的通用模块
        ├── uc 用户中心
        └── 其它共用页面
    └── pages  页面文件
        ├── ActiveMessage  消息（不使用）
        ├── Admin  管理员（订单管理系统）
        ├── Log  更新日志（不使用）
        ├── Order  消费记录（不使用）
        ├── Paid  支付成功成功页面（不使用）
        ├── Shop  首页右侧浮动
        ├── spread  推广（不使用）
        └── UserCenter 用户中心（不使用）
    ├── router  路由配置
    └── store  Vuex配置
```


## 技术支持
- [接口文档](https://jihui88.oschina.io/jhw-api/?file=home-%E9%A6%96%E9%A1%B5)
