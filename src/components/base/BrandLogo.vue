<script setup>
import logoUrl from '@/assets/brand/logo.svg'

defineProps({
  size: { type: [Number, String], default: 48 },
  alt: { type: String, default: 'Looter Pictave' },
})
</script>

<template>
  <img :src="logoUrl" :alt="alt" :width="size" :height="size" class="brand-logo" />
</template>

<style scoped>
.brand-logo {
  display: block;
  object-fit: contain;
}
</style>
