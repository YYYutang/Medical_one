import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import represent from "@/views/represent.vue";
import visualization from "@/views/visualization.vue";
import dataManage from "@/views/dataManage.vue";
import introduce from"@/views/introduce/introduce.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
