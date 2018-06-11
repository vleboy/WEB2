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
