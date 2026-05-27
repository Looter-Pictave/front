<script setup>
import { storeToRefs } from 'pinia'

import BaseChip from '@/components/base/BaseChip.vue'
import { useCatalogStore } from '@/stores/catalog'

defineProps({
  modelValue: { type: Object, required: true },
})
const emit = defineEmits(['update:modelValue', 'reset'])

const catalog = useCatalogStore()
const { categories, franchises } = storeToRefs(catalog)

function update(patch) {
  emit('update:modelValue', { ...patch })
}
</script>

<template>
  <aside class="filters" aria-label="Filtres catalogue">
    <div class="filters__header">
      <h2 class="filters__title">Filtres</h2>
      <button type="button" class="filters__reset" @click="$emit('reset')">
        Réinitialiser
      </button>
    </div>

    <fieldset class="filters__group">
      <legend>Catégorie</legend>
      <div class="filters__chips">
        <BaseChip
          as="button"
          :variant="!modelValue.category ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, category: null })"
        >
          Toutes
        </BaseChip>
        <BaseChip
          v-for="c in categories"
          :key="c.id"
          as="button"
          :variant="modelValue.category === c.id ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, category: c.id })"
        >
          {{ c.name }}
        </BaseChip>
      </div>
    </fieldset>

    <fieldset class="filters__group">
      <legend>Franchise</legend>
      <select
        class="filters__select"
        :value="modelValue.franchise ?? ''"
        @change="update({ ...modelValue, franchise: $event.target.value || null })"
      >
        <option value="">Toutes les franchises</option>
        <option v-for="f in franchises" :key="f.id" :value="f.name">{{ f.name }}</option>
      </select>
    </fieldset>

    <fieldset class="filters__group">
      <legend>État</legend>
      <div class="filters__chips">
        <BaseChip
          as="button"
          :variant="!modelValue.condition ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, condition: null })"
        >
          Tous
        </BaseChip>
        <BaseChip
          as="button"
          :variant="modelValue.condition === 'new' ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, condition: 'new' })"
        >
          Neuf
        </BaseChip>
        <BaseChip
          as="button"
          :variant="modelValue.condition === 'used' ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, condition: 'used' })"
        >
          Occasion
        </BaseChip>
        <BaseChip
          as="button"
          :variant="modelValue.condition === 'collector' ? 'ink' : 'outline'"
          size="sm"
          @click="update({ ...modelValue, condition: 'collector' })"
        >
          Collector
        </BaseChip>
      </div>
    </fieldset>
  </aside>
</template>

<style scoped>
.filters {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.6rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-self: start;
}
.filters__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-brand-ink);
  padding-bottom: 0.6rem;
}
.filters__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
}
.filters__reset {
  background: none;
  border: none;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-ink-muted);
  cursor: pointer;
  text-decoration: underline;
}
.filters__reset:hover {
  color: var(--color-brand-ink);
}
.filters__group {
  border: none;
  padding: 0;
  margin: 0;
}
.filters__group legend {
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.75rem;
  margin-bottom: 0.6rem;
}
.filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.filters__chips button {
  border: 1px solid var(--color-brand-ink);
  cursor: pointer;
}
.filters__select {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  background: var(--color-brand-paper);
}
</style>
