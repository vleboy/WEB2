import { http } from './http'
import { URL,httpType } from './urlConfig'
// import QS from 'qs'

// get请求
const get = urls =>{
    let token=localStorage.getItem('n1token');
    let headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization":token
    }
    return {
     method: 'get',
     url: httpType+ URL + urls,
     headers: headers
    }
}
// post请求
const post = (urls, datas) => {
    let TOKEN='';
    let headers={};
    if(window.localStorage.getItem('n1token')) {
        TOKEN = window.localStorage.getItem('n1token')
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
let userId=''
if(localStorage.userInfo){
  userId = JSON.parse(localStorage.getItem("userInfo")).userId;
}
//登录
export async function logIn(role,username,password,challenge,vid,cb,err){
    return http(post('/agentLogin',{role,username,password,challenge,vid,cb,err}))
}
//查询平台用户账单统计
export async function queryUserStat(params){
    return http(post('/queryUserStat',params))
}
//获取playlist
export async function queryPlayer(params){
    return http(post('/queryPlayerStat',params))
}
//game/sign
export async function gameSign(params){
    return http(post('/game/sign',params))
}
//admin_center
export async function getAdminInfo(){
    return http(get(`/agentOne/${userId}`))
}
//流水列表
export async function getWaterfall(){
    return http(get(`/waterfall/${userId}`))
}
//bill余额 个人中心
export async function getBill(){
    return http(get(`/bills/${userId}`))
}
//该密码
export async function updatePassword(params){
    return http(post('/updateAgentPassword',params))
}
//代理列表
export async function getagentList(params){
    return http(post('/agentList',params))
}
//代理玩家列表
export async function playerList(params){
    return http(post('/player/list',params))
}
//转账
export async function billTransfer(params){
    return http(post('/billTransfer',params))
}
//player 加点
export async function addBill(params){
    return http(post('/agent/player/deposit',params))
}
//player 减点
export async function reduceBill(params){
    return http(post('/agent/player/take',params))
}