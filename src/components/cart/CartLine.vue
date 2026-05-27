<script setup>
import { RouterLink } from 'vue-router'
import { formatPrice } from '@/utils/formatPrice'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  line: { type: Object, required: true },
})

const cart = useCartStore()

function dec() {
  cart.updateQuantity(props.line.productId, props.line.quantity - 1)
}
function inc() {
  cart.updateQuantity(props.line.productId, props.line.quantity + 1)
}
function remove() {
  cart.removeProduct(props.line.productId)
}
</script>

<template>
  <article class="line">
    <RouterLink :to="`/produit/${line.slug}`" class="line__image">
      <img v-if="line.image" :src="line.image" :alt="line.name" />
    </RouterLink>
    <div class="line__body">
      <RouterLink :to="`/produit/${line.slug}`" class="line__name">
        {{ line.name }}
      </RouterLink>
      <p class="line__sku">SKU : {{ line.sku }}</p>
      <div class="line__controls">
        <div class="qty" role="group" aria-label="Quantité">
          <button type="button" @click="dec" aria-label="Diminuer">−</button>
          <span>{{ line.quantity }}</span>
          <button type="button" @click="inc" aria-label="Augmenter">+</button>
        </div>
        <button type="button" class="line__remove" @click="remove">Retirer</button>
      </div>
    </div>
    <div class="line__total">
      {{ formatPrice({ amount: line.price.amount * line.quantity, currency: 'EUR' }) }}
    </div>
  </article>
</template>

<style scoped>
.line {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(0 0 0 / 0.1);
  align-items: start;
}
.line__image {
  width: 80px;
  height: 80px;
  border-radius: 0.4rem;
  overflow: hidden;
  background: var(--color-brand-cream);
  display: block;
}
.line__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.line__name {
  font-weight: 700;
  color: var(--color-brand-ink);
  text-decoration: none;
  display: block;
  margin-bottom: 0.2rem;
}
.line__name:hover {
  text-decoration: underline;
}
.line__sku {
  font-size: 0.7rem;
  color: rgb(0 0 0 / 0.5);
  margin: 0 0 0.6rem;
  font-family: monospace;
}
.line__controls {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.qty {
  display: inline-flex;
  align-items: center;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.4rem;
  overflow: hidden;
}
.qty button {
  background: var(--color-brand-paper);
  border: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-weight: 700;
}
.qty button:hover {
  background: var(--color-brand-yellow);
}
.qty span {
  display: inline-block;
  min-width: 32px;
  text-align: center;
  font-weight: 700;
}
.line__remove {
  background: none;
  border: none;
  color: rgb(0 0 0 / 0.55);
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
}
.line__remove:hover {
  color: var(--color-stock-out);
}
.line__total {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--color-brand-ink);
  align-self: center;
}
</style>
