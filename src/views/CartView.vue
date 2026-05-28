<script setup>
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton.vue'
import CartLine from '@/components/cart/CartLine.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { lines, isEmpty } = storeToRefs(cart)
</script>

<template>
  <div class="page">
    <PageHeader title="Ton panier" size="lg" />

    <EmptyState v-if="isEmpty" message="Ton panier est vide.">
      <BaseButton to="/catalogue" size="lg">Aller au catalogue</BaseButton>
    </EmptyState>

    <div v-else class="page__layout">
      <section class="page__lines panel">
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
/* surface fournie par .panel */
.page__lines {
  padding: 0.5rem 1.4rem;
}
</style>
