// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import {appRouter} from './router/router'
import {router} from './router/index';
import { store } from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})