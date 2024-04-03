import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage,
      meta: { layout: 'main' }
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('../pages/UserInfoPage/index.vue'),
      meta: { layout: 'main' }
    }
  ]
})

export default router
