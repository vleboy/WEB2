import Vue from 'vue'
import Vuex from 'vuex'
import {app} from './modules/app'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loading:false
    },
    mutations:{
     globalLoading(state,{params}){
        state.loading=params
        },
    },
    actions:{

    },
    modules: {
      app
    }
})