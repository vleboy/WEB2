import main from '@/pages/main'

export const loginRouter = {
    path: '/login',
    name: 'login',
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
        { path: 'addAdmin', name: 'addAdmin',title:'新增管理员', component: () => import('@/pages/adminCenter/addAdmin.vue')},
        { path: 'createRole', name: 'createRole',title:'创建新角色', component: () => import('@/pages/adminCenter/createRole.vue')},
        { path: 'addMerchant', name: 'addMerchant',title:'创建商户', component: () => import('@/pages/businessCenter/addMerchant.vue')},
        { path: 'addLineMerchant', name: 'addLineMerchant',title:'创建线路商', component: () => import('@/pages/businessCenter/addLineMerchant.vue')},
        { path: 'lineDetail', name: 'lineDetail',title:'线路商详情', component: () => import('@/pages/businessCenter/lineDetail.vue')},
        { path: 'merchantDetail', name: 'merchantDetail',title:'商户详情', component: () => import('@/pages/businessCenter/merchantDetail.vue')},
        { path: 'detail', name:'playDetail', title:'玩家详情',  meta: {keepAlive: true}, component:()=>import('@/pages/player/playerdetail.vue')},
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
        path:'/ysb',
        title:'YSB体育游戏',
        name:'ysb',
        component:main,
        children:[{path:'sport',title:'YSB体育游戏报表',name:'ysbSport',component:()=>import('@/pages/reports/ysbSport.vue')}]
    },
    {
        path:'/business',
        title:'商户列表',
        name:'business',
        component:main,
        children:[
            {path:'list',title:'商户列表',name:'businessList',component:()=>import('@/pages/businessCenter/merchantList.vue')},
            {path:'line',title:'线路商列表',name:'lineBusiness',component:()=>import('@/pages/businessCenter/lineList.vue')},
            {path:'warn',title:'接入商点数警告列表',name:'warnList',component:()=>import('@/pages/businessCenter/warnList.vue')}
    ]
    },
    {
        path:'/admin',
        title:'管理员列表',
        name:'admin',
        component:main,
        children:[
            {path:'list',title:'管理员列表',name:'adminList',component:()=>import('@/pages/adminCenter/adminList.vue')},
            {path:'role',title:'管理员角色列表',name:'adminRole',component:()=>import('@/pages/adminCenter/adminRole.vue')},
            {path:'line',title:'线路号列表',name:'lineNumList',component:()=>import('@/pages/adminCenter/lineNumList.vue')},
    ]
    },
    {
        path:'/log',
        title:'日志',
        name:'log',
        component:main,
        children:[
            {path:'lineLogin',title:'线路商登录日志',name:'lineLoginLog',component:()=>import('@/pages/log/lineLoginLog.vue')},
            {path:'merchant',title:'商户登录日志',name:'merchantLog',component:()=>import('@/pages/log/merchantLog.vue')},
            {path:'admin',title:'管理员操作日志',name:'adminLog',component:()=>import('@/pages/log/adminLog.vue')},
            {path:'debug',title:'DEBUG日志',name:'debugLog',component:()=>import('@/pages/log/debugLog.vue')},
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
    },
    {
      path:'/operation',
      title:'运营中心',
      name:'operation',
      component:main,
      children:[
          {path:'gameNoticeList',title:'游戏公告列表',name:'gameNoticeList',component:()=>import('@/pages/operation/gameNoticeMgr/gameNoticeList.vue')},
          {path:'gameMailList',title:'游戏邮件列表',name:'gameMailList',component:()=>import('@/pages/operation/mailMgr/gameMailList.vue')},
          {path:'horseRaceLampList',title:'跑马灯列表',name:'horseRaceLampList',component:()=>import('@/pages/operation/horseRaceLampMgr/horseRaceLampList.vue')},
          {path:'businessRecord',title:'商户运营记录',name:'businessRecord',component:()=>import('@/pages/operation/businessRecord/businessRecordList.vue')},
          {path:'boothList',title:'展位列表',name:'boothList',component:()=>import('@/pages/operation/booth/boothList.vue')},
          {path:'propPrice',title:'道具定价',name:'propPrice',component:()=>import('@/pages/operation/propPrize/propPrizeList.vue')}
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
