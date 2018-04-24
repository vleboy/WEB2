import { queryUserbyParent,queryUserbyId,queryPlayer } from '../../service/index'
export const ugreport = {
    state:{
       
    },
    mutations:{
      
    },
    actions:{
       getUserList({commit},{userId}){
        return queryUserbyId(userId)
       },
       getUserChild({commit},{parent}){
        return queryUserbyParent(parent)
       },
       getPlayerList({commit},{parentId}){
         return queryPlayer(parentId)
       }
    }
}