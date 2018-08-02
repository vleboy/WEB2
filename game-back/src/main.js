// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import { store } from './store'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import echarts from 'echarts/dist/echarts.simple.js'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
