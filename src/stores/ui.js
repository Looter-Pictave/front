import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isCartOpen = ref(false)
  const isMobileNavOpen = ref(false)

  function openCart() {
    isCartOpen.value = true
  }
  function closeCart() {
    isCartOpen.value = false
  }
  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function openMobileNav() {
    isMobileNavOpen.value = true
  }
  function closeMobileNav() {
    isMobileNavOpen.value = false
  }
  function toggleMobileNav() {
    isMobileNavOpen.value = !isMobileNavOpen.value
  }

  return {
    isCartOpen,
    isMobileNavOpen,
    openCart,
    closeCart,
    toggleCart,
    openMobileNav,
    closeMobileNav,
    toggleMobileNav,
  }
})
