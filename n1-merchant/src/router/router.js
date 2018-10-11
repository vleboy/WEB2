import main from '@/pages/main'
import login from '@/pages/login'
import err404 from '@/pages/404'
//otherRouter
import home from '@/pages/home'
import playerDetail from '@/pages/player/playerdetail'
// appRouter
import ownSpace from '@/pages/ownSpace'
import board from '@/pages/board/board'
import allReport from '@/pages/reports/allReport'
import agtrue from '@/pages/reports/agTrueGame'
import mgvideo from '@/pages/reports/mgVideoGame'
import nacard from '@/pages/reports/naCardGame'
import nastreet from '@/pages/reports/naStreetGame'
import natrue from '@/pages/reports/naTrueGame'
import navideo from '@/pages/reports/naVideoGame'
import nahfive from '@/pages/reports/nahfive'
import naFishing from '@/pages/reports/naFishing'
import naAll from '@/pages/reports/naAllReport'
import saAll from '@/pages/reports/saAllReport'
import safishing from '@/pages/reports/saFishingGame'
import satrue from '@/pages/reports/saTrueGame'
import sbAll from '@/pages/reports/sbAllReport'
import sbvideo from '@/pages/reports/sbVideoGame'
import sbtrue from '@/pages/reports/sbTrueGame'
import ttgvideo from '@/pages/reports/ttgVideoGame'
import ysbSport from '@/pages/reports/ysbSport'
import rtgGame from '@/pages/reports/rtgGame'
import dtGame from '@/pages/reports/dtReport'
import ppGame from '@/pages/reports/ppGame'
import pgVideo from '@/pages/reports/pgVideo'
import habaVideo from '@/pages/reports/habaVideo'
import pngVideo from '@/pages/reports/pngVideo'

import opreateLog from '@/pages/log/opreateLog'
import playerlist from '@/pages/player/playerlist'
import gameNoticeList from '@/pages/operation/gameNoticeMgr/gameNoticeList'
import gameMailList from '@/pages/operation/mailMgr/gameMailList'
import horseRaceLampList from '@/pages/operation/horseRaceLampMgr/horseRaceLampList'
import boothList from '@/pages/operation/booth/merchantBoothList'
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
        path:'/png',
        title:'PNG电子游戏报表',
        name:'png',
        component:main,
        children:[{path:'video',title:'PNG电子游戏报表',name:'pngGame',component:pngVideo}]
    },
    {
        path:'/pg',
        title:'PG电子游戏报表',
        name:'pg',
        component:main,
        children:[{path:'video',title:'PG电子游戏报表',name:'pgGame',component:pgVideo}]
    },
    {
        path:'/haba',
        title:'HABA电子游戏报表',
        name:'haba',
        component:main,
        children:[{path:'video',title:'HABA电子游戏报表',name:'habaGame',component:habaVideo}]
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
            {path:'hfive',title:'NA电子H5报表',name:'nahfive',component:nahfive},
            {path:'all',title:'NA游戏总报表',name:'naAll',component:naAll},
            {path:'fishing',title:'NA捕鱼游戏报表',name:'nafishing',component:naFishing},
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
        path:'/sbgame',
        title:'SB游戏报表',
        name:'sbgame',
        component:main,
        children:[
            {path:'all',title:'SB游戏总报表',name:'sbAll',component:sbAll},
            {path:'video',title:'SB电子游戏报表',name:'sbvideo',component:sbvideo},
            {path:'true',title:'SB真人游戏报表',name:'sbtrue',component:sbtrue},
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
        path:'/pp',
        title:'pp',
        name:'pp',
        component:main,
        children:[{path:'video',title:'PP电子游戏报表',name:'ppGame',component:ppGame}]
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
            {path:'opreate',title:'操作日志',name:'opreateLog',component:opreateLog},
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
    {
      path:'/operation',
      title:'运营中心',
      name:'operation',
      component:main,
      children:[
          {path:'gameNoticeList',title:'游戏公告列表',name:'gameNoticeList',component:gameNoticeList},
          {path:'gameMailList',title:'游戏邮件列表',name:'gameMailList',component:gameMailList},
          {path:'horseRaceLampList',title:'跑马灯列表',name:'horseRaceLampList',component:horseRaceLampList},
          {path:'boothList',title:'展位列表',name:'boothList',component:boothList},
        ]
    }
]
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    page404,
    loginRouter,
    otherRouter,
    ...appRouter,
]
