<script setup>
import { computed } from 'vue'
import BaseChip from '@/components/base/BaseChip.vue'
import { formatPrice } from '@/utils/formatPrice'
import { ORDER_STATUS } from '@/services/ordersMock'

const props = defineProps({
  order: { type: Object, required: true },
})

const statusConfig = computed(
  () => ORDER_STATUS[props.order.status] ?? ORDER_STATUS.confirmed,
)

const formattedDate = computed(() =>
  new Date(props.order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
)

const itemCount = computed(() =>
  props.order.items.reduce((sum, i) => sum + i.quantity, 0),
)
</script>

<template>
  <article class="order">
    <header class="order__head">
      <div class="order__head-left">
        <p class="order__number">Commande {{ order.number }}</p>
        <p class="order__date">
          Passée le {{ formattedDate }} · {{ itemCount }} article{{ itemCount > 1 ? 's' : '' }}
        </p>
      </div>
      <BaseChip :variant="statusConfig.variant" size="sm">
        {{ statusConfig.label }}
      </BaseChip>
    </header>

    <ul class="order__items">
      <li v-for="item in order.items" :key="item.productId" class="order__item">
        <div class="order__item-image">
          <img :src="item.image" :alt="item.name" loading="lazy" />
        </div>
        <div class="order__item-body">
          <RouterLink :to="`/produit/${item.slug}`" class="order__item-name">
            {{ item.name }}
          </RouterLink>
          <p class="order__item-meta">
            Qté : <strong>{{ item.quantity }}</strong>
            · {{ formatPrice(item.unitPrice) }} l'unité
          </p>
        </div>
        <div class="order__item-total">
          {{
            formatPrice({
              amount: item.unitPrice.amount * item.quantity,
              currency: item.unitPrice.currency,
            })
          }}
        </div>
      </li>
    </ul>

    <footer class="order__foot">
      <div class="order__totals">
        <div class="order__total-row">
          <span>Sous-total</span>
          <span>{{ formatPrice(order.subtotal) }}</span>
        </div>
        <div class="order__total-row">
          <span>Livraison · {{ order.shipping.method }}</span>
          <span>
            {{ order.shipping.amount === 0 ? 'Gratuite' : formatPrice(order.shipping) }}
          </span>
        </div>
        <div class="order__total-row order__total-row--final">
          <span>Total TTC</span>
          <strong>{{ formatPrice(order.total) }}</strong>
        </div>
      </div>

      <p v-if="order.trackingNumber" class="order__tracking">
        📦 N° de suivi : <strong>{{ order.trackingNumber }}</strong>
      </p>
    </footer>
  </article>
</template>

<style scoped>
.order {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-md);
  padding: 1.2rem 1.4rem;
  box-shadow: var(--shadow-stamp);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.8rem;
  border-bottom: 2px dashed var(--color-line);
}
.order__number {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
}
.order__date {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: var(--color-ink-muted);
}

.order__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.order__item {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 0.8rem;
  align-items: center;
}
.order__item-image {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-brand-cream);
  border: 1px solid var(--color-line);
}
.order__item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.order__item-name {
  font-weight: 700;
  color: var(--color-brand-ink);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.3;
}
.order__item-name:hover {
  text-decoration: underline;
}
.order__item-meta {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  color: var(--color-ink-muted);
}
.order__item-total {
  font-family: var(--font-display);
  font-size: 0.95rem;
  white-space: nowrap;
}

.order__foot {
  padding-top: 0.8rem;
  border-top: 2px dashed var(--color-line);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.order__totals {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.order__total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--color-ink-muted);
}
.order__total-row--final {
  font-size: 1rem;
  color: var(--color-brand-ink);
  padding-top: 0.4rem;
  border-top: 1px solid var(--color-line);
  margin-top: 0.2rem;
}
.order__total-row--final strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
}
.order__tracking {
  margin: 0;
  font-size: 0.85rem;
  background: var(--color-brand-cream);
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-sm);
}
</style>
