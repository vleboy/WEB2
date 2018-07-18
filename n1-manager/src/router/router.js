import main from '@/pages/main'
import login from '@/pages/login'
import err404 from '@/pages/404'
//otherRouter
import home from '@/pages/home'
import playerDetail from '@/pages/player/playerdetail'
// appRouter
import ownSpace from '@/pages/ownSpace'
import board from '@/pages/board/board'
import managerList from '@/pages/businessCenter/managerList'
import merchantList from '@/pages/businessCenter/merchantList'
import managerDetail from '@/pages/businessCenter/managerDetail'
import merchantDetail from '@/pages/businessCenter/merchantDetail'
//report
import allReport from '@/pages/reports/allReport'
import agtrue from '@/pages/reports/agTrueGame'
import mgvideo from '@/pages/reports/mgVideoGame'
import nacard from '@/pages/reports/naCardGame'
import nastreet from '@/pages/reports/naStreetGame'
import natrue from '@/pages/reports/naTrueGame'
import navideo from '@/pages/reports/naVideoGame'
import naAll from '@/pages/reports/naAllReport'
import saAll from '@/pages/reports/saAllReport'
import safishing from '@/pages/reports/saFishingGame'
import satrue from '@/pages/reports/saTrueGame'
import ttgvideo from '@/pages/reports/ttgVideoGame'
import rtgGame from '@/pages/reports/rtgGame'
import ysbSport from '@/pages/reports/ysbSport'
import dtGame from '@/pages/reports/dtReport'

import opreateLog from '@/pages/log/opreateLog'
import merchantLog from '@/pages/log/merchantLog'
import managerLog from '@/pages/log/managerLog'
import playerlist from '@/pages/player/playerlist'
const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        requireAuth: false
      },
    component: login
};
const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        requireAuth: false
    },
    component: err404
};
// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    title:'other',
    component: main,
    children: [
        { path: 'home', name: 'home',title:'首页', component: home},
        { path: 'detail', name:'playDetail', title:'玩家详情',  meta: {keepAlive: true}, component:playerDetail},
        { path: 'managerDetail', name:'managerDetail', title:'线路商详情',  meta: {keepAlive: true}, component:managerDetail},
        { path: 'merchantDetail', name:'merchantDetail', title:'商户详情',  meta: {keepAlive: true}, component:merchantDetail},
    ]
};
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path:'/ownspace',
        title:'个人中心',
        name:'ownspace',
        component:main,
        children:[{path:'index',title:'个人中心', name:'ownspace-index',component:ownSpace}]
    },
    {
        path:'/boards',
        title:'看板',
        name:'boards',
        component:main,
        children:[{path:'board',title:'看板', name:'board',component:board}]
    },
    {
        path:'/allreport',
        title:'公司输赢总报表',
        name:'all',
        component:main,
        children:[{path:'all',title:'公司输赢总报表',name:'allreport',component:allReport}]
    },
    {
        path:'/aggame',
        title:'AG游戏报表',
        name:'aggame',
        component:main,
        children:[{path:'true',title:'AG真人游戏报表',name:'agtrue',component:agtrue}]
    },
    {
        path:'/mggame',
        title:'MG游戏报表',
        name:'mggame',
        component:main,
        children:[{path:'video',title:'MG电子游戏报表',name:'mgvideo',component:mgvideo}]
    },
    {
        path:'/nagame',
        title:'NA游戏报表',
        name:'nagame',
        component:main,
        children:[
            {path:'card',title:'NA棋牌游戏报表',name:'nacard',component:nacard},
            {path:'street',title:'NA街机游戏报表',name:'nastreet',component:nastreet},
            {path:'true',title:'NA真人游戏报表',name:'natrue',component:natrue},
            {path:'video',title:'NA电子游戏报表',name:'navideo',component:navideo},
            {path:'all',title:'NA游戏总报表',name:'naAll',component:naAll}
        ]
    },
    {
        path:'/sagame',
        title:'SA游戏报表',
        name:'sagame',
        component:main,
        children:[
            {path:'all',title:'SA游戏总报表',name:'saAll',component:saAll},
            {path:'fishing',title:'SA捕鱼游戏报表',name:'safishing',component:safishing},
            {path:'true',title:'SA真人游戏报表',name:'satrue',component:satrue},
        ]
    },
    {
        path:'/ttggame',
        title:'TTG游戏报表',
        name:'ttggame',
        component:main,
        children:[{path:'video',title:'TTG电子游戏报表',name:'ttgvideo',component:ttgvideo}]
    },
    {
        path:'/rtg',
        title:'RTG游戏',
        name:'rtg',
        component:main,
        children:[{path:'game',title:'RTG电子游戏报表',name:'rtgGame',component:rtgGame}]
    },
    {
        path:'/dt',
        title:'dt',
        name:'dt',
        component:main,
        children:[{path:'video',title:'DT电子游戏报表',name:'dtGame',component:dtGame}]
    },
    {
        path:'/ysb',
        title:'YSB体育游戏',
        name:'ysb',
        component:main,
        children:[{path:'sport',title:'YSB体育游戏报表',name:'ysbSport',component:ysbSport}]
    },
    {
        path:'/log',
        title:'日志',
        name:'log',
        component:main,
        children:[
            {path:'opreate',title:'管理员操作日志',name:'opreateLog',component:opreateLog},
            {path:'manager',title:'线路商登录日志',name:'managerLog',component:managerLog},
            {path:'merchant',title:'商户登录日志',name:'merchantLog',component:merchantLog},
        ]
    },
    {
        path:'/business',
        title:'商户中心',
        name:'business',
        component:main,
        children:[
            {path:'merchant',title:'商户列表',name:'merchantList',component:merchantList},
            {path:'manager',title:'线路商列表',name:'managerList',component:managerList},
    ]
    },
    {
      path:'/play',
      title:'玩家列表',
      name:'play',
      component:main,
      children:[
          {path:'list',title:'玩家列表',name:'playList',component:playerlist}
        ]
    },
]
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    page404,
    loginRouter,
    otherRouter,
    ...appRouter,
]
