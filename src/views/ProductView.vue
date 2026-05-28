<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import ProductBadges from '@/components/product/ProductBadges.vue'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductPrice from '@/components/product/ProductPrice.vue'
import StockBadge from '@/components/product/StockBadge.vue'
import { useCatalogStore } from '@/stores/catalog'
import { useCartStore } from '@/stores/cart'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const catalog = useCatalogStore()
const cart = useCartStore()
const ui = useUiStore()

const product = computed(() => catalog.findBySlug(route.params.slug))
const related = computed(() => {
  if (!product.value) return []
  return catalog.products
    .filter(
      (p) =>
        p.id !== product.value.id &&
        (p.franchise === product.value.franchise ||
          p.categories.some((c) => product.value.categories.includes(c))),
    )
    .slice(0, 4)
})

const canBuy = computed(
  () => product.value && product.value.stock.status !== 'out_of_stock',
)

function addToCart() {
  if (!product.value || !canBuy.value) return
  cart.addProduct(product.value, 1)
  ui.openCart()
}
</script>

<template>
  <div v-if="product" class="page">
    <nav class="page__breadcrumb" aria-label="Fil d'Ariane">
      <RouterLink to="/">Accueil</RouterLink>
      <span>/</span>
      <RouterLink to="/catalogue">Catalogue</RouterLink>
      <span>/</span>
      <span>{{ product.name }}</span>
    </nav>

    <div class="product">
      <ProductGallery :images="product.images" />

      <div class="product__body">
        <p class="product__franchise">{{ product.franchise }}</p>
        <h1 class="product__name">{{ product.name }}</h1>

        <div class="product__chips">
          <StockBadge :stock="product.stock" />
          <ProductBadges :product="product" />
        </div>

        <ProductPrice
          :price="product.price"
          :compare-at-price="product.compareAtPrice"
          size="lg"
        />

        <p class="product__short">{{ product.shortDescription }}</p>

        <div class="product__actions">
          <BaseButton size="lg" :disabled="!canBuy" @click="addToCart">
            {{ canBuy ? 'Ajouter au panier' : 'Indisponible' }}
          </BaseButton>
        </div>

        <dl class="product__meta">
          <div><dt>SKU</dt><dd>{{ product.sku }}</dd></div>
          <div v-if="product.ean"><dt>EAN</dt><dd>{{ product.ean }}</dd></div>
          <div><dt>Marque</dt><dd>{{ product.brand }}</dd></div>
          <div><dt>Catégorie</dt><dd>{{ product.categories.join(', ') }}</dd></div>
        </dl>

        <div class="product__desc">
          <h2>Description</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <section v-if="related.length" class="related">
      <h2 class="related__title text-stamp">À découvrir aussi</h2>
      <ProductGrid :products="related" />
    </section>
  </div>

  <div v-else class="missing">
    <h1>Produit introuvable</h1>
    <p>Ce produit n'existe pas ou n'est plus en ligne.</p>
    <BaseButton to="/catalogue">Retour au catalogue</BaseButton>
  </div>
</template>

<style scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.8rem 1.25rem 4rem;
  width: 100%;
}
.page__breadcrumb {
  font-size: 0.8rem;
  color: var(--color-ink-muted);
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.page__breadcrumb a {
  color: var(--color-brand-ink);
  text-decoration: none;
}
.page__breadcrumb a:hover {
  text-decoration: underline;
}

.product {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}
@media (min-width: 880px) {
  .product {
    grid-template-columns: 1fr 1fr;
  }
}
.product__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product__franchise {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-ink-muted);
}
.product__name {
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  line-height: 1.15;
}
.product__chips {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.product__short {
  font-size: 1.05rem;
  line-height: 1.5;
  margin: 0.4rem 0 0;
}
.product__actions {
  margin-top: 0.6rem;
}
.product__meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.6rem 1rem;
  padding: 1rem 0;
  border-top: 2px dashed var(--color-line);
  border-bottom: 2px dashed var(--color-line);
  margin-top: 1rem;
}
.product__meta div {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.product__meta dt {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-muted);
  font-weight: 700;
}
.product__meta dd {
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
}
.product__desc h2 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem;
}
.product__desc p {
  line-height: 1.6;
}

.related {
  margin-top: 4rem;
}
.related__title {
  font-size: 1.8rem;
  margin-bottom: 1.4rem;
}

.missing {
  max-width: 600px;
  margin: 4rem auto;
  padding: 0 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
</style>
