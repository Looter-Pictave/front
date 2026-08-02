<script setup>
import { computed } from 'vue'
import BaseChip from '@/components/base/BaseChip.vue'
const props = defineProps({ stock: { type: Number, required: true } })
const config = computed(() => {
  if (props.stock <= 0) return { variant: 'danger', label: 'Rupture' }
  if (props.stock <= 3) return { variant: 'warning', label: `Plus que ${props.stock}` }
  return { variant: 'success', label: `${props.stock} en stock` }
})
</script>
<template><BaseChip :variant="config.variant" size="sm">{{ config.label }}</BaseChip></template>
