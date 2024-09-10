import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import HomeView from '@/views/HomeView.vue'
import LoaderView from '@/views/LoaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: LoaderView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/succes',
      name: 'succes',
      component: () => import('@/views/SuccesView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/OrdersView.vue')
      // @ts-ignore

    },
    {
      path: '/orders/:id(\\d+)',
      name: 'order-detail',
      // @ts-ignore
      component: () => import('@/views/OrderDetailView.vue')
    },
    {
      path: '/order',
      name: 'order',
      // @ts-ignore
      component: () => import('@/views/OrderCreateView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log({ to, from })
  const isAuthenticated = Cookies.get('token') || false
  if (to.name !== 'main' && !isAuthenticated) next({ name: 'main' })
  else next()
})

export default router
