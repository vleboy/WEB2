import main from '@/pages/main'

export const loginRouter = {
    path: '/login',
    name: 'login',
    // meta: {
    //     title: 'Login - 登录'
    // },
    meta: {
        requireAuth: false
      },
    component: () => import('@/pages/login.vue')
};
export const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在',
        requireAuth: false
    },
    component: () => import('@/pages/404.vue')
};
// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    title:'other',
    component: main,
    children: [
        { path: 'home', name: 'home',title:'首页', component: () => import('@/pages/home.vue')},
        { path: 'agentDetail', name: 'agentDetail',title:'代理详情', component: () => import('@/pages/agentCenter/agentDetail.vue')},
        { path: 'detail', name:'playDetail', title:'玩家详情', component:()=>import('@/pages/player/playerdetail.vue')}
    ]
};
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path:'/ownspace',
        title:'个人中心',
        name:'ownspace',
        component:main,
        children:[{path:'index',title:'个人中心', name:'ownspace-index',component:()=>import('@/pages/ownSpace.vue')}]
    },
    {
      path:'/boards',
      title:'看板',
      name:'boards',
      component:main,
      children:[{path:'board',title:'看板', name:'board',component:()=>import('@/pages/board/board.vue')}]
    },
    {
        path:'/allreport',
        title:'公司输赢总报表',
        name:'all',
        component:main,
        children:[{path:'all',title:'公司输赢总报表',name:'allreport',component:()=>import('@/pages/reports/allReport.vue')}]
    },
    {
        path:'/aggame',
        title:'AG游戏报表',
        name:'aggame',
        component:main,
        children:[{path:'true',title:'AG真人游戏报表',name:'agtrue',component:()=>import('@/pages/reports/agTrueGame.vue')}]
    },
    {
        path:'/mggame',
        title:'MG游戏报表',
        name:'mggame',
        component:main,
        children:[{path:'video',title:'MG电子游戏报表',name:'mgvideo',component:()=>import('@/pages/reports/mgVideoGame.vue')}]
    },
    {
        path:'/nagame',
        title:'NA游戏报表',
        name:'nagame',
        component:main,
        children:[
            {path:'card',title:'NA棋牌游戏报表',name:'nacard',component:()=>import('@/pages/reports/naCardGame.vue')},
            {path:'street',title:'NA街机游戏报表',name:'nastreet',component:()=>import('@/pages/reports/naStreetGame.vue')},
            {path:'true',title:'NA真人游戏报表',name:'natrue',component:()=>import('@/pages/reports/naTrueGame.vue')},
            {path:'video',title:'NA电子游戏报表',name:'navideo',component:()=>import('@/pages/reports/naVideoGame.vue')},
            {path:'all',title:'NA游戏总报表',name:'naAll',component:()=>import('@/pages/reports/naAllReport.vue')}
        ]
    },
    {
        path:'/sagame',
        title:'SA游戏报表',
        name:'sagame',
        component:main,
        children:[
            {path:'all',title:'SA游戏总报表',name:'saAll',component:()=>import('@/pages/reports/saAllReport.vue')},
            {path:'fishing',title:'SA捕鱼游戏报表',name:'safishing',component:()=>import('@/pages/reports/saFishingGame.vue')},
            {path:'true',title:'SA真人游戏报表',name:'satrue',component:()=>import('@/pages/reports/saTrueGame.vue')},
        ]
    },
    {
        path:'/ttggame',
        title:'TTG游戏报表',
        name:'ttggame',
        component:main,
        children:[{path:'video',title:'TTG电子游戏报表',name:'ttgvideo',component:()=>import('@/pages/reports/ttgVideoGame.vue')}]
    },
    {
        path:'/uggame',
        title:'UG游戏报表',
        name:'uggame',
        component:main,
        children:[{path:'sport',title:'UG体育游戏报表',name:'ugsport',component:()=>import('@/pages/reports/ugSportGame.vue')}]
    },
    {
        path:'/agent',
        title:'代理列表',
        name:'agent',
        component:main,
        children:[
            {path:'list',title:'代理列表',name:'agentList',component:()=>import('@/pages/agentCenter/agentList.vue')},
            {path:'warn',title:'警告列表',name:'warnList',component:()=>import('@/pages/agentCenter/warnList.vue')}
        ]
    },
    {
        path:'/log',
        title:'日志中心',
        name:'log',
        component:main,
        children:[
            {path:'adminLogin',title:'管理员登录日志',name:'adminLoginLog',component:()=>import('@/pages/logCenter/adminLoginLog.vue')},
            {path:'agentLogin',title:'代理登录日志',name:'agentLoginLog',component:()=>import('@/pages/logCenter/agentLoginLog.vue')},
            {path:'adminOpreate',title:'管理员操作日志',name:'adminOpreateLog',component:()=>import('@/pages/logCenter/adminOpreateLog.vue')},
        ]
    },
    {
        path:'/admin',
        title:'管理中心',
        name:'admin',
        component:main,
        children:[
            {path:'list',title:'管理员列表',name:'adminList',component:()=>import('@/pages/adminCenter/adminList.vue')},
        ]
    },
    {
        path:'/game',
        title:'游戏中心',
        name:'game',
        component:main,
        children:[
            {path:'config',title:'包房代理游戏配置',name:'gameConfig',component:()=>import('@/pages/gameCenter/gameConfig.vue')},
        ]
    },
    {
      path:'/play',
      title:'玩家列表',
      name:'play',
      component:main,
      children:[
        {path:'list',title:'玩家列表',name:'playList',component:()=>import('@/pages/player/playerlist.vue')}
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
