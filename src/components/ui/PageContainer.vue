<script setup>
/**
 * Conteneur de page : centre le contenu, applique une largeur max et le
 * padding standard. Unifie les `.page { max-width; margin; padding }` qui
 * étaient répétés dans ~10 vues avec 6 largeurs différentes sans logique
 * (1280 / 1100 / 820 / 600 / 560 / 500).
 *
 * 4 largeurs normalisées :
 *   wide    1280px → catalogue, panier, produit, admin (layouts riches)
 *   medium  1100px → contact, à propos (layouts 2 colonnes)
 *   text     820px → mentions légales, CGV (lecture longue)
 *   narrow   540px → connexion, inscription, 404 (formulaires/messages)
 *
 * NB : on n'utilise pas la classe `.container` (collision avec l'utility
 * Tailwind du même nom), d'où le composant dédié.
 */
defineProps({
  width: { type: String, default: 'wide' }, // wide | medium | text | narrow
})
</script>

<template>
  <div class="page-container" :class="`page-container--${width}`">
    <slot />
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  margin-inline: auto;
  padding: 2.5rem 1.25rem 4rem;
}
.page-container--wide {
  max-width: 1280px;
}
.page-container--medium {
  max-width: 1100px;
}
.page-container--text {
  max-width: 820px;
}
.page-container--narrow {
  max-width: 540px;
}
</style>
