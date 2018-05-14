import Vue from 'vue'
import Vuex from 'vuex'
import {login} from './modules/login'
import {home} from './modules/home'
import {report} from './modules/report'
import { merchants } from './modules/merchants'
import {admin} from './modules/admin'
import {add} from './modules/add'
Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        login,
        home,
        report,
        merchants,
        admin,
        add
    }
})