import {avalibleManager,addUsers,subRoleOne } from '@/service/index'
export const add = {
    state:{
      subRoleList: [],
      subRoleDetail:{},
      name:''
    },
    mutations:{
      changeSubrole(state,{params}){
          state.subRoleList=params
      },
      changeRoleDetail(state,{params}){
          state.subRoleDetail=params
      },
      changeName(state,{params}){
          state.name=params
      }
    },
    actions:{
        getSubrole({commit}){
            avalibleManager().then(res=>{
                if(res.code==0){
                    commit('changeSubrole',{params:res.payload})
                }
            })
        },
        newUser({commit},params){
            return addUsers(params)
        },
        getSubRoleDetail({commit},params){
            subRoleOne(params).then(res=>{
                if(res.code==0){
                    commit('changeRoleDetail',{params:res.payload})
                }
            })
        }
    }
}