<script setup>
defineProps({
  variant: { type: String, default: 'ink' }, // ink | yellow | outline | success | warning | danger
  size: { type: String, default: 'md' }, // sm | md
  as: { type: String, default: 'span' },
})
</script>

<template>
  <component :is="as" class="chip" :class="[`chip--${variant}`, `chip--${size}`]">
    <slot />
  </component>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
}
.chip--sm {
  padding: 0.3rem 0.7rem;
  font-size: 0.7rem;
}
.chip--md {
  padding: 0.45rem 0.9rem;
  font-size: 0.78rem;
}
.chip--ink {
  background: var(--color-brand-ink);
  color: var(--color-brand-paper);
}
.chip--yellow {
  background: var(--color-brand-yellow);
  color: var(--color-brand-ink);
}
.chip--outline {
  background: transparent;
  border-color: var(--color-brand-ink);
  color: var(--color-brand-ink);
}
.chip--success {
  background: var(--color-stock-in);
  color: white;
}
.chip--warning {
  background: var(--color-stock-low);
  color: white;
}
.chip--danger {
  background: var(--color-stock-out);
  color: white;
}
</style>
