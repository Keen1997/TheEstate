import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
import router from './router'
import App from './App'


Vue.use(Vuetify)
Vue.component('ThailandAutoComplete', ThailandAutoComplete)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
