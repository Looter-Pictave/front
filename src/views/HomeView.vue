<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseChip from '@/components/base/BaseChip.vue'
import ShopLocation from '@/components/contact/ShopLocation.vue'
import FranchiseTicker from '@/components/layout/FranchiseTicker.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { useCatalogStore } from '@/stores/catalog'

const catalog = useCatalogStore()
const { featured, categories } = storeToRefs(catalog)
onMounted(() => {
  catalog.loadReferences()
  if (!catalog.products.length) catalog.loadProducts({ size: 4 })
})
</script>

<template>
  <!-- Root unique obligatoire : <Transition> dans App.vue n'anime que des
       composants à un seul élément racine. Sans ce wrapper, on a un warning
       Vue + un bug de page blanche au premier passage sur la route. -->
  <div class="home">
    <section class="hero">
    <span class="hero__sticker hero__sticker--tr" aria-hidden="true">
      70 m²<br />de pop culture
    </span>

    <div class="hero__content">
      <BaseChip variant="ink" size="sm">Boutique pop culture · Poitiers</BaseChip>
      <h1 class="hero__title">
        <span class="text-stamp">Looter Pictave</span>
      </h1>
      <span class="hero__rule" aria-hidden="true"></span>
      <p class="hero__sub">
        Figurines, mangas, statues résine, mugs, t-shirts &amp; jouets d'occasion.
        70m² d'aventure en plein cœur de Poitiers.
      </p>
      <div class="hero__cta">
        <BaseButton to="/catalogue" size="lg">Explorer le catalogue</BaseButton>
        <BaseButton to="/a-propos" variant="ghost" size="lg">La boutique</BaseButton>
      </div>
    </div>

    <span class="hero__sticker hero__sticker--br" aria-hidden="true">
      NEW<br />DROP
    </span>
  </section>

  <FranchiseTicker />

  <section class="section">
    <header class="section__header">
      <h2 class="section__title text-stamp">Coups de cœur</h2>
      <RouterLink to="/catalogue" class="section__link">Voir tout →</RouterLink>
    </header>
    <ProductGrid :products="featured.slice(0, 4)" />
  </section>

  <section class="section section--alt">
    <header class="section__header section__header--center">
      <h2 class="section__title text-stamp">Catégories</h2>
      <p class="section__sub">Choisis ton univers</p>
    </header>
    <div class="categories">
      <RouterLink
        v-for="c in categories"
        :key="c.id"
        :to="{ name: 'catalog', query: { categorie: c.id } }"
        class="category"
      >
        <span class="category__icon" aria-hidden="true">{{ c.icon }}</span>
        <span class="category__name">{{ c.name }}</span>
      </RouterLink>
    </div>
  </section>

  <section class="section">
    <div class="pitch">
      <BaseChip variant="yellow" size="md">70 m² · Espace museum</BaseChip>
      <h2 class="pitch__title text-stamp">Viens passer la porte de la boutique</h2>
      <p class="pitch__text">
        Plus de 70m² dédiés à la pop culture, du manga aux figurines de collection,
        en passant par les imports japonais et les jouets d'occasion. Atelier, événements,
        et conseils dispo en boutique du mardi au samedi.
      </p>
    </div>
    <ShopLocation class="pitch__location" />
  </section>
  </div>
</template>

<style scoped>
.hero {
  background: var(--color-brand-cream);
  border-bottom: 3px solid var(--color-brand-ink);
  position: relative;
  overflow: hidden;
  padding: 3.5rem 1.25rem 4rem;
}
.hero__content {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
}
.hero__title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  margin: 0;
  line-height: 1;
}
.hero__rule {
  display: block;
  width: clamp(160px, 30vw, 280px);
  height: 14px;
  background: var(--color-brand-yellow);
  border: 2px solid var(--color-brand-ink);
  border-radius: 9999px;
  margin: 0.25rem 0 0.4rem;
}
.hero__sub {
  font-size: 1.1rem;
  max-width: 580px;
  margin: 0;
  line-height: 1.5;
}
.hero__cta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

/* Stickers jaunes décoratifs — style "étiquette de musée" */
.hero__sticker {
  position: absolute;
  background: var(--color-brand-yellow);
  border: 2px solid var(--color-brand-ink);
  color: var(--color-brand-ink);
  font-family: var(--font-display);
  font-size: 0.85rem;
  line-height: 1.1;
  text-align: center;
  padding: 0.55rem 0.9rem;
  border-radius: 0.45rem;
  box-shadow: 3px 3px 0 0 var(--color-brand-ink);
  letter-spacing: 0.04em;
  z-index: 1;
  pointer-events: none;
}
.hero__sticker--tr {
  top: 1.5rem;
  right: 1.5rem;
  transform: rotate(6deg);
}
.hero__sticker--br {
  bottom: 1.75rem;
  right: 2.25rem;
  transform: rotate(-5deg);
}

/* Sur petit écran on cache les stickers pour ne pas surcharger */
@media (max-width: 720px) {
  .hero__sticker {
    display: none;
  }
}

.section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem 1.25rem;
}
.section--alt {
  background: var(--color-brand-cream);
  max-width: none;
}
.section--alt > * {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}
.section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  gap: 1rem;
  flex-wrap: wrap;
}
/* Variante centrée du header (utilisée pour la section Catégories) */
.section__header--center {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
}
.section__title {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
.section__sub {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-ink-muted);
  font-weight: 700;
}
.section__link {
  color: var(--color-brand-ink);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.85rem;
  text-decoration: none;
  border-bottom: 2px solid var(--color-brand-ink);
}
.section__link:hover {
  background: var(--color-brand-yellow);
}

/* Liste de catégories : flex wrap + center pour que la dernière ligne
   incomplète reste centrée (notre cas : 7 catégories = ligne moche en grid). */
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.category {
  width: 150px;
  aspect-ratio: 1 / 1;
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  color: var(--color-brand-ink);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}
.category:hover {
  background: var(--color-brand-yellow);
  transform: translate(-3px, -3px);
  box-shadow: var(--shadow-stamp-lg);
}
.category__icon {
  font-size: 2.6rem;
  line-height: 1;
  filter: grayscale(0); /* placeholder pour si on remplace par des SVG plus tard */
}
.category__name {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  line-height: 1.15;
}
/* Mobile : 2 cartes par ligne, largeur calculée pour rester centrées */
@media (max-width: 520px) {
  .category {
    width: calc(50% - 0.5rem);
    aspect-ratio: 1 / 1;
  }
}

.pitch {
  max-width: 720px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.pitch__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0;
}
.pitch__text {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}
.pitch__location {
  margin-top: 2.5rem;
  width: 100%;
}
</style>
