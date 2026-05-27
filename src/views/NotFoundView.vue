<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BrandLogo from '@/components/base/BrandLogo.vue'
</script>

<template>
  <div class="page">
    <BrandLogo :size="160" alt="" />
    <h1 class="text-stamp">404</h1>
    <p>Le T-Rex a mangé cette page. Désolé.</p>
    <BaseButton to="/" size="lg">Retour à l'accueil</BaseButton>
  </div>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
h1 {
  font-size: clamp(4rem, 14vw, 8rem);
  margin: 0;
  line-height: 1;
}
p {
  font-size: 1.1rem;
  margin: 0;
}
</style>
