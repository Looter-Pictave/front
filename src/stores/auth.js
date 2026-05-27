/**
 * Store Pinia pour l'authentification.
 *
 * Le store est volontairement DÉCOUPLÉ du service auth : il appelle
 * `authMock` aujourd'hui, mais le jour où on branche le vrai back Spring,
 * il suffira de remplacer l'import par un `authApi` qui fait des appels
 * HTTP. Les composants Vue qui utilisent ce store n'auront PAS à changer.
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authMock as authService } from '@/services/authMock'

export const useAuthStore = defineStore('auth', () => {
  // Au boot, on essaie de restaurer une session précédente depuis localStorage.
  // -> permet de rester connecté après un F5.
  const currentUser = ref(authService.getCurrentSession())
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const displayName = computed(() => {
    if (!currentUser.value) return ''
    const { firstName, lastName } = currentUser.value
    return [firstName, lastName].filter(Boolean).join(' ') || currentUser.value.email
  })

  async function login(email, password) {
    isLoading.value = true
    error.value = null
    try {
      currentUser.value = await authService.login(email, password)
      return currentUser.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function register(payload) {
    isLoading.value = true
    error.value = null
    try {
      currentUser.value = await authService.register(payload)
      return currentUser.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await authService.logout()
    currentUser.value = null
  }

  async function updateProfile(updates) {
    if (!currentUser.value) return
    currentUser.value = await authService.updateUser(currentUser.value.id, updates)
  }

  async function addAddress(address) {
    if (!currentUser.value) return
    currentUser.value = await authService.addAddress(currentUser.value.id, address)
  }

  async function removeAddress(addressId) {
    if (!currentUser.value) return
    currentUser.value = await authService.removeAddress(currentUser.value.id, addressId)
  }

  function clearError() {
    error.value = null
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    displayName,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    clearError,
  }
})
