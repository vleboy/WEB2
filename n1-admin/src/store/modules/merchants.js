import { getMerchants } from '@/service/index'
export const merchants = {
    state:{
       merchantsList:[]
    },
    mutations:{
      updateList(state,{params}){
          state.merchantsList=params
      }
    },
    actions:{
       getMerchantsList({commit},params){
           getMerchants(params).then(res=>{
               commit('updateList',{params:res.payload})
           })
       }
    }
}