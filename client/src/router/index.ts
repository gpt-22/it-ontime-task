import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/records',
    name: 'Records',
    component: () => import('../views/Records.vue')
  },
  {
    path: '/records/:id',
    name: 'Record',
    component: () => import('../views/Record.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
