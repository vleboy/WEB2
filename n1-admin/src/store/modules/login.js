import {logIn} from '../../service/index'
export const login = {
    state:{
        // getcode:'',
        infos:{},
    },
    mutations:{
        // updateCode(state,{params}){
        //     state.getcode=`data:image/png;base64,${params}`
        // },
        saveInfo(state,{params}){
            state.infos=params
        }
    },
    actions:{
        // getcapcha({state,commit},params){
        //     getCode(params).then(res=>{
        //         if(res.code==0){
        //             commit('updateCode',{params:res.payload})
        //         }
        //     })
        // },
        userlogin({commit},{role,username,password,challenge,vid,cb}){
            logIn(role,username,password,challenge,vid).then(res=>{
                console.log(res);
                if(res.code==0){
                    localStorage.setItem('n1token',res.payload.token);
                    localStorage.setItem('displayName',res.payload.displayName);
                    localStorage.setItem('userInfo',JSON.stringify(res.payload))
                    commit('saveInfo',{params:res.payload});
                    cb&&cb()
                }else{
                    alert(res.msg)
                }
                
            })
        }
    }
}