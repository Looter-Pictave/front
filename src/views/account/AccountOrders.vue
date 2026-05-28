<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import OrderCard from '@/components/account/OrderCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
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
  <section>
    <PageHeader
      title="Mes commandes"
      subtitle="Retrouve toutes les commandes passées sur le site avec leur statut en temps réel."
    />

    <p v-if="loading" class="page__loading">Chargement…</p>

    <EmptyState
      v-else-if="orders.length === 0"
      message="Tu n'as pas encore passé de commande."
    >
      <BaseButton :to="{ name: 'catalog' }" size="lg">
        Explorer le catalogue
      </BaseButton>
    </EmptyState>

    <div v-else class="page__list">
      <OrderCard v-for="o in orders" :key="o.id" :order="o" />
    </div>
  </section>
</template>

<style scoped>
.page__loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-ink-muted);
}
.page__list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
