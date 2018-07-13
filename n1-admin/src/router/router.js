import main from '@/pages/main'
import login from '@/pages/login'
import err404 from '@/pages/404'
//otherRouter
import home from '@/pages/home'
import createRole from '@/pages/adminCenter/createRole'
import addAdmin from '@/pages/adminCenter/addAdmin'
import addMerchant from '@/pages/businessCenter/addMerchant'
import addLineMerchant from '@/pages/businessCenter/addLineMerchant'
import lineDetail from '@/pages/businessCenter/lineDetail'
import merchantDetail from '@/pages/businessCenter/merchantDetail'
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
import naAll from '@/pages/reports/naAllReport'
import saAll from '@/pages/reports/saAllReport'
import safishing from '@/pages/reports/saFishingGame'
import satrue from '@/pages/reports/saTrueGame'
import ttgvideo from '@/pages/reports/ttgVideoGame'
import ysbSport from '@/pages/reports/ysbSport'
import rtgGame from '@/pages/reports/rtgGame'

import businessList from '@/pages/businessCenter/merchantList'
import lineBusiness from '@/pages/businessCenter/lineList'
import warnList from '@/pages/businessCenter/warnList'
import adminList from '@/pages/adminCenter/adminList'
import adminRole from '@/pages/adminCenter/adminRole'
import lineNumList from '@/pages/adminCenter/lineNumList'
import lineLoginLog from '@/pages/log/lineLoginLog'
import merchantLog from '@/pages/log/merchantLog'
import adminLog from '@/pages/log/adminLog'
import debugLog from '@/pages/log/debugLog'
import dataRepair from '@/pages/log/dataRepair'
import playerlist from '@/pages/player/playerlist'
import gameNoticeList from '@/pages/operation/gameNoticeMgr/gameNoticeList'
import gameMailList from '@/pages/operation/mailMgr/gameMailList'
import horseRaceLampList from '@/pages/operation/horseRaceLampMgr/horseRaceLampList'
import businessRecordList from '@/pages/operation/businessRecord/businessRecordList'
import boothList from '@/pages/operation/booth/boothList'
import propPrizeList from '@/pages/operation/propPrize/propPrizeList'
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
        { path: 'addAdmin', name: 'addAdmin',title:'新增管理员', component: addAdmin},
        { path: 'createRole', name: 'createRole',title:'创建新角色', component: createRole},
        { path: 'addMerchant', name: 'addMerchant',title:'创建商户', component: addMerchant},
        { path: 'addLineMerchant', name: 'addLineMerchant',title:'创建线路商', component: addLineMerchant},
        { path: 'lineDetail', name: 'lineDetail',title:'线路商详情', component: lineDetail},
        { path: 'merchantDetail', name: 'merchantDetail',title:'商户详情', component: merchantDetail},
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
        path:'/ysb',
        title:'YSB体育游戏',
        name:'ysb',
        component:main,
        children:[{path:'sport',title:'YSB体育游戏报表',name:'ysbSport',component:ysbSport}]
    },
    {
        path:'/business',
        title:'商户列表',
        name:'business',
        component:main,
        children:[
            {path:'merchant',title:'商户列表',name:'merchantList',component:businessList},
            {path:'manager',title:'线路商列表',name:'lineDealer',component:lineBusiness},
            {path:'warn',title:'接入商点数警告列表',name:'warnList',component:warnList}
    ]
    },
    {
        path:'/admin',
        title:'管理员列表',
        name:'admin',
        component:main,
        children:[
            {path:'list',title:'管理员列表',name:'adminList',component:adminList},
            {path:'role',title:'管理员角色列表',name:'adminRole',component:adminRole},
            {path:'line',title:'线路号列表',name:'lineNumList',component:lineNumList},
    ]
    },
    {
        path:'/log',
        title:'日志',
        name:'log',
        component:main,
        children:[
            {path:'lineLogin',title:'线路商登录日志',name:'lineLoginLog',component:lineLoginLog},
            {path:'merchant',title:'商户登录日志',name:'merchantLog',component:merchantLog},
            {path:'admin',title:'管理员操作日志',name:'adminLog',component:adminLog},
            {path:'debug',title:'DEBUG日志',name:'debugLog',component:debugLog},
            {path:'dataRepair',title:'DEBUG修正',name:'dataRepair',component:dataRepair},
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
          {path:'businessRecord',title:'商户运营记录',name:'businessRecord',component:businessRecordList},
          {path:'boothList',title:'展位列表',name:'boothList',component:boothList},
          {path:'propPrice',title:'道具定价',name:'propPrice',component:propPrizeList}
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