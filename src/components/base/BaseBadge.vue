<script setup>
defineProps({
  /** ring color: 'yellow' (default) or 'ink' */
  variant: { type: String, default: 'yellow' },
  size: { type: String, default: 'md' }, // sm | md | lg
})
</script>

<template>
  <span class="badge" :class="[`badge--${variant}`, `badge--${size}`]">
    <span class="badge__inner">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 4px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
  line-height: 1.1;
}
.badge__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-brand-paper);
  color: var(--color-brand-ink);
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  padding: 0.4em 0.6em;
  text-align: center;
}
.badge--yellow {
  background: var(--color-brand-yellow);
}
.badge--ink {
  background: var(--color-brand-ink);
}
.badge--ink .badge__inner {
  background: var(--color-brand-yellow);
  color: var(--color-brand-ink);
}

.badge--sm {
  font-size: 0.7rem;
  width: 64px;
  height: 64px;
}
.badge--md {
  font-size: 0.85rem;
  width: 96px;
  height: 96px;
}
.badge--lg {
  font-size: 1rem;
  width: 132px;
  height: 132px;
}
</style>
