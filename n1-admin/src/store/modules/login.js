import {logIn,getAdminInfo,getWaterfall,getBill,updatePassword} from '@/service/index'
import {Message} from 'iview'
export const login = {
    state:{
        // getcode:'',
        infos:{},
        loading:false,
        admininfo:{},
        balance:null,
        waterfall:[]
    },
    mutations:{
        // updateCode(state,{params}){
        //     state.getcode=`data:image/png;base64,${params}`
        // },
        saveWaterfall(state,{params}){
            state.waterfall=params
        },
        saveInfo(state,{params}){
            state.infos=params
        },
        changeLoading(state,{params}){
            state.loading=params
        },
        updateAdmin(state,{params}){
            state.admininfo=params
        },
        updateBill(state,{params}){
            state.balance=params
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
                    commit('saveInfo',{params:res.payload});
                    cb && cb()
                }else{
                    commit('changeLoading',{params:false});
                    err && err()
                }
            })
        },
        adminInfo({commit}){
            let p1=getAdminInfo().then(res=>{
                if(res.code==0){
                    commit('updateAdmin',{params:res.payload})
                }
            })
            let p2= getWaterfall().then(res=>{
                if(res.code==0){
                   commit('saveWaterfall',{params:res.payload})                }
            });
           let p3= getBill().then(res=>{
                if(res.code==0){
                    commit('updateBill',{params:res.payload.balance})
                }
            });
            Promise.all([p1,p2,p3]).then(()=>{
                commit('changeLoading',{params:false});
            })
        },
        changePassword({commit},params){
            updatePassword(params).then(res=>{
                if(res.code==0){
                    Message.success('修改成功');
                    getAdminInfo().then(re=>{
                        if(re.code==0){
                            commit('updateAdmin',{params:re.payload})
                        }
                    })
                }
            })
        },
        updatePwd({commit},params){
            updatePassword(params).then(res=>{
                if(res.code==0){
                    Message.success('修改成功');
                }
            })
        }
    }
}