import { createRouter, createWebHistory } from 'vue-router'

/**
 * Eager imports volontaires (pas de lazy `() => import(...)`).
 *
 * Pourquoi : le combo `<Transition mode="out-in">` (App.vue) + composants
 * lazy crée une race condition au premier passage sur une route — le temps
 * que le chunk arrive du serveur, l'ancien composant est déjà sorti et le
 * nouveau n'est pas encore là → page blanche jusqu'au F5 (le chunk est alors
 * en cache).
 *
 * Avec 7 vues légères, le coût en taille de bundle est négligeable et on
 * gagne un comportement déterministe. Si le projet grossit et qu'on veut
 * vraiment du code-splitting, il faudra wrapper `<RouterView>` dans
 * `<Suspense>` avec un fallback.
 */
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import LegalView from '@/views/LegalView.vue'
import TermsView from '@/views/TermsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Accueil' },
  },
  {
    path: '/catalogue',
    name: 'catalog',
    component: CatalogView,
    meta: { title: 'Catalogue' },
  },
  {
    path: '/produit/:slug',
    name: 'product',
    component: ProductView,
    meta: { title: 'Produit' },
  },
  {
    path: '/panier',
    name: 'cart',
    component: CartView,
    meta: { title: 'Panier' },
  },
  {
    path: '/a-propos',
    name: 'about',
    component: AboutView,
    meta: { title: 'La boutique' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact' },
  },
  {
    path: '/mentions-legales',
    name: 'legal',
    component: LegalView,
    meta: { title: 'Mentions légales' },
  },
  {
    path: '/cgv',
    name: 'terms',
    component: TermsView,
    meta: { title: 'CGV' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
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
