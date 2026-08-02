<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import SortSelect from '@/components/catalog/SortSelect.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import PageContainer from '@/components/ui/PageContainer.vue'
import { useCatalogStore } from '@/stores/catalog'

const catalog = useCatalogStore()
const { products, loading, error, page, totalElements, totalPages } = storeToRefs(catalog)
const route = useRoute()
const router = useRouter()
const search = ref(String(route.query.q ?? ''))
const sort = ref(String(route.query.tri ?? 'name-asc'))
let debounceTimer

const apiSort = () => ({
  'name-asc': 'name,asc',
  'price-asc': 'regularPrice,asc',
  'price-desc': 'regularPrice,desc',
}[sort.value] ?? 'name,asc')

function fetchPage(requestedPage = 0) {
  router.replace({ query: {
    ...(search.value.trim() ? { q: search.value.trim() } : {}),
    ...(sort.value !== 'name-asc' ? { tri: sort.value } : {}),
    ...(requestedPage ? { page: requestedPage + 1 } : {}),
  } })
  catalog.loadProducts({ search: search.value, page: requestedPage, sort: apiSort() })
}

watch(search, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => fetchPage(0), 400)
})
watch(sort, () => fetchPage(0))

onMounted(() => {
  const initialPage = Math.max(0, Number(route.query.page ?? 1) - 1)
  catalog.loadReferences()
  fetchPage(initialPage)
})
</script>

<template>
  <PageContainer width="wide">
    <header class="page__header">
      <h1 class="text-stamp">Catalogue</h1>
      <p class="page__count">{{ totalElements }} produit{{ totalElements > 1 ? 's' : '' }}</p>
    </header>

    <div class="page__bar">
      <input v-model="search" type="search" placeholder="Rechercher par nom ou EAN…"
        class="page__search" aria-label="Rechercher un produit" />
      <SortSelect v-model="sort" />
    </div>

    <div v-if="loading" class="state" role="status">Chargement des produits…</div>
    <div v-else-if="error" class="state state--error" role="alert">
      <p>{{ error }}</p><button type="button" @click="fetchPage(page)">Réessayer</button>
    </div>
    <ProductGrid v-else :products="products" />

    <nav v-if="!loading && !error && totalPages > 1" class="pagination" aria-label="Pagination du catalogue">
      <button type="button" :disabled="page === 0" @click="fetchPage(page - 1)">← Précédent</button>
      <span>Page {{ page + 1 }} sur {{ totalPages }}</span>
      <button type="button" :disabled="page >= totalPages - 1" @click="fetchPage(page + 1)">Suivant →</button>
    </nav>
  </PageContainer>
</template>

<style scoped>
.page__header { margin-bottom: 1.8rem; display: flex; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
.page__header h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0; }
.page__count { margin: 0; font-weight: 700; color: var(--color-ink-muted); }
.page__bar { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
.page__search { flex: 1; min-width: 220px; padding: .55rem .9rem; border: 2px solid var(--color-brand-ink); border-radius: .4rem; font: .9rem var(--font-sans); background: var(--color-brand-paper); }
.state { text-align: center; padding: 4rem 1rem; color: var(--color-ink-muted); }
.state--error { color: var(--color-brand-ink); }
.state button, .pagination button { border: 2px solid var(--color-brand-ink); border-radius: .4rem; background: var(--color-brand-yellow); padding: .55rem .85rem; font-weight: 700; cursor: pointer; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem; font-weight: 700; }
.pagination button:disabled { opacity: .4; cursor: not-allowed; }
</style>
