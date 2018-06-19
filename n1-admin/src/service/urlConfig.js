// console.log(process.env.NODE_ENV);
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
export let URL = type => {
  if (process.env.NODE_ENV == 'production') {
    switch (type) {
      case 'game':
        return 'n1game.na12345.com'
        break
      case 'data':
        return '7fmj5t2yhf.execute-api.ap-southeast-1.amazonaws.com/dev'
      default:
        return 'n1admin.na12345.com'
        break
    }
  } else {
    switch (type) {
      case 'game':
        return 'dgjmusja39cm2.cloudfront.net'
        break
      case 'data':
        return 'jrryxhd7e4.execute-api.ap-southeast-1.amazonaws.com/dev'
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
  getVaptcha: httpType + URL() + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL() + '/vaptcha/getDownTime'
}
