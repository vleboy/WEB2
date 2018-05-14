// console.log(process.env.NODE_ENV);
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
export let URL = type =>{
  if(process.env.NODE_ENV == 'production') {
    return 'n1admin.na12345.com'
  } else{
    switch (type) {
      case 'game':
        return 'dgjmusja39cm2.cloudfront.net'
        break
      default:
        return 'd3rqtlfdd4m9wd.cloudfront.net'
        break
    }
  }
}
// console.log(URL);

export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL + '/vaptcha/getDownTime'
}
