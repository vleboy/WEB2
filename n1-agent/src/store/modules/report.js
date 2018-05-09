import { queryUserStat,queryPlayer,getagentList,playerList,billTransfer,addBill,reduceBill } from '@/service/index'
import {Message} from 'iview'
export const report = {
    state:{
       agentList:[],
       loading:false,
       playerList:[],
       rowId:''
    },
    mutations:{
      changeList(state,{params}){
        state.agentList=params
      },
      agentLoading(state,{params}){
        state.loading=params
      },
      changePlayer(state,{params}){
        state.playerList=params
      },
      changeRowId(state,{params}){
        state.rowId=params
      }
    },
    actions:{
       getUserList({commit},params){
        return queryUserStat(params)
       },
       getUserChild({commit},params){
        return queryUserStat(params)
       },
       getPlayerList({commit},params){
         return queryPlayer(params)
       },
       //agent
       getAgentPlayer({commit},params){
         playerList(params).then(res=>{
           if(res.code==0){
             commit('changePlayer',{params:res.list})
             commit('agentLoading',{params:false})
           }
         })
       },
       getAgentNext({commit},params){
        return getagentList(params)
       },
       getAgentList({commit},params){
        getagentList(params).then(res=>{
            if(res.code==0){
              commit('changeList',{params:res.payload});
              commit('agentLoading',{params:false})
            }
          })
       },
       //bill
       transferBill({dispatch,commit},params){
        billTransfer(params).then(res=>{
            if(res.code==0){
                Message.success('操作成功');
                //刷新
                dispatch("getAgentList", {
                    parent:'01',
                    query: {
                    },
                    sortkey: "createdAt",
                    sort: "desc"
                  });
            }
        })
       },
       playAddBill({state,dispatch},params){
        addBill(params).then(res=>{
          if(res.code==0){
            Message.success('操作成功');
            dispatch('getAgentPlayer',{
              fromUserId:state.rowId
            })
          }
        })
       },
       playReduceBill({state,dispatch},params){
         reduceBill(params).then(res=>{
           if(res.code==0){
            Message.success('操作成功');
            dispatch('getAgentPlayer',{
              fromUserId:state.rowId
            })
           }
         })
       }
    }
}