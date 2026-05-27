<script setup>
import { computed } from 'vue'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps({
  price: { type: Object, required: true },
  compareAtPrice: { type: Object, default: null },
  size: { type: String, default: 'md' }, // sm | md | lg
})

const current = computed(() => formatPrice(props.price))
const old = computed(() => (props.compareAtPrice ? formatPrice(props.compareAtPrice) : null))
const discount = computed(() => {
  if (!props.compareAtPrice) return null
  const pct = 1 - props.price.amount / props.compareAtPrice.amount
  return Math.round(pct * 100)
})
</script>

<template>
  <div class="price" :class="`price--${size}`">
    <span class="price__current">{{ current }}</span>
    <span v-if="old" class="price__old">{{ old }}</span>
    <span v-if="discount" class="price__discount">−{{ discount }}%</span>
  </div>
</template>

<style scoped>
.price {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.price__current {
  font-family: var(--font-display);
  color: var(--color-brand-ink);
}
.price--sm .price__current {
  font-size: 1.1rem;
}
.price--md .price__current {
  font-size: 1.4rem;
}
.price--lg .price__current {
  font-size: 2rem;
}
.price__old {
  text-decoration: line-through;
  color: rgb(0 0 0 / 0.5);
  font-size: 0.9em;
}
.price__discount {
  background: var(--color-brand-ink);
  color: var(--color-brand-yellow);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}
</style>
