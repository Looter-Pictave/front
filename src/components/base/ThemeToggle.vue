<script setup>
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    @click="theme.toggle()"
  >
    <!-- Soleil (visible en mode dark : clique pour repasser en light) -->
    <svg
      v-if="isDark"
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

    <!-- Lune (visible en mode light : clique pour passer en dark) -->
    <svg
      v-else
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  /* var(--color-brand-ink) swap automatiquement en dark mode (noir -> blanc
     cassé), donc le bouton reste visible sur fond jaune (light, header)
     ET sur fond charcoal (dark, header). */
  border: 2px solid var(--color-brand-ink);
  border-radius: 9999px;
  color: var(--color-brand-ink);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease, color 0.2s ease,
    border-color 0.2s ease;
  padding: 0;
  flex-shrink: 0;
}
.theme-toggle:hover {
  /* var(--color-line) swap aussi : noir/0.15 en light, blanc/0.1 en dark */
  background: var(--color-line);
  transform: rotate(-12deg);
}
.theme-toggle:active {
  transform: rotate(0deg) scale(0.95);
}

/* En dark mode, le header passe en charcoal et le toggle doit garder un
   bon contraste. Les vars swappées font déjà 90% du boulot, mais comme
   le ThemeToggle est entre les autres CTAs jaunes, on peut le forcer en
   jaune pour mettre en valeur l'action. */
[data-theme="dark"] .theme-toggle {
  border-color: var(--color-brand-yellow);
  color: var(--color-brand-yellow);
}
[data-theme="dark"] .theme-toggle:hover {
  background: rgb(255 221 0 / 0.12);
}

/* L'icône change déjà via v-if ; petite animation au switch quand même. */
.theme-toggle__icon {
  animation: theme-pop 0.25s ease;
}
@keyframes theme-pop {
  from {
    opacity: 0;
    transform: rotate(45deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}
</style>
