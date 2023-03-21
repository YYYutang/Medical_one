import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import SideBar from '../components/sideBar/index.vue'
// import about from '../views/AboutView.vue'
import dash from '../views/dash/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dash',
    component: SideBar,
    children:[{
      path : '/dash',
      name: 'dash',
      components : dash
    }]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
