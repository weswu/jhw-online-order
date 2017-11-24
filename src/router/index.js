import Vue from 'vue'
import Router from 'vue-router'
// import Reg from '@/pages/Reg'
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import Forget from '@/pages/Forget'
import Shop from '@/pages/Shop'
import Main from '@/pages/Main'
import Accounts from '@/pages/Accounts'
import Account from '@/pages/Account'
import Paid from '@/pages/Paid'
import UserCenter from '@/pages/UserCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/paid',
      name: 'paid',
      component: Paid
    },
    {
      path: '/uc',
      name: 'uc',
      component: UserCenter
    }
  ]
})
