// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import $ from 'jquery'
import defines from './javascript/defines'
import mixin from './javascript/mixin'
import commom from './javascript/commom'


Vue.mixin(mixin)
Vue.mixin(commom)
Vue.use(MintUI)
Vue.prototype.$axios= axios
Vue.prototype.DEFINES = defines
Vue.config.productionTip = false
axios.defaults.withCredentials = true   //跨域携带cookie

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
