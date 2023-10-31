import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import represent from "@/views/represent.vue";
import visualization from "@/views/visualization.vue";
import dataManage from "@/views/dataManage.vue";
import introduce from"@/views/introduce/introduce.vue"
import logIn from "@/views/User/login.vue"
import register from "@/views/User/register.vue"
import columnManage from "@/views/columnManage/columnManage.vue"
import operationManage from "@/views/operationManage.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'logIn',
    component: logIn
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/first',
    redirect: '/introduce',
    name: 'first',
    component: SideBar,
    children: [{
      path: '/dash',
      name: 'dash',
      component: dash
    },
    {
      path: '/represent',
      name: 'represent',
      component: represent,
    }, {
      path: '/visualization',
      name: 'visualization',
      component: visualization,
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      component: dataManage,
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: introduce,
    },
    {
      path: '/operationManage',
      name: 'operationManage',
      component: operationManage,
    },
    {
      path: '/columnManage',
      name: 'columnManage',
      component: columnManage,
    },
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
