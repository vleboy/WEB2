import Vue from 'vue'
import Vuex from 'vuex'
import {home} from './modules/home'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loading:false,
        allGame:{},
        gameDetail:{}
    },
    mutations:{
     globalLoading(state,{params}){
        state.loading=params
        },
     saveGame(state,{params}){
         state.allGame=params
     },
     saveGameDetail(state,{params}){
        state.gameDetail=params
    }
    },
    actions:{

    },
    modules: {
      home
    }
})