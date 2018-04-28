import axios from 'axios'
import vue from 'vue'
axios.interceptors.request.use(config => config, error => Promise.reject(error))
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    // console.log(response);
    if(response && ( response.status == 200 || response.status == 304 || response.status == 400 )) {
        return response.data
        if(response.data.code!='0'){
            vue.$Message.error(response.data.msg);
        }
    }
    return {
        status: 404,
        msg: '网络异常'
    }
}
// function checkCode(res) {
//     console.log('res', res)
//     if(res.status == 404) {
//         console.log(res.msg)
//     }
//     if(res.data && (!res.data.success)) {
//         console.log(res.data.msg)
//     }
//     return res
// }

export const http = config => {
    return axios(config).then(response => checkStatus(response))
}