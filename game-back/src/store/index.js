import Vue from 'vue'
import Vuex from 'vuex'
import {home} from './modules/home'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loading:false,
        login:{},
        gameDetail:{},
        priceNormalCount:0,
        priceNormalData:[],
        priceFreeCount:0,
        priceFreeData:[],
        freeChooseData:[]
    },
    mutations:{
    globalLoading(state,{params}){
        state.loading=params
         },
    login(state,{params}){
        state.login=params
         },
    saveGameDetail(state,{params}){
        state.gameDetail=params
        },
    savePriceNormalCount(state,{params}){
        state.priceNormalCount=params;
    },
    savePriceNormalData(state,{params}){
        state.priceNormalData=params
    },
    savePriceFreeCount(state,{params}){
        state.priceFreeCount=params;
    },
    savePriceFreeData(state,{params}){
        state.priceFreeData=params
    },
    saveFreeChooseData(state,{params}){
        state.freeChooseData=params
    }
    },
    actions:{

    },
    modules: {
      home
    }
})