<script setup>
/**
 * État vide réutilisable (fond cream + bordure pointillée + message centré
 * + slot d'action). Remplace les blocs "Aucune commande", "Panier vide",
 * "Aucune adresse" qui étaient implémentés différemment dans chaque vue.
 */
defineProps({
  message: { type: String, required: true },
})
</script>

<template>
  <div class="empty-state">
    <p class="empty-state__message">{{ message }}</p>
    <div v-if="$slots.default" class="empty-state__action">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  background: var(--color-brand-cream);
  border: 2px dashed var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.empty-state__message {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-ink-soft);
}
</style>
