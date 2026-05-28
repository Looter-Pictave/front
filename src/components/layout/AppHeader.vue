<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter, useRoute } from 'vue-router'

import BrandLogo from '@/components/base/BrandLogo.vue'
import BaseChip from '@/components/base/BaseChip.vue'
import { useCartStore } from '@/stores/cart'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const cart = useCartStore()
const ui = useUiStore()
const auth = useAuthStore()
const { count } = storeToRefs(cart)
const { isAuthenticated, isAdmin, displayName, currentUser } = storeToRefs(auth)

// Ref sur tout le header : sert à détecter les clics à l'extérieur pour
// fermer les deux menus (dropdown user + menu burger mobile).
const headerRef = ref(null)

// Dropdown user (authentifié)
const userMenuOpen = ref(false)
function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value
}
function closeUserMenu() {
  userMenuOpen.value = false
}

// Menu burger (mobile, < 960px)
const mobileMenuOpen = ref(false)
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function handleClickOutside(e) {
  if (headerRef.value && !headerRef.value.contains(e.target)) {
    closeUserMenu()
    closeMobileMenu()
  }
}
function handleEsc(e) {
  if (e.key === 'Escape') {
    closeUserMenu()
    closeMobileMenu()
  }
}

// Ferme les deux menus à chaque changement de route.
watch(
  () => route.fullPath,
  () => {
    closeUserMenu()
    closeMobileMenu()
  },
)

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleEsc)
})

async function handleLogout() {
  closeUserMenu()
  await auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header__inner">
      <!-- Burger : visible uniquement < 960px (où la nav desktop est cachée) -->
      <button
        type="button"
        class="header__burger"
        :aria-expanded="mobileMenuOpen"
        aria-label="Ouvrir le menu de navigation"
        @click="toggleMobileMenu"
      >
        <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>

      <RouterLink to="/" class="header__brand" aria-label="Accueil Looter Pictave">
        <BrandLogo :size="56" />
        <div class="header__wordmark">
          <span class="header__name">Looter Pictave</span>
          <span class="header__tagline">Pop Culture &amp; Collections</span>
        </div>
      </RouterLink>

      <nav class="header__nav" aria-label="Navigation principale">
        <RouterLink to="/" class="header__link">Accueil</RouterLink>
        <RouterLink to="/catalogue" class="header__link">Catalogue</RouterLink>
        <RouterLink to="/a-propos" class="header__link">La boutique</RouterLink>
        <RouterLink to="/contact" class="header__link">Contact</RouterLink>
      </nav>

      <div class="header__actions">
        <!-- Bouton Connexion si non authentifié -->
        <RouterLink
          v-if="!isAuthenticated"
          :to="{ name: 'login' }"
          class="header__login"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span class="header__login-label">Connexion</span>
        </RouterLink>

        <!-- Dropdown user si authentifié -->
        <div v-else ref="userMenuRef" class="header__user">
          <button
            type="button"
            class="header__user-trigger"
            :aria-expanded="userMenuOpen"
            aria-haspopup="menu"
            @click="toggleUserMenu"
          >
            <span class="header__user-avatar" aria-hidden="true">
              {{ (currentUser.firstName?.[0] ?? '?').toUpperCase() }}
            </span>
            <span class="header__user-name">{{ displayName }}</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div v-if="userMenuOpen" class="header__menu" role="menu">
            <RouterLink
              :to="{ name: 'account-orders' }"
              class="header__menu-item"
              role="menuitem"
              @click="closeUserMenu"
            >
              📦 Mes commandes
            </RouterLink>
            <RouterLink
              :to="{ name: 'account-profile' }"
              class="header__menu-item"
              role="menuitem"
              @click="closeUserMenu"
            >
              👤 Mon profil
            </RouterLink>
            <RouterLink
              :to="{ name: 'account-addresses' }"
              class="header__menu-item"
              role="menuitem"
              @click="closeUserMenu"
            >
              📍 Mes adresses
            </RouterLink>
            <RouterLink
              v-if="isAdmin"
              :to="{ name: 'admin' }"
              class="header__menu-item header__menu-item--admin"
              role="menuitem"
              @click="closeUserMenu"
            >
              🛡️ Pannel admin
            </RouterLink>
            <div class="header__menu-sep" role="separator" />
            <button
              type="button"
              class="header__menu-item header__menu-item--logout"
              role="menuitem"
              @click="handleLogout"
            >
              ↩️ Déconnexion
            </button>
          </div>
        </div>

        <button
          type="button"
          class="header__cart"
          aria-label="Ouvrir le panier"
          @click="ui.toggleCart()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span class="header__cart-label">Panier</span>
          <BaseChip v-if="count > 0" variant="yellow" size="sm">
            {{ count }}
          </BaseChip>
        </button>
      </div>
    </div>

    <!-- Menu déroulant mobile (< 960px), ouvert via le burger -->
    <nav v-if="mobileMenuOpen" class="header__mobile" aria-label="Navigation mobile">
      <RouterLink to="/" class="header__mobile-link" @click="closeMobileMenu">Accueil</RouterLink>
      <RouterLink to="/catalogue" class="header__mobile-link" @click="closeMobileMenu">Catalogue</RouterLink>
      <RouterLink to="/a-propos" class="header__mobile-link" @click="closeMobileMenu">La boutique</RouterLink>
      <RouterLink to="/contact" class="header__mobile-link" @click="closeMobileMenu">Contact</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-brand-yellow);
  border-bottom: 3px solid var(--color-brand-ink);
  position: sticky;
  top: 0;
  z-index: 50;
}
.header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.6rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
/* ===== Burger mobile ===== */
.header__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  background: transparent;
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-sm);
  color: var(--color-brand-ink);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.header__burger:hover {
  background: rgb(0 0 0 / 0.08);
}
@media (min-width: 960px) {
  .header__burger {
    display: none;
  }
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}
.header__wordmark {
  display: none;
  flex-direction: column;
  line-height: 1;
}
.header__name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-brand-ink);
}
.header__tagline {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-brand-ink);
  margin-top: 4px;
  font-weight: 600;
}
.header__nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}
.header__link {
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
  color: var(--color-brand-ink);
  text-decoration: none;
  padding: 0.5rem 0.25rem;
  border-bottom: 3px solid transparent;
  transition: border-color 0.15s ease;
}
.header__link:hover,
.header__link.router-link-active {
  border-bottom-color: var(--color-brand-ink);
}
.header__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.header__nav + .header__actions {
  margin-left: 0;
}
.header__cart {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-brand-ink);
  color: var(--color-brand-paper);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 0.9rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.15s ease;
}
.header__cart:hover {
  background: #000;
}
.header__cart-label {
  display: none;
}

