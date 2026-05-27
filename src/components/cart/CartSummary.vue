<script setup>
import { storeToRefs } from 'pinia'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/base/BaseButton.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { subtotal, count } = storeToRefs(cart)
</script>

<template>
  <aside class="summary">
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
.summary {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 4px 4px 0 0 var(--color-brand-ink);
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
  color: rgb(0 0 0 / 0.55);
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
  color: rgb(0 0 0 / 0.5);
  font-style: italic;
}
hr {
  border: none;
  border-top: 2px dashed rgb(0 0 0 / 0.15);
}
</style>
