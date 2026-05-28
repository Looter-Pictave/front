<script setup>
import { computed } from 'vue'
import BaseChip from '@/components/base/BaseChip.vue'

/**
 * Pastilles d'état d'un produit (Occasion / Collector / Import JP).
 * Centralise la logique qui était dupliquée à l'identique dans ProductCard
 * et ProductView. Multi-root volontaire : les chips s'insèrent directement
 * dans le conteneur parent (overlay de carte ou ligne de chips fiche produit).
 */
const props = defineProps({
  product: { type: Object, required: true },
  size: { type: String, default: 'sm' },
})

const isUsed = computed(() => props.product.condition === 'used')
const isCollector = computed(() => props.product.condition === 'collector')
</script>

<template>
  <BaseChip v-if="isUsed" variant="yellow" :size="size">Occasion</BaseChip>
  <BaseChip v-if="isCollector" variant="ink" :size="size">Collector</BaseChip>
  <BaseChip v-if="product.isImport" variant="outline" :size="size">Import JP</BaseChip>
</template>
