<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import ProductBadges from '@/components/product/ProductBadges.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const primaryImage = computed(
  () => props.product.images?.find((i) => i.primary) ?? props.product.images?.[0] ?? null,
)
</script>

<template>
  <RouterLink :to="`/produit/${product.slug}`" class="card panel">
    <div class="card__media">
      <img v-if="primaryImage" :src="primaryImage.url" :alt="primaryImage.alt || product.name" loading="lazy" />
      <div v-else class="card__placeholder">Image indisponible</div>
      <div class="card__overlay">
        <ProductBadges :product="product" />
      </div>
    </div>
    <div class="card__body">
      <p class="card__franchise">{{ product.brand?.name ?? 'Marque non renseignée' }} · {{ product.franchise?.name ?? 'Sans franchise' }}</p>
      <h3 class="card__name">{{ product.name }}</h3>
      <ProductPrice :regular-price="product.regularPrice" :promo-price="product.promoPrice" :currency="product.currency" size="sm" />
      <p class="card__stock">{{ product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock' }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
/* fond + bordure + radius + ombre fournis par .panel */
.card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-stamp-lg);
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
.card__placeholder { width:100%;height:100%;display:grid;place-items:center;padding:1rem;text-align:center;color:var(--color-ink-muted);font-weight:700 }
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
  color: var(--color-ink-muted);
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
.card__stock { margin:0; font-size:.75rem; color:var(--color-ink-muted); font-weight:600 }
</style>
