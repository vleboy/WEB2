import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import homeNoRank from '@/components/homeNoRank'
import err from '@/pages/404'
import basic from '@/pages/basic'
import loginDetail from '@/pages/loginDetail'
import rankDetail from '@/pages/rankDetail'
import killDetail from '@/pages/killDetail'
import priceDetail from '@/pages/priceDetail'
import rateDetail from '@/pages/rateDetail'
import countDetail from '@/pages/countDetail'
import profitDetail from '@/pages/profitDetail'
import payDetail from '@/pages/payDetail'
import gameCountDetail from '@/pages/gameCountDetail'
import betDetail from '@/pages/betDetail'
import onlineDetail from '@/pages/onlineDetail'
import freeDetail from '@/pages/freeCountDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'error-404',
      meta: {
          title: '404-页面不存在',
          requireAuth: false
      },
      component: err
    },
    {
      path: '/',
      name: 'home',
      redirect: '/basic',
      component: home,
      children:[
        {path:'basic',meta: {title: '基本信息'},name:'allGame',component:basic},
        {path:'profitDetail',meta: {title: '盈利详情'},name:'profitDetail',component:profitDetail},
        {path:'payDetail',meta: {title: '赔付详情'},name:'payDetail',component:payDetail},
        {path:'gameCountDetail',meta: {title: '游戏局数详情'},name:'gameCountDetail',component:gameCountDetail},
        {path:'betDetail',meta: {title: '下注详情'},name:'betDetail',component:betDetail},
        {path:'loginDetail',meta: {title: '登录详情'},name:'loginDetail',component:loginDetail},
        {path:'killDetail', meta: {title: '游戏杀数'},name:'killDetail',component:killDetail},
        {path:'priceDetail',meta: {title: '大奖详情'},name:'priceDetail',component:priceDetail},
        {path:'rateDetail', meta: {title: '游戏命中率'},name:'rateDetail',component:rateDetail},
        {path:'countDetail',meta: {title: '次数详情'},name:'countDetail',component:countDetail},
        {path:'onlineDetail',meta: {title: '在线详情'},name:'onlineDetail',component:onlineDetail},
        {path:'freeDetail',meta: {title: '免费次数与赔付详情'},name:'freeDetail',component:freeDetail},
      ]
    },
    {
      path: '/',
      name: 'rank',
      component: homeNoRank,
      children:[
        {path:'rankDetail',title:'游戏排名',name:'rankDetail',meta: {title: '游戏排名'},component:rankDetail}
      ]
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = window.localStorage.getItem('n1token')
//   if (token) {
//     next()
//   } else {
//     if (to.name == 'login') {
//       next();
//     } else {
//       next({
//         name: 'login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }

// });

// router.afterEach((to) => {
//   window.scrollTo(0, 0);
// });