import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import BasicRoutesPage from '@/pages/BasicRoutesPage.vue'
import DynamicUserPage from '@/pages/DynamicUserPage.vue'
import QueryCatalogPage from '@/pages/QueryCatalogPage.vue'
import ProgrammaticNavigationPage from '@/pages/ProgrammaticNavigationPage.vue'
import SuccessPage from '@/pages/SuccessPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/basic',
      name: 'basic',
      component: BasicRoutesPage
    },
    {
      path: '/users',
      redirect: { name: 'user', params: { id: 1 } }
    },
    {
      path: '/users/:id(\\d+)',
      name: 'user',
      component: DynamicUserPage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: QueryCatalogPage
    },
    {
      path: '/actions',
      name: 'actions',
      component: ProgrammaticNavigationPage
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
})
