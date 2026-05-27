<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/base/BaseButton.vue'
import CartLine from '@/components/cart/CartLine.vue'
import { useCartStore } from '@/stores/cart'
import { useUiStore } from '@/stores/ui'

const cart = useCartStore()
const ui = useUiStore()
const { lines, isEmpty, subtotal, count } = storeToRefs(cart)
const { isCartOpen } = storeToRefs(ui)
</script>

<template>
  <Transition name="drawer">
    <div v-if="isCartOpen" class="drawer-wrap">
      <div class="drawer__overlay" @click="ui.closeCart()" />
      <aside class="drawer" role="dialog" aria-label="Panier">
        <header class="drawer__header">
          <h2>Panier <span v-if="count > 0">({{ count }})</span></h2>
          <button type="button" aria-label="Fermer le panier" @click="ui.closeCart()">
            ✕
          </button>
        </header>

        <div class="drawer__body">
          <div v-if="isEmpty" class="drawer__empty">
            <p>Ton panier est vide pour le moment.</p>
            <p class="drawer__empty-sub">
              File chercher quelques pièces dans le <RouterLink to="/catalogue" @click="ui.closeCart()">catalogue</RouterLink>.
            </p>
          </div>
          <CartLine v-for="line in lines" :key="line.productId" :line="line" />
        </div>

        <footer v-if="!isEmpty" class="drawer__footer">
          <div class="drawer__subtotal">
            <span>Sous-total</span>
            <strong>{{ formatPrice(subtotal) }}</strong>
          </div>
          <BaseButton to="/panier" block @click="ui.closeCart()">
            Voir le panier
          </BaseButton>
        </footer>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-wrap {
  position: fixed;
  inset: 0;
  z-index: 100;
}
.drawer__overlay {
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
}
.drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 100%);
  background: var(--color-brand-paper);
  border-left: 3px solid var(--color-brand-ink);
  display: flex;
  flex-direction: column;
  box-shadow: -6px 0 0 0 var(--color-brand-yellow);
}
.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;
  border-bottom: 2px solid var(--color-brand-ink);
  background: var(--color-brand-yellow);
}
.drawer__header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
}
.drawer__header button {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 1;
}
.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.4rem;
}
.drawer__empty {
  padding: 3rem 0;
  text-align: center;
  color: var(--color-ink-soft);
}
.drawer__empty-sub {
  font-size: 0.85rem;
  margin-top: 0.4rem;
}
.drawer__empty-sub a {
  color: var(--color-brand-ink);
  font-weight: 700;
}
.drawer__footer {
  padding: 1.2rem 1.4rem;
  border-top: 2px solid var(--color-brand-ink);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: var(--color-brand-cream);
}
.drawer__subtotal {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}
</style>
