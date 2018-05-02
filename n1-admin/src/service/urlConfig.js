console.log(process.env.NODE_ENV);

export let URL = (process.env.NODE_ENV == 'development') 
? 'd3rqtlfdd4m9wd.cloudfront.net' : 'n1admin.na12345.com';
export const httpType = 'https://'
console.log(URL);
export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
