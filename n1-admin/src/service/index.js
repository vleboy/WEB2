import { http } from './http'
import { URL,httpType } from './urlConfig'
// import QS from 'qs'

// get请求 (url拼接参数，请求域名类别）
// 域名类别为: 不传域名默认为n1, 游戏相关接口为game
const get = (urls, type) => {
    let token=localStorage.getItem('n1token');
    let headers={
        "Content-Type": "application/json; charset=utf-8",
        "Authorization":token
    }
    return {
     method: 'get',
     url: httpType+ URL(type) + urls,
     headers: headers
    }
}

// post请求
const post = (urls, datas, type) => {
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
        url: httpType+ URL(type) + urls,
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

//针对业务逻辑里的请求
export async function httpRequest(type,method,url,params,) {
  //参数分别作用 （方法, 请求接口，参数，域名接口）
  return method == 'get' ? http(get(url,type)) : http(post(url,params,type))
}

//
let userId=''
if(localStorage.userInfo){
  userId = JSON.parse(localStorage.getItem("userInfo")).userId;
}

//登录
export async function logIn(role,username,password,challenge,vid,cb,err){
    return http(post('/users/auth',{role,username,password,challenge,vid,cb,err}))
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
    return http(get('/admin_center'))
}
//流水列表
export async function getWaterfall(){
    return http(get(`/waterfall/${userId}`))
}
//bill余额 个人中心
export async function getBill(){
    return http(get(`/bills/${userId}`))
}//otherbill
export async function getOtherBill(Id){
    return http(get(`/bills/${Id}`))
}
//商户列表
export async function getMerchants(params){
    return http(post('/merchants',params))
}
//线路商列表
export async function getManagers(params){
    return http(post('/managers',params))
}
//改密码
export async function updatePassword(params){
    return http(post('/updatePassword',params))
}
//转账
export async function billTransfer(params){
    return http(post('/billTransfer',params))
}
//管理员列表
export async function adminList(params){
    return http(post('/adminList',params))
}
//线路号列表
export async function lineNumlist(params){
    return http(post('/msnList',params))
}
//日志列表
export async function logList(params){
    return http(post('/logList',params))
}
//停用启用线路号
export async function changeLineStatus(line,type){
    return http(get(`/lockmsn/${line}/${type}`))
}
//获取下级角色
export async function getsbuRole(params){
    return http(post('/subRoleList',params))
}
//创建管理员
export async function createAdmin(params){
    return http(post('/admins',params))
}
//创商户
//可用线路商
export async function avalibleManager(){
    return http(get('/avalible_managers'))
}
//上级线路商游戏
export async function companySelect(params){
    return http(post('/companySelect',params,'game'))
}
//验证存在
export async function checkExit(params){
    return http(post('/checkExist',params))
}
//gameBigType
export async function gameBigType(params){
    return http(post('/gameBigType',params,'game'))
}
//添加线路商/商户
export async function addUsers(params){
    return http(post('/users',params))
}
//随机msn
export async function msnRandom(){
    return http(get('/msnRandom'))
}
//检查msn可用
export async function checkMsn(num){
    return http(get(`/check_msn/${num}`))
}