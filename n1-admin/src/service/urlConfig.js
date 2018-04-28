//开发环境
// export const URL = '/api'
export const URL = 'd3rqtlfdd4m9wd.cloudfront.net'

export const httpType ='https://'
//生产环境
export const api={
    getVaptcha:httpType+URL+'/vaptcha/getVaptcha',
    getDownTime:httpType+URL+'/vaptcha/getDownTime'
}