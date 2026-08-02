import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ApiError, catalogApi, productsApi } from '@/services/api'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([])
  const brands = ref([])
  const franchises = ref([])
  const currentProduct = ref(null)
  const loading = ref(false)
  const referencesLoading = ref(false)
  const error = ref('')
  const productError = ref('')
  const page = ref(0)
  const size = ref(24)
  const totalElements = ref(0)
  const totalPages = ref(0)
  let listController

  const featured = computed(() => products.value.slice(0, 4))

  async function loadProducts({ search = '', page: requestedPage = 0, size: requestedSize = 24, sort = 'name,asc' } = {}) {
    listController?.abort()
    listController = new AbortController()
    loading.value = true
    error.value = ''
    try {
      const result = await productsApi.list(
        { search: search.trim(), page: requestedPage, size: requestedSize, sort },
        { signal: listController.signal },
      )
      products.value = result.content ?? []
      page.value = result.number ?? requestedPage
      size.value = result.size ?? requestedSize
      totalElements.value = result.totalElements ?? products.value.length
      totalPages.value = result.totalPages ?? 0
    } catch (cause) {
      if (cause.name !== 'AbortError') {
        products.value = []
        error.value = cause.message
      }
    } finally {
      if (!listController.signal.aborted) loading.value = false
    }
  }

  async function loadProduct(slug) {
    currentProduct.value = null
    productError.value = ''
    loading.value = true
    try {
      currentProduct.value = await productsApi.bySlug(slug)
    } catch (cause) {
      productError.value = cause instanceof ApiError && cause.status === 404
        ? 'Ce produit n’existe pas ou n’est plus en ligne.'
        : cause.message
    } finally {
      loading.value = false
    }
  }

  async function loadReferences() {
    if (categories.value.length || referencesLoading.value) return
    referencesLoading.value = true
    try {
      const [categoryList, brandList, franchiseList] = await Promise.all([
        catalogApi.list('categories'), catalogApi.list('brands'), catalogApi.list('franchises'),
      ])
      categories.value = categoryList.filter((item) => item.active !== false)
      brands.value = brandList.filter((item) => item.active !== false)
      franchises.value = franchiseList.filter((item) => item.active !== false)
    } catch (cause) {
      if (!error.value) error.value = cause.message
    } finally {
      referencesLoading.value = false
    }
  }

  return { products, categories, brands, franchises, currentProduct, featured, loading, referencesLoading,
    error, productError, page, size, totalElements, totalPages, loadProducts, loadProduct, loadReferences }
})
