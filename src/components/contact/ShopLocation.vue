<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import { SHOP, MAPS_EMBED_URL, MAPS_DIRECTIONS_URL } from '@/config/shop'

/**
 * Carte de localisation de la boutique : bloc info (adresse, horaires, contact,
 * bouton "Itinéraire") + carte Google Maps (iframe embed sans clé API).
 *
 * Toutes les données viennent de @/config/shop — c'est la source unique de
 * vérité pour les coordonnées Looter Pictave (utilisée aussi par ContactView,
 * et plus tard par le footer + structured data SEO).
 *
 * ⚠️ RGPD : voir note dans @/config/shop pour le rappel cookies Google Maps.
 */
</script>

<template>
  <section class="shop-location" aria-label="Adresse et horaires de la boutique">
    <div class="shop-location__info">
      <div class="shop-location__block">
        <span class="shop-location__label">Adresse</span>
        <p class="shop-location__address">
          {{ SHOP.address.street }}<br />
          {{ SHOP.address.postalCode }} {{ SHOP.address.city }}
        </p>
      </div>

      <div class="shop-location__block">
        <span class="shop-location__label">Horaires</span>
        <ul class="shop-location__hours">
          <li v-for="h in SHOP.hours" :key="h.days" class="shop-location__hours-row">
            <span class="shop-location__hours-days">{{ h.days }}</span>
            <span class="shop-location__hours-slots">
              <span v-for="s in h.slots" :key="s">{{ s }}</span>
            </span>
          </li>
        </ul>
      </div>

      <div class="shop-location__block">
        <span class="shop-location__label">Contact</span>
        <a :href="`mailto:${SHOP.contact.email}`" class="shop-location__email">
          {{ SHOP.contact.email }}
        </a>
      </div>

      <BaseButton
        :href="MAPS_DIRECTIONS_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="shop-location__cta"
      >
        Itinéraire →
      </BaseButton>
    </div>

    <div class="shop-location__map">
      <iframe
        :src="MAPS_EMBED_URL"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        :title="`Carte Google Maps de la boutique ${SHOP.name} à ${SHOP.address.city}`"
      ></iframe>
    </div>
  </section>
</template>

<style scoped>
.shop-location {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: var(--shadow-stamp-lg);
  text-align: left;
}
@media (min-width: 760px) {
  .shop-location {
    grid-template-columns: minmax(280px, 1fr) 1.4fr;
  }
}

.shop-location__info {
  padding: 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.shop-location__block {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.shop-location__label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--color-ink-muted);
}
.shop-location__address {
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4;
}
.shop-location__hours {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.shop-location__hours-row {
  display: grid;
  grid-template-columns: minmax(120px, auto) 1fr;
  gap: 1rem;
  align-items: start;
  font-size: 0.88rem;
}
.shop-location__hours-days {
  font-weight: 600;
  color: var(--color-ink-soft);
}
.shop-location__hours-slots {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: right;
  font-weight: 700;
  /* Chiffres à largeur fixe : "1" et "9" prennent la même place
     → les horaires de chaque ligne s'alignent verticalement au pixel près. */
  font-variant-numeric: tabular-nums;
}
.shop-location__email {
  color: var(--color-brand-ink);
  text-decoration: underline;
  font-weight: 600;
  font-size: 0.95rem;
  word-break: break-all;
}
.shop-location__cta {
  margin-top: 0.4rem;
  align-self: flex-start;
}

.shop-location__map {
  background: var(--color-brand-cream);
  min-height: 320px;
  position: relative;
}
.shop-location__map iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  min-height: 320px;
}
</style>
