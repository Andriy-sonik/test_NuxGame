import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUTS } from '@/constants/index.js'
import { ROUTE } from '@/router/routeNames.js'
import LoginPage from '../pages/LoginPage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE.MAIN.path,
      name: ROUTE.MAIN.name,
      component: LoginPage,
      meta: { layout: LAYOUTS.MAIN }
    },
    {
      path: ROUTE.USER.path,
      name: ROUTE.USER.name,
      component: () => import('../pages/UserInfoPage/index.vue'),
      meta: { layout: LAYOUTS.MAIN }
    }
  ]
})

export default router
