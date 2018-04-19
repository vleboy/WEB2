import { http } from './http'
import { URL } from './urlConfig'
import QS from 'qs'

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
    return {
        method: 'post',
        url: URL + urls,
        data: QS.stringify(datas),
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
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


