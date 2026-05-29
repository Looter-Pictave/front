<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'"
    :title="isDark ? 'Thème clair' : 'Thème sombre'"
    @click="themeStore.toggle()"
  >
    <!-- Lune (en clair → cliquer pour passer en sombre) -->
    <svg
      v-if="!isDark"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <!-- Soleil (en sombre → cliquer pour passer en clair) -->
    <svg
      v-else
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  </button>
</template>

<style scoped>
/* Le header reste jaune dans les deux thèmes → le bouton est toujours
   sombre-sur-jaune. Couleurs en dur (pas de var, qui basculerait en dark). */
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: transparent;
  border: 2px solid #1d1d1b;
  border-radius: 9999px;
  color: #1d1d1b;
  cursor: pointer;
  transition: background 0.15s ease;
}
.theme-toggle:hover {
  background: rgb(0 0 0 / 0.08);
}
</style>
