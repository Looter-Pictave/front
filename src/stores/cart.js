import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'lp.cart.v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  /** lignes : [{ productId, sku, name, slug, price, image, quantity }] */
  const lines = ref(loadFromStorage())

  watch(
    lines,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  const count = computed(() => lines.value.reduce((s, l) => s + l.quantity, 0))

  const subtotalCents = computed(() =>
    lines.value.reduce((s, l) => s + l.price.amount * l.quantity, 0),
  )

  const subtotal = computed(() => ({
    amount: subtotalCents.value,
    currency: 'EUR',
  }))

  const isEmpty = computed(() => lines.value.length === 0)

  function addProduct(product, quantity = 1) {
    const existing = lines.value.find((l) => l.productId === product.id)
    if (existing) {
      existing.quantity += quantity
      return
    }
    lines.value.push({
      productId: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      price: { amount: Math.round((product.promoPrice ?? product.regularPrice) * 100), currency: product.currency ?? 'EUR' },
      image: product.images?.find((image) => image.primary)?.url ?? product.images?.[0]?.url ?? null,
      quantity,
    })
  }

  function updateQuantity(productId, quantity) {
    const line = lines.value.find((l) => l.productId === productId)
    if (!line) return
    if (quantity <= 0) {
      removeProduct(productId)
      return
    }
    line.quantity = quantity
  }

  function removeProduct(productId) {
    lines.value = lines.value.filter((l) => l.productId !== productId)
  }

  function clear() {
    lines.value = []
  }

  return {
    lines,
    count,
    subtotal,
    isEmpty,
    addProduct,
    updateQuantity,
    removeProduct,
    clear,
  }
})
