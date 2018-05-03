
export let URL = (process.env.NODE_ENV == 'development') 
? 'd3prd6rbitzqm3.cloudfront.net' : '';
export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
