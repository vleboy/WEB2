import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import homeNoRank from '@/components/homeNoRank'
import err from '@/pages/404'
import basic from '@/pages/basic'
import loginDetail from '@/pages/loginDetail'
import rankDetail from '@/pages/rankDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'error-404',
      meta: {
          title: '404-页面不存在',
          requireAuth: false
      },
      component: err
    },
    {
      path: '/',
      name: 'home',
      redirect: '/basic',
      component: home,
      children:[
        {path:'basic',title:'基本信息',name:'allGame',component:basic}
      ]
    },
    {
      path: '/',
      name: 'login',
      component: home,
      children:[
        {path:'loginDetail',title:'登录详情',name:'loginDetail',component:loginDetail}
      ]
    },
    {
      path: '/',
      name: 'rank',
      component: homeNoRank,
      children:[
        {path:'rankDetail',title:'游戏排名',name:'rankDetail',component:rankDetail}
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = window.localStorage.getItem('n1token')
//   if (token) {
//     next()
//   } else {
//     if (to.name == 'login') {
//       next();
//     } else {
//       next({
//         name: 'login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }

// });

// router.afterEach((to) => {
//   window.scrollTo(0, 0);
// });