<script setup>
/**
 * Message de feedback de formulaire (erreur ou succès). Remplace les
 * `.form__error` / `.form__success` qui étaient dupliqués dans 5 vues, avec
 * leurs backgrounds rgb(...) hardcodés. Utilise les tokens de couleur
 * error / success définis dans main.css.
 */
defineProps({
  variant: { type: String, default: 'error' }, // error | success
})
</script>

<template>
  <p class="form-message" :class="`form-message--${variant}`" role="alert">
    <slot />
  </p>
</template>

<style scoped>
.form-message {
  margin: 0;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid;
}
.form-message--error {
  background: var(--color-error-bg);
  border-color: var(--color-error);
  color: var(--color-error);
}
.form-message--success {
  background: var(--color-success-bg);
  border-color: var(--color-success);
  color: var(--color-success);
}
</style>
