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
const Image = (method, url, data) => ({
    method: method,
    url: url,
    data: data,
    headers: {
        "Content-Type": "image"
    }
})

//example
export async function example(params) {
    return http()
}

//针对业务逻辑里的请求
export async function httpRequest(method,url,params,type) {
  //参数分别作用 （方法, 请求接口, 参数, 域名接口）
  switch (method) {
    case 'get':
      return http(get(url,type))
    break
    case 'post':
      return http(post(url,params,type))
    break
    case 'put':
      return http(Image(method,url,params))
    break
  }
}

// //登录
// export async function logIn(role,username,password,challenge,vid,cb,err){
//     return http(post('/users/auth',{role,username,password,challenge,vid,cb,err}))
// }
