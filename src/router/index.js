import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import cardiovascular from "@/views/cardiovascular/cardiovascular";
import represent from "@/components/tab/represent.vue";
import visualization from "@/components/tab/visualization.vue";
import dataManage from "@/components/tab/dataManage.vue";
import modelManage from "@/components/tab/modelManage.vue"
import importModel from "@/components/tab/importModel";
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
        path : '/cardiovascular',
        name: 'cardiovascular',
        component : cardiovascular,
        children:[{
          path:'/represent',
          name:'represent',
          component:represent,
        },{
          path:'/visualization',
          name:'visualization',
          component:visualization,
        },
        {
          path:'/dataManage',
          name:'dataManage',
          component:dataManage,
        },
        {
          path:'/modelManage',
          name:'modelManage',
          component:modelManage,
        },
        {
          path:'/importModel',
          name:'importModel',
          component:importModel,
        }
      ]
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
