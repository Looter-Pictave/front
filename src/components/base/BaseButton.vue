<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost
  size: { type: String, default: 'md' }, // sm | md | lg
  to: { type: [String, Object], default: null },  // → rend un RouterLink
  href: { type: String, default: null },           // → rend un <a>
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const isNative = computed(() => tag.value === 'button')
</script>

<template>
  <component
    :is="tag"
    :to="to ?? undefined"
    :href="href ?? undefined"
    :type="isNative ? type : undefined"
    :disabled="isNative ? disabled : undefined"
    class="base-btn"
    :class="[`base-btn--${variant}`, `base-btn--${size}`, { 'base-btn--block': block, 'base-btn--disabled': !isNative && disabled }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease;
  white-space: nowrap;
}
.base-btn:active:not(:disabled):not(.base-btn--disabled) {
  transform: translate(2px, 2px);
}
.base-btn:disabled,
.base-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.base-btn--block {
  width: 100%;
}

.base-btn--sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
}
.base-btn--md {
  padding: 0.7rem 1.4rem;
  font-size: 0.95rem;
}
.base-btn--lg {
  padding: 1rem 1.8rem;
  font-size: 1.1rem;
}

.base-btn--primary {
  background: var(--color-brand-yellow);
  color: var(--color-brand-ink);
  box-shadow: var(--shadow-stamp);
}
.base-btn--primary:hover:not(:disabled):not(.base-btn--disabled) {
  background: var(--color-brand-yellow-dark);
}
.base-btn--primary:active:not(:disabled):not(.base-btn--disabled) {
  box-shadow: var(--shadow-stamp-sm);
}

.base-btn--secondary {
  background: var(--color-brand-ink);
  color: var(--color-brand-paper);
  box-shadow: var(--shadow-stamp-yellow);
}
.base-btn--secondary:hover:not(:disabled):not(.base-btn--disabled) {
  background: #000;
}
.base-btn--secondary:active:not(:disabled):not(.base-btn--disabled) {
  box-shadow: var(--shadow-stamp-yellow-sm);
}

.base-btn--ghost {
  background: transparent;
  color: var(--color-brand-ink);
  box-shadow: none;
}
.base-btn--ghost:hover:not(:disabled):not(.base-btn--disabled) {
  /* Hover bg trop spécifique pour mériter un token (1 seul usage). */
  background: rgb(0 0 0 / 0.06);
}
</style>
