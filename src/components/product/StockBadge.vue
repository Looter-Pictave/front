<script setup>
import { computed } from 'vue'
import BaseChip from '@/components/base/BaseChip.vue'

const props = defineProps({
  stock: { type: Object, required: true },
})

const config = computed(() => {
  switch (props.stock.status) {
    case 'in_stock':
      return { variant: 'success', label: 'En stock' }
    case 'low_stock':
      return { variant: 'warning', label: `Plus que ${props.stock.quantity}` }
    case 'out_of_stock':
      return { variant: 'danger', label: 'Rupture' }
    case 'preorder':
      return { variant: 'ink', label: 'Précommande' }
    case 'discontinued':
      return { variant: 'outline', label: 'Discontinué' }
    default:
      return { variant: 'outline', label: '—' }
  }
})
</script>

<template>
  <BaseChip :variant="config.variant" size="sm">{{ config.label }}</BaseChip>
</template>
