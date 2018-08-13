import main from '@/components/main'
import err404 from '@/pages/404'
import login from '@/pages/login'

import home from '@/pages/home'
import giftList from '@/pages/giftList'
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
export const otherRouter={
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    title:'other',
    component: main,
    children: [
        { path: 'home', name: 'home',title:'首页', component: home},
    ]
}
// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter=[
    {
        path:'/gift',
        title:'礼品',
        name:'gift',
        component:main,
        children:[{path:'giftList',title:'礼品中心', name:'giftList',component:giftList}]
    },
]
export const routers = [
    page404,
    loginRouter,
    otherRouter,
    ...appRouter,
]