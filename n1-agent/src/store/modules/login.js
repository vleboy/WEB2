import {logIn,agentOne,updatePassword} from '@/service/index'
import {Message} from 'iview'
export const login = {
    state:{
        // getcode:'',
        infos:{},
        loading:false,
    },
    mutations:{
        // updateCode(state,{params}){
        //     state.getcode=`data:image/png;base64,${params}`
        // },
        saveInfo(state,{params}){
            state.infos=params
        },
        changeLoading(state,{params}){
            state.loading=params
        },
    },
    actions:{
        // getcapcha({state,commit},params){
        //     getCode(params).then(res=>{
        //         if(res.code==0){
        //             commit('updateCode',{params:res.payload})
        //         }
        //     })
        // },
        userlogin({commit},{role,username,password,challenge,vid,cb,err}){
            logIn(role,username,password,challenge,vid).then(res=>{
                // console.log(res);
                if(res.code==0){
                    if(localStorage.getItem('n1token')) {
                        localStorage.removeItem('n1token');
                        localStorage.setItem('n1token', res.payload.token)
                    }else{
                        localStorage.setItem('n1token', res.payload.token);
                    }
                    setTimeout(()=>localStorage.removeItem('n1token'),259200000);
                    localStorage.setItem('displayName',res.payload.displayName);
                    localStorage.setItem('userInfo',JSON.stringify(res.payload))
                    localStorage.setItem('userId',res.payload.userId)
                    commit('saveInfo',{params:res.payload});
                    cb && cb()
                }else{
                    commit('changeLoading',{params:false});
                    err && err()
                }
            })
        },
        changePassword({commit},params){
         let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
            updatePassword(params).then(res=>{
                if(res.code==0){
                    Message.success('修改成功');
                    agentOne(userId).then(re=>{
                        if(re.code==0){
                            commit('updateAdmin',{params:re.payload})
                        }
                    })
                }
            })
        }
    }
}