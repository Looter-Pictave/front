<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/base/BrandLogo.vue'
import BaseChip from '@/components/base/BaseChip.vue'
import { useCartStore } from '@/stores/cart'
import { useUiStore } from '@/stores/ui'

const cart = useCartStore()
const ui = useUiStore()
const { count } = storeToRefs(cart)
</script>

<template>
  <header class="header">
    <div class="header__inner">
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
}
@media (min-width: 960px) {
  .header__nav {
    display: flex;
  }
}
</style>
