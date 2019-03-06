import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('./views/Home.vue'),
      children:[
    
      {
        path: '/InProgress',
        name: 'InProgress',
        component: () => import('./views/InProgress.vue')
      },
      ]
    },
    {
      path: '/HomeCustomer',
      name: 'HomeCustomer',
      component: () => import('./views/HomeCustomer.vue')
    },
    {
      path: '/CreatPayment',
      name: 'CreatPayment',
      component: () => import('./views/CreatPayment.vue')
    },
  ]
})
