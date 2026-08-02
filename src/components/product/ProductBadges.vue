<script setup>
import BaseChip from '@/components/base/BaseChip.vue'
defineProps({ product: { type: Object, required: true }, size: { type: String, default: 'sm' } })
</script>
<template>
  <BaseChip v-if="product.condition === 'USED'" variant="yellow" :size="size">Occasion</BaseChip>
  <BaseChip v-if="product.condition === 'IMPORTED'" variant="outline" :size="size">Import</BaseChip>
  <BaseChip v-if="product.condition === 'PREORDER'" variant="ink" :size="size">Précommande</BaseChip>
</template>
