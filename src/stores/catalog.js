import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import franchisesData from '@/data/franchises.json'

export const useCatalogStore = defineStore('catalog', () => {
  // Au jalon 1 les données sont mockées (JSON statique).
  // Plus tard, ces refs seront alimentées par api.js (Spring Boot → JDC).
  const products = ref(productsData)
  const categories = ref(categoriesData)
  const franchises = ref(franchisesData)

  const featured = computed(() => products.value.filter((p) => p.isFeatured))

  const byCategory = (categorySlug) =>
    products.value.filter((p) => p.categories.includes(categorySlug))

  const findBySlug = (slug) => products.value.find((p) => p.slug === slug)

  /**
   * Filtre + tri du catalogue.
   * @param {object} opts
   * @param {string=} opts.category   slug catégorie
   * @param {string=} opts.franchise  nom de franchise
   * @param {string=} opts.condition  new | used | collector
   * @param {string=} opts.search     recherche texte
   * @param {string=} opts.sort       'name-asc' | 'price-asc' | 'price-desc' | 'newest'
   */
  const filter = (opts = {}) => {
    let list = products.value.slice()
    if (opts.category) list = list.filter((p) => p.categories.includes(opts.category))
    if (opts.franchise) list = list.filter((p) => p.franchise === opts.franchise)
    if (opts.condition) list = list.filter((p) => p.condition === opts.condition)
    if (opts.search) {
      const q = opts.search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.franchise.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
    }
    switch (opts.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price.amount - b.price.amount)
        break
      case 'price-desc':
        list.sort((a, b) => b.price.amount - a.price.amount)
        break
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
        break
      default:
        break
    }
    return list
  }

  return {
    products,
    categories,
    franchises,
    featured,
    byCategory,
    findBySlug,
    filter,
  }
})
