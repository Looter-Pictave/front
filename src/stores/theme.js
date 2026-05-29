import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

/**
 * Store thème clair / sombre.
 *
 * Le thème est appliqué via l'attribut `data-theme="dark"` sur <html>, lu par
 * le bloc `:root[data-theme="dark"]` de main.css. Persisté dans localStorage.
 *
 * Défaut : clair (la DA Looter Pictave est claire). Un petit script inline
 * dans index.html applique le thème AVANT le rendu pour éviter le flash blanc
 * au chargement (FOUC) quand l'utilisateur a choisi le sombre.
 */
const STORAGE_KEY = 'lp_theme'

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* localStorage indisponible (mode privé) */
  }
  return 'light'
}

function apply(theme) {
  const el = document.documentElement
  if (theme === 'dark') el.setAttribute('data-theme', 'dark')
  else el.removeAttribute('data-theme')
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(readStored())
  const isDark = computed(() => theme.value === 'dark')

  // Applique au boot (cohérent avec le script anti-FOUC d'index.html).
  apply(theme.value)

  watch(theme, (t) => {
    apply(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      /* ignore */
    }
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, isDark, toggle }
})
