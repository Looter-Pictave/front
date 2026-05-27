/**
 * Store thème (clair / sombre).
 *
 * Trois modes possibles :
 *   - 'light'  : forcé clair
 *   - 'dark'   : forcé sombre
 *   - 'auto'   : suit la préférence système (prefers-color-scheme)
 *
 * Le thème actif est appliqué via l'attribut `data-theme` sur <html>,
 * et toutes les variables CSS de main.css réagissent en cascade.
 *
 * Persistance : le mode choisi est mémorisé dans localStorage. Un petit
 * script inline dans index.html applique le thème AVANT le mount Vue
 * pour éviter un flash blanc/sombre au chargement (FOUC).
 */

import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'lp_theme'
const VALID_MODES = ['light', 'dark', 'auto']

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return VALID_MODES.includes(raw) ? raw : 'auto'
  } catch {
    return 'auto'
  }
}

function systemPrefersDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  )
}

function resolveActiveTheme(mode) {
  if (mode === 'dark') return 'dark'
  if (mode === 'light') return 'light'
  return systemPrefersDark() ? 'dark' : 'light'
}

function applyToDocument(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref(readStored())
  const activeTheme = computed(() => resolveActiveTheme(mode.value))
  const isDark = computed(() => activeTheme.value === 'dark')

  // Applique au boot
  applyToDocument(activeTheme.value)

  // Persiste + applique à chaque changement de mode
  watch(mode, (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore quota */
    }
    applyToDocument(resolveActiveTheme(next))
  })

  // Écoute les changements de préférence système (utile en mode 'auto')
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener?.('change', () => {
      if (mode.value === 'auto') applyToDocument(resolveActiveTheme('auto'))
    })
  }

  function setMode(next) {
    if (VALID_MODES.includes(next)) mode.value = next
  }

  /**
   * Toggle : cycle entre light <-> dark (ignore 'auto' pour la simplicité du
   * petit bouton dans le header). Si l'utilisateur veut 'auto' explicitement,
   * il pourra le faire depuis un futur écran de paramètres.
   */
  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return { mode, activeTheme, isDark, setMode, toggle }
})
