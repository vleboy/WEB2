// console.log(process.env.NODE_ENV);
export const URL='yyx63ld943.execute-api.ap-southeast-1.amazonaws.com/staging'
// export const URL =process.env.NODE_ENV == 'production'?'n1agent.na12345.com':'d3prd6rbitzqm3.cloudfront.net'
// console.log(URL);

export const httpType = 'https://'
//登录页,验证码
export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
