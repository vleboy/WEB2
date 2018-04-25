import { queryUserbyParent,queryUserbyId,queryPlayer } from '../../service/index'
export const report = {
    state:{
       
    },
    mutations:{
      
    },
    actions:{
       getUserList({commit},params){
        return queryUserbyId(params)
       },
       getUserChild({commit},params){
        return queryUserbyParent(params)
       },
       getPlayerList({commit},params){
         return queryPlayer(params)
       }
    }
}