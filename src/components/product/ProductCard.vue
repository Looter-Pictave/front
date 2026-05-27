<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BaseChip from '@/components/base/BaseChip.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const primaryImage = computed(
  () => props.product.images.find((i) => i.isPrimary) ?? props.product.images[0],
)
const isUsed = computed(() => props.product.condition === 'used')
const isCollector = computed(() => props.product.condition === 'collector')
</script>

<template>
  <RouterLink :to="`/produit/${product.slug}`" class="card">
    <div class="card__media">
      <img :src="primaryImage.url" :alt="primaryImage.alt" loading="lazy" />
      <div class="card__overlay">
        <BaseChip v-if="isUsed" variant="yellow" size="sm">Occasion</BaseChip>
        <BaseChip v-if="isCollector" variant="ink" size="sm">Collector</BaseChip>
        <BaseChip v-if="product.isImport" variant="outline" size="sm">Import JP</BaseChip>
      </div>
    </div>
    <div class="card__body">
      <p class="card__franchise">{{ product.franchise }}</p>
      <h3 class="card__name">{{ product.name }}</h3>
      <ProductPrice
        :price="product.price"
        :compare-at-price="product.compareAtPrice"
        size="sm"
      />
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.6rem;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 4px 4px 0 0 var(--color-brand-ink);
}
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 var(--color-brand-ink);
}
.card__media {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--color-brand-cream);
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card__overlay {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-start;
}
.card__body {
  padding: 0.85rem 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.card__franchise {
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(0 0 0 / 0.55);
  font-weight: 700;
}
.card__name {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-brand-ink);
  /* truncate à 2 lignes */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
