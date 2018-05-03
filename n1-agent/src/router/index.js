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
router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth == false) {
		next()
	}else{
		if(window.localStorage.getItem('n1token')) {
			next()
		}else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	}
});

router.afterEach((to) => {
    window.scrollTo(0, 0);
});