import Vue from 'vue'
import Vuex from 'vuex'
import {login} from './modules/login'
import {home} from './modules/home'
import {ugreport} from './modules/ugreport'
Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        login,
        home,
        ugreport
    }
})