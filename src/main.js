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

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/null.png',
  loading: '/static/loading.gif',
  attempt: 1
})
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
