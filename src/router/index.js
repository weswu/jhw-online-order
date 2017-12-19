import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import Forget from '@/pages/Forget'
import Shop from '@/pages/Shop'
import Main from '@/pages/Main'
import Accounts from '@/pages/Accounts'
import Account from '@/pages/Account'
import Paid from '@/pages/Paid'
import UserCenter from '@/pages/UserCenter'
import ActiveMessage from '@/pages/ActiveMessage'
import Order from '@/pages/Order'
import Log from '@/pages/Log'
import Spread from '@/pages/Spread'
import Rank from '@/pages/SpreadRank'
import Redirect from '@/components/Redirect'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'shop', component: Shop },
    { path: '/paid', name: 'paid', component: Paid },
    { path: '/uc', name: 'uc', component: UserCenter },
    { path: '/activeMessage', name: 'activeMessage', component: ActiveMessage },
    { path: '/order', name: 'order', component: Order },
    { path: '/log', name: 'log', component: Log },
    { path: '/spread', name: 'spread', component: Spread },
    { path: '/rank', name: 'rank', component: Rank },
    { path: '/redirect', name: 'redirect', component: Redirect },
    // 以下暂时不用
    { path: '/login', name: 'login', component: Login },
    { path: '/reg', name: 'reg', component: Reg },
    { path: '/forget', name: 'forget', component: Forget },
    { path: '/main', name: 'main', component: Main },
    { path: '/accounts', name: 'accounts', component: Accounts },
    { path: '/account', name: 'account', component: Account }
  ]
})
