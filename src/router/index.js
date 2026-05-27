import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Accueil' },
  },
  {
    path: '/catalogue',
    name: 'catalog',
    component: () => import('@/views/CatalogView.vue'),
    meta: { title: 'Catalogue' },
  },
  {
    path: '/produit/:slug',
    name: 'product',
    component: () => import('@/views/ProductView.vue'),
    meta: { title: 'Produit' },
  },
  {
    path: '/panier',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Panier' },
  },
  {
    path: '/a-propos',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'La boutique' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page introuvable' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} — Looter Pictave` : 'Looter Pictave'
})

export default router
