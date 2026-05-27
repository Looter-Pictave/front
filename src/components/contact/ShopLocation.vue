<script setup>
import BaseButton from '@/components/base/BaseButton.vue'

/**
 * Carte de localisation de la boutique : bloc info (adresse, horaires, contact,
 * bouton "Itinéraire") + carte Google Maps (iframe embed simple, sans clé API).
 *
 * ⚠️ Toutes les coordonnées sont centralisées en haut du composant.
 *    Modifie ici si l'adresse, les horaires ou l'email changent.
 *
 * ⚠️ RGPD : l'iframe Google Maps charge des cookies tiers Google dès l'affichage.
 *    Avant la mise en prod, soit on passe à un pattern click-to-load,
 *    soit on ajoute un bandeau de consentement.
 */
const ADDRESS = {
  street: '19 rue de la Regratterie',
  city: '86000 Poitiers',
}

const HOURS = [
  { days: 'Lundi – Samedi', slots: ['10h30 – 13h30', '14h30 – 19h30'] },
  { days: 'Dimanche', slots: ['Fermé'] },
]

const EMAIL = 'contact@looter-pictave.fr'

// Google Maps : iframe d'embed simple (pas besoin de clé API)
// + lien d'itinéraire qui s'ouvre dans l'app Maps de l'utilisateur
const MAPS_QUERY = encodeURIComponent(`${ADDRESS.street} ${ADDRESS.city}`)
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=fr&z=16&output=embed`
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`
</script>

<template>
  <section class="shop-location" aria-label="Adresse et horaires de la boutique">
    <div class="shop-location__info">
      <div class="shop-location__block">
        <span class="shop-location__label">Adresse</span>
        <p class="shop-location__address">
          {{ ADDRESS.street }}<br />
          {{ ADDRESS.city }}
        </p>
      </div>

      <div class="shop-location__block">
        <span class="shop-location__label">Horaires</span>
        <ul class="shop-location__hours">
          <li v-for="h in HOURS" :key="h.days" class="shop-location__hours-row">
            <span class="shop-location__hours-days">{{ h.days }}</span>
            <span class="shop-location__hours-slots">
              <span v-for="s in h.slots" :key="s">{{ s }}</span>
            </span>
          </li>
        </ul>
      </div>

      <div class="shop-location__block">
        <span class="shop-location__label">Contact</span>
        <a :href="`mailto:${EMAIL}`" class="shop-location__email">{{ EMAIL }}</a>
      </div>

      <BaseButton
        :href="MAPS_DIRECTIONS"
        target="_blank"
        rel="noopener noreferrer"
        class="shop-location__cta"
      >
        Itinéraire →
      </BaseButton>
    </div>

    <div class="shop-location__map">
      <iframe
        :src="MAPS_EMBED"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        title="Carte Google Maps de la boutique Looter Pictave à Poitiers"
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
  box-shadow: 6px 6px 0 0 var(--color-brand-ink);
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
  color: rgb(0 0 0 / 0.5);
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
  color: rgb(0 0 0 / 0.65);
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
