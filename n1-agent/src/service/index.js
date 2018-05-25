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
export async function agentOne(userId){
    return http(get(`/agentOne/${userId}`))
}
//流水列表
export async function getWaterfall(userId){
    return http(get(`/waterfall/${userId}`))
}
//bill余额 个人中心
export async function getBill(userId){
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
//告警时间
export async function configOne(params){
    return http(post('/configOne',params))
}
// 更新状态
export async function userChangeStatus(params){
    return http(post('/userChangeStatus',params))
}
//日志列表
export async function logList(params){
    return http(post('/logList',params))
}
//agentAdminList
export async function agentAdminList(params){
    return http(post('/agentAdminList',params))
}
//agent 添加admin
export async function agentAdminNew(params){
    return http(post('/agentAdminNew',params))
}
//验证存在
export async function checkExit(params){
    return http(post('/checkExist',params))
}
//config configNew
export async function configNew(params){
    return http(post('/configNew',params))
}
//checkAgentMix
export async function checkAgentMix(params){
    return http(post('/checkAgentMix',params))
}
//availableAgents
export async function availableAgents(params){
    return http(post('/availableAgents',params))
}
//gameBigType
export async function gameBigType(params){
    return http(post('/gameBigType',params))
}
//上级线路商游戏
export async function companySelect(params){
    return http(post('/companySelect',params))
}
//创建代理
export async function agentNew(params){
    return http(post('/agentNew',params))
}
//创建玩家
export async function creatPlayer(params){
    return http(post('/agent/player/create',params))
}
// 修改anget
export async function agentUpdate(params){
    return http(post('/agentUpdate',params))
}