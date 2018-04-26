import { http } from './http'
import { URL,httpType } from './urlConfig'
// import QS from 'qs'

// get请求
const get = urls => ({
    method: 'get',
    url: URL + urls,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
// post请求
const post = (urls, datas) => {
    let TOKEN='';
    let headers={};
    if(window.localStorage.getItem('n1admin')) {
        TOKEN = window.localStorage.getItem('n1admin')
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Authorization":TOKEN
        }
    }else{
        headers={
            "Content-Type": "application/json; charset=utf-8",
        }
    }
    return {
        method: 'post',
        url: httpType+ URL + urls,
        data:datas,                       //QS.stringify(datas),
        headers: headers
    }
}
//img
const imgpost = (urls, datas) => ({
    method: 'post',
    url: URL + urls,
    data: datas,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "multipart/form-data"
    }
})

//example
export async function example(params) {
    return http()
}
//获取验证码
export async function getCode(params){
    return http(post('/captcha',params))
}
//登录
export async function logIn(role,username,password,captcha,cb){
    return http(post('/users/auth',{role,username,password,captcha,cb}))
}
//查询平台用户账单统计
export async function queryUserbyId(params){
    return http(post('/queryUserStat',params))
}
export async function queryUserbyParent(params){
    return http(post('/queryUserStat',params))
}
export async function queryPlayer(params){
    return http(post('/queryPlayerStat',params))
}