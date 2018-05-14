// console.log(process.env.NODE_ENV);
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
export let URL = (process.env.NODE_ENV == 'production') ? 'n1admin.na12345.com' : 'd3rqtlfdd4m9wd.cloudfront.net';
// console.log(URL);
export let gameUrl = (process.env.NODE_ENV == 'production') ? 'https://n1game.na12345.com' : 'https://dgjmusja39cm2.cloudfront.net';

export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
