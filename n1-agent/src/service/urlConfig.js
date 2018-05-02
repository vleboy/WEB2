console.log(process.env);

export let URL = (process.env.NODE_ENV == 'development') 
? 'd3oo6v0d877qm6.cloudfront.net' : 'n1agent.na12345.com';
export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
