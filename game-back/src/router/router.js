import Main from '@/components/Main'
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
import playerDetail from '@/pages/playerDetail'
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
import mysterySea from '@/pages/games/mysterySea'

import sepcialCount from '@/pages/sepcialCount'
const errRouter={
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        requireAuth: false
    },
    component: err
}

// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// export const otherRouter={
//     path: '/',
//     name: 'otherRouter',
//     redirect: '/home',
//     title:'other',
//     component: main,
//     children: [
//         { path: 'home', name: 'home',title:'首页', component: home},
//     ]
// }
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter=[
    {
        path: '/',
        name: 'main',
        redirect: '/allGame',
        component: Main,
        children:[
          {path:'allGame',title: '全部游戏',name:'allGame',component:allGame},
          {path:'playerDetail',title: '玩家详情',name:'playerDetail',component:playerDetail},
          {path:'profitDetail',title: '盈利详情',name:'profitDetail',component:profitDetail},
          {path:'payDetail',title: '赔付详情',name:'payDetail',component:payDetail},
          {path:'gameCountDetail',title: '游戏局数详情',name:'gameCountDetail',component:gameCountDetail},
          {path:'betDetail',title: '下注详情',name:'betDetail',component:betDetail},
          {path:'loginDetail',title: '登录详情',name:'loginDetail',component:loginDetail},
          {path:'killDetail', title: '游戏杀数',name:'killDetail',component:killDetail},
          {path:'priceNormalDetail',title: '普通模式大奖详情',name:'priceNormalDetail',component:priceNormalDetail},
          {path:'priceFreeDetail',title: '免费模式大奖详情',name:'priceFreeDetail',component:priceFreeDetail},
          {path:'rateDetail', title: '游戏命中率',name:'rateDetail',component:rateDetail},
          {path:'countDetail',title: '次数详情',name:'countDetail',component:countDetail},
          {path:'onlineDetail',title: '在线详情',name:'onlineDetail',component:onlineDetail},
          {path:'freeDetail',title: '免费次数与赔付详情',name:'freeDetail',component:freeDetail},
          {path:'caisheng',title: '财神进宝',name:'caisheng',component:caisheng},
          {path:'taluo',title: '塔罗之谜',name:'taluo',component:taluo},
          {path:'chuniang',title: '小厨娘',name:'chuniang',component:chuniang},
          {path:'xianglong',title: '祥龙献瑞',name:'xianglong',component:xianglong},
          {path:'sifang',title: '四方神兽',name:'sifang',component:sifang},
          {path:'fuyun',title: '福运亨通',name:'fuyun',component:fuyun},
          {path:'panda',title: '熊猫传奇',name:'panda',component:panda},
          {path:'football',title: '幸运足球',name:'football',component:football},
          {path:'mysterySea',title: '神秘海域',name:'mysterySea',component:mysterySea},
          {path:'sepcialCount',title: '特殊统计',name:'sepcialCount',component:sepcialCount},
        ]
      }
    ]

export const routers=[
    errRouter,
    ...appRouter
]