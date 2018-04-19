import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers,otherRouter,appRouter} from './router'
Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);
// router.beforeEach((to, from, next) => {
   
// });

// router.afterEach((to) => {
//     // window.scrollTo(0, 0);
// });