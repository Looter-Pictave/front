<script setup>
import { computed } from 'vue'
const props = defineProps({ regularPrice:{type:Number,required:true}, promoPrice:{type:Number,default:null}, currency:{type:String,default:'EUR'}, size:{type:String,default:'md'} })
const format = (amount) => new Intl.NumberFormat('fr-FR',{style:'currency',currency:props.currency || 'EUR'}).format(amount)
const hasPromo = computed(() => props.promoPrice != null && props.promoPrice < props.regularPrice)
const discount = computed(() => hasPromo.value ? Math.round((1-props.promoPrice/props.regularPrice)*100) : null)
</script>
<template><div class="price" :class="`price--${size}`"><span class="price__current">{{ format(hasPromo ? promoPrice : regularPrice) }}</span><span v-if="hasPromo" class="price__old">{{ format(regularPrice) }}</span><span v-if="discount" class="price__discount">−{{ discount }}%</span></div></template>
<style scoped>.price{display:inline-flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}.price__current{font-family:var(--font-display);color:var(--color-brand-ink)}.price--sm .price__current{font-size:1.1rem}.price--md .price__current{font-size:1.4rem}.price--lg .price__current{font-size:2rem}.price__old{text-decoration:line-through;color:var(--color-ink-muted);font-size:.9em}.price__discount{background:var(--color-brand-ink);color:var(--color-brand-yellow);padding:.15rem .5rem;border-radius:9999px;font-family:var(--font-sans);font-weight:700;font-size:.7rem;letter-spacing:.05em}</style>
