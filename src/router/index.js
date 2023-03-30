import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import metastasis from "@/views/lung/metastasis";
import earlyLung from "@/views/lung/earlyLung";
import connectMining from "@/components/tab/connectMining.vue";
import dangePredict from "@/components/tab/dangePredict.vue";
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
        path : '/metastasis',
        name: 'metastasis',
        component : metastasis
      },
      {
        path : '/earlyLung',
        name: 'earlyLung',
        component : earlyLung,
        children:[{
          path:'/connectMining',
          name:'connectMining',
          component:connectMining,
        },{
          path:'/dangePredict',
          name:'dangePredict',
          component:dangePredict,
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
