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
import completeMissing from "@/views/completeMissing/index.vue"
import characterChoose from "@/components/characterChoose/index.vue"
import datasetChoose from "@/components/datasetChoose/index.vue"
import missingalgo from "@/views/completeMissing/algo.vue"
import missingoutcome from "@/views/completeMissing/outcome.vue"
import stasticAnalyze from "@/views/stasticAnalyze/index.vue"
import describeAnalyze from "@/views/stasticAnalyze/describeAnalyze/index.vue"
import describeOutcome from "@/views/stasticAnalyze/describeAnalyze/outcome.vue"
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
    {
      path: '/completeMissing',
      name: 'completeMissing',
      component: completeMissing,
    },
    {
      path: '/characterChoose',
      name: 'characterChoose',
      component: characterChoose,
    },
    {
      path: '/datasetChoose',
      name: 'datasetChoose',
      component: datasetChoose,
    },
    {
      path: '/missingalgo',
      name: 'missingalgo',
      component: missingalgo,
    },
    {
      path: '/missingoutcome',
      name: 'missingoutcome',
      component: missingoutcome,
    },
    {
      path: '/stasticAnalyze',
      name: 'stasticAnalyze',
      component: stasticAnalyze,
    },
    {
      path: '/describeAnalyze',
      name: 'describeAnalyze',
      component: describeAnalyze,
    },
    {
      path: '/describeOutcome',
      name: 'describeOutcome',
      component: describeOutcome,
    }
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
