import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import SimpleVueValidation from 'simple-vue-validator'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true
})
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(SimpleVueValidation)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
