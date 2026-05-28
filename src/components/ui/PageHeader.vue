<script setup>
/**
 * En-tête de page/section réutilisable : titre (en text-stamp) + sous-titre
 * optionnel. Remplace les `.page__head / .page__title / .page__sub` qui
 * étaient copiés-collés dans une dizaine de vues.
 */
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  centered: { type: Boolean, default: false },
  size: { type: String, default: 'md' }, // md (sections) | lg (pages principales)
})
</script>

<template>
  <header
    class="page-header"
    :class="[`page-header--${size}`, { 'page-header--centered': centered }]"
  >
    <h1 class="page-header__title text-stamp">{{ title }}</h1>
    <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: 1.6rem;
}
.page-header--centered {
  text-align: center;
}
.page-header__title {
  margin: 0;
}
.page-header--md .page-header__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
}
.page-header--lg .page-header__title {
  font-size: clamp(2rem, 5vw, 3rem);
}
.page-header__subtitle {
  margin: 0.4rem 0 0;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}
.page-header--centered .page-header__subtitle {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  font-weight: 700;
}
</style>
