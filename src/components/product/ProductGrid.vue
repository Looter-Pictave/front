<script setup>
import ProductCard from '@/components/product/ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
})
</script>

<template>
  <div v-if="products.length" class="product-grid">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
  <div v-else class="product-grid__empty">
    <p>Aucun produit ne correspond à ces critères pour le moment.</p>
  </div>
</template>

<style scoped>
/* NB : on évite la classe `grid` qui entre en collision avec l'utility
   Tailwind v4 du même nom (display: grid sans colonnes), ce qui peut
   écraser nos colonnes et faire tomber les cartes en pile verticale. */
.product-grid {
  display: grid;
  /* Grille responsive explicite : 2 colonnes mobile, 3 tablette, 4 desktop.
     Plus prévisible que auto-fill : les lignes incomplètes restent
     alignées à gauche au lieu d'étirer/orpheliner les cartes. */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.4rem;
}
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 960px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.product-grid__empty {
  text-align: center;
  padding: 4rem 1rem;
  color: rgb(0 0 0 / 0.6);
}
</style>
