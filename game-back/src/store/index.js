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
        freeChooseData:[],
        profitHourTodayArr:[],
        profitHourAvArr:[],
        betHourTodayArr:[],
        betHourAvArr:[],
        countHourTodayArr:[],
        countHourAvArr:[]
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
        //price
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
        //select
    saveFreeChooseData(state,{params}){
        state.freeChooseData=params
        },
        //hourchart
    saveProfitHourTodayArr(state,{params}){
        state.profitHourTodayArr=params
        },
    saveProfitHourAvArr(state,{params}){
        state.profitHourAvArr=params
        },
    saveBetHourTodayArr(state,{params}){
        state.betHourTodayArr=params
        },
    saveBetHourAvArr(state,{params}){
        state.betHourAvArr=params
        },
    saveCountHourTodayArr(state,{params}){
        state.countHourTodayArr=params
        },
    saveCountHourAvArr(state,{params}){
        state.countHourAvArr=params
        },
    },
    actions:{

    },
    modules: {
      home
    }
})