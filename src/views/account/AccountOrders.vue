<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import OrderCard from '@/components/account/OrderCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ordersMock } from '@/services/ordersMock'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

const orders = ref([])
const loading = ref(true)

onMounted(async () => {
  if (currentUser.value) {
    orders.value = await ordersMock.listByUser(currentUser.value.id)
  }
  loading.value = false
})
</script>

<template>
  <section class="page">
    <header class="page__head">
      <h1 class="page__title text-stamp">Mes commandes</h1>
      <p class="page__sub">
        Retrouve toutes les commandes passées sur le site avec leur statut en
        temps réel.
      </p>
    </header>

    <p v-if="loading" class="page__loading">Chargement…</p>

    <div v-else-if="orders.length === 0" class="page__empty">
      <p>Tu n'as pas encore passé de commande.</p>
      <BaseButton :to="{ name: 'catalog' }" size="lg">
        Explorer le catalogue
      </BaseButton>
    </div>

    <div v-else class="page__list">
      <OrderCard v-for="o in orders" :key="o.id" :order="o" />
    </div>
  </section>
</template>

<style scoped>
.page__head {
  margin-bottom: 1.5rem;
}
.page__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  margin: 0 0 0.4rem;
}
.page__sub {
  margin: 0;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
}
.page__loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-ink-muted);
}
.page__empty {
  background: var(--color-brand-cream);
  border: 2px dashed var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.page__empty p {
  margin: 0;
  font-size: 1.05rem;
}
.page__list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
