<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import FilterPanel from '@/components/catalog/FilterPanel.vue'
import SortSelect from '@/components/catalog/SortSelect.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { useCatalogStore } from '@/stores/catalog'

const catalog = useCatalogStore()
const route = useRoute()
const router = useRouter()

const filters = ref({
  category: route.query.categorie ?? null,
  franchise: route.query.franchise ?? null,
  condition: route.query.etat ?? null,
  search: route.query.q ?? '',
})
const sort = ref(route.query.tri ?? '')

const results = computed(() =>
  catalog.filter({
    category: filters.value.category,
    franchise: filters.value.franchise,
    condition: filters.value.condition,
    search: filters.value.search,
    sort: sort.value,
  }),
)

// Sync filtres → query-string
watch(
  [filters, sort],
  () => {
    router.replace({
      query: {
        ...(filters.value.category ? { categorie: filters.value.category } : {}),
        ...(filters.value.franchise ? { franchise: filters.value.franchise } : {}),
        ...(filters.value.condition ? { etat: filters.value.condition } : {}),
        ...(filters.value.search ? { q: filters.value.search } : {}),
        ...(sort.value ? { tri: sort.value } : {}),
      },
    })
  },
  { deep: true },
)

function reset() {
  filters.value = { category: null, franchise: null, condition: null, search: '' }
  sort.value = ''
}
</script>

<template>
  <div class="page">
    <header class="page__header">
      <h1 class="text-stamp">Catalogue</h1>
      <p class="page__count">{{ results.length }} produit{{ results.length > 1 ? 's' : '' }}</p>
    </header>

    <div class="page__layout">
      <FilterPanel v-model="filters" @reset="reset" />

      <div class="page__main">
        <div class="page__bar">
          <input
            v-model="filters.search"
            type="search"
            placeholder="Rechercher (nom, franchise, tag...)"
            class="page__search"
            aria-label="Rechercher"
          />
          <SortSelect v-model="sort" />
        </div>
        <ProductGrid :products="results" />
      </div>
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
.page__header {
  margin-bottom: 1.8rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
.page__header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
}
.page__count {
  margin: 0;
  font-weight: 700;
  color: rgb(0 0 0 / 0.55);
}
.page__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 880px) {
  .page__layout {
    grid-template-columns: 260px 1fr;
  }
}
.page__main {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.page__bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
.page__search {
  flex: 1;
  min-width: 220px;
  padding: 0.55rem 0.9rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  background: var(--color-brand-paper);
}
</style>
