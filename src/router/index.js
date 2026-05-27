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
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AccountLayout from '@/views/account/AccountLayout.vue'
import AccountOrders from '@/views/account/AccountOrders.vue'
import AccountProfile from '@/views/account/AccountProfile.vue'
import AccountAddresses from '@/views/account/AccountAddresses.vue'
import AccountSettings from '@/views/account/AccountSettings.vue'
import AdminView from '@/views/admin/AdminView.vue'
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
    path: '/connexion',
    name: 'login',
    component: LoginView,
    meta: { title: 'Connexion' },
  },
  {
    path: '/inscription',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Inscription' },
  },
  {
    path: '/mon-compte',
    component: AccountLayout,
    meta: { requiresAuth: true, title: 'Mon compte' },
    children: [
      { path: '', redirect: { name: 'account-orders' } },
      {
        path: 'commandes',
        name: 'account-orders',
        component: AccountOrders,
        meta: { title: 'Mes commandes' },
      },
      {
        path: 'profil',
        name: 'account-profile',
        component: AccountProfile,
        meta: { title: 'Mon profil' },
      },
      {
        path: 'adresses',
        name: 'account-addresses',
        component: AccountAddresses,
        meta: { title: 'Mes adresses' },
      },
      {
        path: 'parametres',
        name: 'account-settings',
        component: AccountSettings,
        meta: { title: 'Paramètres' },
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin' },
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

/**
 * Guard global : protège les routes avec meta.requiresAuth / meta.requiresAdmin.
 *
 * On ne peut PAS importer useAuthStore au top du fichier (Pinia n'est pas
 * encore monté à ce moment-là), il faut l'importer DANS la fonction de guard,
 * appelée après que main.js ait fait `app.use(pinia)`.
 */
router.beforeEach(async (to) => {
  // Import dynamique : Pinia est forcément initialisé quand un guard tire.
  const { useAuthStore } = await import('@/stores/auth')
  const auth = useAuthStore()

  if (to.meta?.requiresAuth && !auth.isAuthenticated) {
    // On garde la destination en query pour rediriger après login.
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta?.requiresAdmin && !auth.isAdmin) {
    return { name: 'home' }
  }

  // Inverse : si déjà connecté et on va sur /connexion ou /inscription,
  // on file directement sur /mon-compte (pas de double connexion).
  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'account-orders' }
  }
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} — Looter Pictave` : 'Looter Pictave'
})

export default router
