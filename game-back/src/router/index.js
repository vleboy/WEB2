import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import homeNoRank from '@/components/homeNoRank'
import err from '@/pages/404'
//detail
import loginDetail from '@/pages/loginDetail'
import rankDetail from '@/pages/rankDetail'
import killDetail from '@/pages/killDetail'
import priceFreeDetail from '@/pages/priceFreeDetail'
import priceNormalDetail from '@/pages/priceNormalDetail'
import rateDetail from '@/pages/rateDetail'
import countDetail from '@/pages/countDetail'
import profitDetail from '@/pages/profitDetail'
import payDetail from '@/pages/payDetail'
import gameCountDetail from '@/pages/gameCountDetail'
import betDetail from '@/pages/betDetail'
import onlineDetail from '@/pages/onlineDetail'
import freeDetail from '@/pages/freeCountDetail'
// games
import allGame from '@/pages/games/allGame'
import caisheng from '@/pages/games/caisheng'
import chuniang from '@/pages/games/chuniang'
import football from '@/pages/games/football'
import fuyun from '@/pages/games/fuyun'
import panda from '@/pages/games/panda'
import sifang from '@/pages/games/sifang'
import taluo from '@/pages/games/taluo'
import xianglong from '@/pages/games/xianglong'


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
      redirect: '/allGame',
      component: home,
      children:[
        {path:'allGame',meta: {title: '全部游戏'},name:'allGame',component:allGame},
        {path:'profitDetail',meta: {title: '盈利详情'},name:'profitDetail',component:profitDetail},
        {path:'payDetail',meta: {title: '赔付详情'},name:'payDetail',component:payDetail},
        {path:'gameCountDetail',meta: {title: '游戏局数详情'},name:'gameCountDetail',component:gameCountDetail},
        {path:'betDetail',meta: {title: '下注详情'},name:'betDetail',component:betDetail},
        {path:'loginDetail',meta: {title: '登录详情'},name:'loginDetail',component:loginDetail},
        {path:'killDetail', meta: {title: '游戏杀数'},name:'killDetail',component:killDetail},
        {path:'priceNormalDetail',meta: {title: '普通模式大奖详情'},name:'priceNormalDetail',component:priceNormalDetail},
        {path:'priceFreeDetail',meta: {title: '免费模式大奖详情'},name:'priceFreeDetail',component:priceFreeDetail},
        {path:'rateDetail', meta: {title: '游戏命中率'},name:'rateDetail',component:rateDetail},
        {path:'countDetail',meta: {title: '次数详情'},name:'countDetail',component:countDetail},
        {path:'onlineDetail',meta: {title: '在线详情'},name:'onlineDetail',component:onlineDetail},
        {path:'freeDetail',meta: {title: '免费次数与赔付详情'},name:'freeDetail',component:freeDetail},
        {path:'caisheng',meta: {title: '财神进宝'},name:'caisheng',component:caisheng},
        {path:'taluo',meta: {title: '塔罗之谜'},name:'taluo',component:taluo},
        {path:'chuniang',meta: {title: '小厨娘'},name:'chuniang',component:chuniang},
        {path:'xianglong',meta: {title: '祥龙献瑞'},name:'xianglong',component:xianglong},
        {path:'sifang',meta: {title: '四方神兽'},name:'sifang',component:sifang},
        {path:'fuyun',meta: {title: '福运亨通'},name:'fuyun',component:fuyun},
        {path:'panda',meta: {title: '熊猫传奇'},name:'panda',component:panda},
        {path:'football',meta: {title: '幸运足球'},name:'football',component:football},
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