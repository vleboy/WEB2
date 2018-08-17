// console.log(process.env.NODE_ENV);
// export const URL='d3rqtlfdd4m9wd.cloudfront.net'
export let URL = type => {
  if (process.env.NODE_ENV == 'production') {
    switch (type) {
      case 'admin':
        return 'n1admin.na12345.com'
        break
      default:
        return 'n1game.na12345.com'
        break
    }
  } else {
    switch (type) {
      case 'admin':
        return 'd3rqtlfdd4m9wd.cloudfront.net'//login url
        break
      default:
        return 'dgjmusja39cm2.cloudfront.net'
        break
    }
  }
}
// console.log(URL);

export const httpType = 'https://'

export const api = {
  getVaptcha: httpType + URL('admin') + '/vaptcha/getVaptcha',
  getDownTime: httpType + URL('admin') + '/vaptcha/getDownTime'//宕机
}
