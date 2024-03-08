import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import MainView from '@/views/MainView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