@media (min-width: 720px) {
  .header__wordmark {
    display: flex;
  }
  .header__cart-label {
    display: inline;
  }
  .header__user-name {
    display: inline;
  }
  .header__login-label {
    display: inline;
  }
}
@media (min-width: 960px) {
  .header__nav {
    display: flex;
  }
}

/* ===== Menu déroulant mobile ===== */
.header__mobile {
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--color-brand-ink);
}
@media (min-width: 960px) {
  .header__mobile {
    display: none;
  }
}
.header__mobile-link {
  padding: 0.95rem 1.25rem;
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.95rem;
  color: var(--color-brand-ink);
  text-decoration: none;
  border-bottom: 1px solid rgb(0 0 0 / 0.12);
}
.header__mobile-link:last-child {
  border-bottom: none;
}
.header__mobile-link:active,
.header__mobile-link.router-link-active {
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
}

/* ===== Bouton Connexion (non authentifié) ===== */
.header__login {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--color-brand-ink);
  border: 2px solid var(--color-brand-ink);
  border-radius: 9999px;
  padding: 0.45rem 0.9rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: background 0.15s ease;
}
.header__login:hover {
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
}
.header__login-label {
  display: none;
}

/* ===== Dropdown user (authentifié) ===== */
.header__user {
  position: relative;
}
.header__user-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
  border: none;
  border-radius: 9999px;
  padding: 0.35rem 0.8rem 0.35rem 0.35rem;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s ease;
}
.header__user-trigger:hover {
  background: #000;
}
.header__user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--color-brand-yellow);
  color: var(--color-brand-ink);
  border-radius: 9999px;
  font-family: var(--font-display);
  font-size: 0.85rem;
}
.header__user-name {
  display: none;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-stamp);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  z-index: 60;
}
.header__menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.7rem;
  color: var(--color-brand-ink);
  text-decoration: none;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: var(--radius-sm);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}
.header__menu-item:hover {
  background: var(--color-brand-cream);
}
.header__menu-item--admin {
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
}
.header__menu-item--admin:hover {
  background: #000;
  color: var(--color-brand-yellow);
}
.header__menu-item--logout {
  color: var(--color-stock-out);
}
.header__menu-sep {
  height: 1px;
  background: var(--color-line);
  margin: 0.3rem 0;
}
</style>
