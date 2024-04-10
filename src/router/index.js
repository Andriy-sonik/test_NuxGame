import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUTS } from '@/constants/index.js'
import LoginPage from '../pages/LoginPage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage,
      meta: { layout: LAYOUTS.MAIN }
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('../pages/UserInfoPage/index.vue'),
      meta: { layout: LAYOUTS.MAIN }
    }
  ]
})

export default router
