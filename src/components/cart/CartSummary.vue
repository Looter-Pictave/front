<script setup>
import { storeToRefs } from 'pinia'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/base/BaseButton.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { subtotal, count } = storeToRefs(cart)
</script>

<template>
  <aside class="summary panel">
    <h2 class="summary__title">Récapitulatif</h2>
    <div class="summary__row">
      <span>Sous-total ({{ count }} article{{ count > 1 ? 's' : '' }})</span>
      <strong>{{ formatPrice(subtotal) }}</strong>
    </div>
    <div class="summary__row summary__row--muted">
      <span>Livraison</span>
      <span>Calculée à l'étape suivante</span>
    </div>
    <hr />
    <div class="summary__total">
      <span>Total TTC</span>
      <strong>{{ formatPrice(subtotal) }}</strong>
    </div>
    <BaseButton block size="lg" disabled>
      Passer commande (à venir)
    </BaseButton>
    <p class="summary__note">
      Le paiement sera ouvert dès l'intégration CAWL (Crédit Agricole Worldline).
    </p>
  </aside>
</template>

<style scoped>
/* surface fournie par .panel */
.summary {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.summary__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
}
.summary__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}
.summary__row--muted {
  color: var(--color-ink-muted);
  font-size: 0.85rem;
}
.summary__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-display);
  font-size: 1.3rem;
}
.summary__note {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-ink-muted);
  font-style: italic;
}
hr {
  border: none;
  border-top: 2px dashed var(--color-line);
}
</style>
