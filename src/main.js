// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from './api'
import MuseUI from 'muse-ui'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import 'muse-ui/dist/muse-ui.css'
import './assets/app.less'
import './assets/filters.js'
Vue.use(MuseUI)
Vue.prototype.$http = Axios
Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/null.png',
  loading: '/static/loading.gif',
  attempt: 1
})
Vue.use(VueClipboard)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
