import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import metastasis from "@/views/lung/metastasis";
import earlyLung from "@/views/lung/earlyLung";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/dash',
    name: 'dash',
    component: SideBar,
    children:[{
      path : '/dash',
      name: 'dash',
      component : dash
    },
      {
        path : '/metastasis',
        name: 'metastasis',
        component : metastasis
      },
      {
        path : '/earlyLung',
        name: 'earlyLung',
        component : earlyLung
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
