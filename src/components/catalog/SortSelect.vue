<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="sort">
    <span>Trier par</span>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">Pertinence</option>
      <option value="name-asc">Nom (A → Z)</option>
      <option value="price-asc">Prix croissant</option>
      <option value="price-desc">Prix décroissant</option>
    </select>
  </label>
</template>

<style scoped>
.sort {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
}
.sort select {
  padding: 0.4rem 0.6rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.4rem;
  font-family: var(--font-sans);
  background: var(--color-brand-paper);
}
</style>
