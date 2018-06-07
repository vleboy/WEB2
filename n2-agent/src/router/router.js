import main from '@/pages/main'
import login from '@/pages/login'
import err404 from '@/pages/404'
import home from '@/pages/home'
import playerDetail from '@/pages/player/playerdetail'
import agentDetail from '@/pages/agentCenter/agentDetail'
import board from '@/pages/board/board'
//report
import ownSpace from '@/pages/ownSpace'
// import board from '@/pages/board/board'
import nacard from '@/pages/reports/naCardGame'
import nastreet from '@/pages/reports/naStreetGame'
import natrue from '@/pages/reports/naTrueGame'
import navideo from '@/pages/reports/naVideoGame'
import naAll from '@/pages/reports/naAllReport'

import agentList from '@/pages/agentCenter/agentList'
import warnList from '@/pages/agentCenter/warnList'
import adminLoginLog from '@/pages/logCenter/adminLoginLog'
import agentLoginLog from '@/pages/logCenter/agentLoginLog'
import adminOpreateLog from '@/pages/logCenter/adminOpreateLog'
import adminList from '@/pages/adminCenter/adminList'
import gameConfig from '@/pages/gameCenter/gameConfig'
import playerList from '@/pages/player/playerlist'
export const loginRouter = {
    path: '/login',
    name: 'login',
    // meta: {
    //     title: 'Login - 登录'
    // },
    meta: {
        requireAuth: false
      },
    component: login
};
export const page404 = {
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
        { path: 'agentDetail', name: 'agentDetail',title:'代理详情', component: agentDetail},
        { path: 'detail', name:'playDetail', title:'玩家详情', component:playerDetail}
    ]
};
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
      path:'/boards',
      title:'看板',
      name:'boards',
      component:main,
      children:[{path:'board',title:'看板', name:'board',component:board}]
    },
    {
        path:'/ownspace',
        title:'个人中心',
        name:'ownspace',
        component:main,
        children:[{path:'index',title:'个人中心', name:'ownspace-index',component:ownSpace}]
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
        path:'/agent',
        title:'代理列表',
        name:'agent',
        component:main,
        children:[
            {path:'list',title:'代理列表',name:'agentList',component:agentList},
            {path:'warn',title:'警告列表',name:'warnList',component:warnList}
        ]
    },
    {
        path:'/log',
        title:'日志中心',
        name:'log',
        component:main,
        children:[
            {path:'adminLogin',title:'管理员登录日志',name:'adminLoginLog',component:adminLoginLog},
            {path:'agentLogin',title:'代理登录日志',name:'agentLoginLog',component:agentLoginLog},
            {path:'adminOpreate',title:'管理员操作日志',name:'adminOpreateLog',component:adminOpreateLog},
        ]
    },
    {
        path:'/admin',
        title:'管理中心',
        name:'admin',
        component:main,
        children:[
            {path:'list',title:'管理员列表',name:'adminList',component:adminList},
        ]
    },
    {
        path:'/game',
        title:'游戏中心',
        name:'game',
        component:main,
        children:[
            {path:'config',title:'包房代理游戏配置',name:'gameConfig',component:gameConfig},
        ]
    },
    {
      path:'/play',
      title:'玩家列表',
      name:'play',
      component:main,
      children:[
        {path:'list',title:'玩家列表',name:'playList',component:playerList}
      ]
    }

]
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    page404,
    loginRouter,
    otherRouter,
    ...appRouter,
];
