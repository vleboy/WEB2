import {logList } from '@/service/index'
export const log = {
    state:{
       loading:false,
       adminOpreateLog:[],
       startKey:{},
       adminLoginLog:[],
       agentLoginLog:[],
       agentOpreateLog:[]
    },
    mutations:{
        logLoading(state,{params}){
            state.loading=params
        },//log
        changeAdminLog(state,{params}){
            state.adminOpreateLog=params
        },
        changeStartKey(state,{params}){
            state.startKey=params
        },
        changeAdminLoginLog(state,{params}){
            state.adminLoginLog=params
        },
        changeAgentLog(state,{params}){
            state.agentLoginLog=params
        },
        changeAgentOpreateLog(state,{params}){
            state.agentOpreateLog=params
        }
    },
    actions:{
      getAdminLog({commit},params){
        commit('logLoading',{params:true})
        return logList(params).then(res=>{
            if(res.code==0){
                commit('changeAdminLog',{params:res.payload.Items});
                commit('changeStartKey',{params:res.payload.LastEvaluatedKey})
                commit('logLoading',{params:false})
            }
        })
      },
      getAdminLoginLog({commit},params){
        commit('logLoading',{params:true})
          logList(params).then(res=>{
              if(res.code==0){
                  commit('changeAdminLoginLog',{params:res.payload.Items})
                  commit('changeStartKey',{params:res.payload.LastEvaluatedKey})
                  commit('logLoading',{params:false})
              }
          })
      },
      getAgentLoginLog({commit},params){
        commit('logLoading',{params:true})
          logList(params).then(res=>{
              commit('changeAgentLog',{params:res.payload.Items})
              commit('changeStartKey',{params:res.payload.LastEvaluatedKey})
              commit('logLoading',{params:false})
              
          })
      },
      getAgentOpreateLog({commit},params){
        commit('logLoading',{params:true})
          logList(params).then(res=>{
              if(res.code==0){
                  commit('changeAgentOpreateLog',{params:res.payload.Items})
                  commit('changeStartKey',{params:res.payload.LastEvaluatedKey})
                }
                commit('logLoading',{params:false})
            })
      },
    }
}