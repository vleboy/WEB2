import main from '@/pages/main'

export const loginRouter = {
    path: '/login',
    name: 'login',
    // meta: {
    //     title: 'Login - 登录'
    // },
    component: () => import('@/pages/login.vue')
};

// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: main,
    children: [
        { path: 'home', name: 'home', component: () => import('@/pages/home.vue')},
    ]
};
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path:'/ugreport',
        title:'ug报表',
        name:'ugreport',
        component:main,
        children:[{path:'index',title:'ug报表',name:'ugreport-index',component:()=>import('@/pages/ugreport.vue')}]
    },{
        path:'/ownspace',
        title:'个人中心',
        name:'ownspace',
        component:main,
        children:[{path:'index',title:'个人中心', name:'ownspace-index',component:()=>import('@/pages/ownSpace.vue')}]
    }
  
]
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
];
