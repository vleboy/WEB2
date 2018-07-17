import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import basic from '@/pages/basic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {path:'basic',title:'基本信息',name:'allGame',component:basic}
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