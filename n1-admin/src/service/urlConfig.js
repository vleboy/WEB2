//开发环境
    export const URL = 'd3rqtlfdd4m9wd.cloudfront.net'

//正式环境
// if(DEV){
//     export const URL = 'd3rqtlfdd4m9wd.cloudfront.net'
// }else{
//     export const URL = 'n1admin.na12345.com'
// }

export const httpType ='https://'

export const api={
    getVaptcha:httpType+URL+'/vaptcha/getVaptcha',
    getDownTime:httpType+URL+'/vaptcha/getDownTime'
}