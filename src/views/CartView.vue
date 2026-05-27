<script setup>
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import CartLine from '@/components/cart/CartLine.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { lines, isEmpty } = storeToRefs(cart)
</script>

<template>
  <div class="page">
    <h1 class="page__title text-stamp">Ton panier</h1>

    <div v-if="isEmpty" class="page__empty">
      <p>Ton panier est vide.</p>
      <BaseButton to="/catalogue" size="lg">Aller au catalogue</BaseButton>
    </div>

    <div v-else class="page__layout">
      <section class="page__lines">
        <CartLine v-for="line in lines" :key="line.productId" :line="line" />
      </section>
      <CartSummary />
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
  width: 100%;
}
.page__title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 2rem;
}
.page__empty {
  text-align: center;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.page__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}
@media (min-width: 880px) {
  .page__layout {
    grid-template-columns: 1fr 360px;
  }
}
.page__lines {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 0.5rem 1.4rem;
  box-shadow: 4px 4px 0 0 var(--color-brand-ink);
}
</style>
