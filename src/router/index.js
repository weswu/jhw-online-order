import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/pages/Shop'
import Paid from '@/pages/Paid'
import UserCenter from '@/pages/UserCenter'
import ActiveMessage from '@/pages/ActiveMessage'
import Order from '@/pages/Order'
import Log from '@/pages/Log'
import Spread from '@/pages/Spread'
import Rank from '@/pages/SpreadRank'
import Redirect from '@/components/Redirect'
import QRCode from '@/components/pay/QRCode'
import Empty from '@/components/Empty'
import Alipay from '@/components/pay/Alipay'
// 订单管理系统
import Admin from '@/pages/Admin'
import AOrder from '@/components/common/order'
import APermission from '@/components/admin/permission'
// 订单管理系统
import Member from '@/pages/Member'
import MOrder from '@/components/member/order'
import MPurchased from '@/components/member/purchased'
import MPayment from '@/components/member/payment'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'shop', component: Shop },
    { path: '/paid', name: 'paid', component: Paid },
    // 用户中心
    { path: '/uc', name: 'uc', component: UserCenter },
    { path: '/activeMessage', name: 'activeMessage', component: ActiveMessage },
    { path: '/order', name: 'order', component: Order },
    { path: '/log', name: 'log', component: Log },
    // 推广
    { path: '/spread', name: 'spread', component: Spread },
    { path: '/rank', name: 'rank', component: Rank },
    { path: '/redirect', name: 'redirect', component: Redirect, meta: { navHide: true, cname: '登录成功' } },
    { path: '/qrcode', name: 'qrcode', component: QRCode, meta: { navHide: true, cname: '二维码' } },
    { path: '/empty', name: 'empty', component: Empty, meta: { navHide: true, cname: '空' } },
    { path: '/alipay', name: 'alipay', component: Alipay },
    // 订单管理系统
    { path: '/admin',
      component: Admin,
      meta: { admin: true, title: '机汇网订单管理系统' },
      children: [
        { path: 'order', component: AOrder, meta: { admin: true, title: '机汇网订单管理系统' } },
        { path: 'permission', component: APermission, meta: { admin: true, title: '机汇网订单管理系统' } },
        { path: 'agent', component: AOrder, meta: { admin: true, title: '机汇网订单管理系统' } }
      ]
    },
    { path: '/alipay', name: 'alipay', component: Alipay },
    // 会员中心
    { path: '/member',
      component: Member,
      meta: { admin: true, title: '机汇后台' },
      children: [
        { path: 'order', component: MOrder, meta: { admin: true, title: '机汇后台' } },
        { path: 'purchased', component: MPurchased, meta: { admin: true, title: '机汇后台' } },
        { path: 'payment', component: MPayment, meta: { admin: true, title: '机汇后台' } }
      ]
    }
  ]
})
