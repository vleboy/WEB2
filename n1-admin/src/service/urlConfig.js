// console.log(process.env.NODE_ENV);
export const URL='d3rqtlfdd4m9wd.cloudfront.net'
// export let URL = (process.env.NODE_ENV == 'development') 
// ? 'd3rqtlfdd4m9wd.cloudfront.net' : 'n1admin.na12345.com';
// console.log(URL);

export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
