<script setup>
import BaseChip from '@/components/base/BaseChip.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="page">
    <section class="hero">
      <BaseChip variant="ink" size="md">La boutique · Poitiers</BaseChip>
      <h1 class="hero__title text-stamp">70 m² de pop culture</h1>
      <p class="hero__lead">
        Looter Pictave, c'est le repaire des collectionneurs et des curieux de pop culture
        au cœur de Poitiers. Une boutique vivante où on chine, on discute manga, on monte
        des Gunpla et on partage la passion qui nous anime depuis le début.
      </p>
    </section>

    <section class="grid">
      <article class="card">
        <BaseBadge variant="yellow" size="lg">Espace<br />museum</BaseBadge>
        <h2>Une vraie collection à voir</h2>
        <p>
          Statues résine, pièces rares, éditions limitées — on prend le temps d'exposer
          les pièces qui méritent qu'on les regarde.
        </p>
      </article>

      <article class="card">
        <BaseBadge variant="ink" size="lg">Import<br />Japon</BaseBadge>
        <h2>Direct du Japon</h2>
        <p>
          Sélection rigoureuse de figurines Bandai, Banpresto, Good Smile, Tamashii
          Nations et de Gunpla en import direct.
        </p>
      </article>

      <article class="card">
        <BaseBadge variant="yellow" size="lg">Occasion<br />&amp; rachat</BaseBadge>
        <h2>On rachète tes pièces</h2>
        <p>
          Tu veux faire de la place ? On rachète figurines, jeux, BD, mangas et jouets
          en bon état. Passe nous voir avec ce que tu veux nous montrer.
        </p>
      </article>

      <article class="card">
        <BaseBadge variant="ink" size="lg">Ateliers<br />&amp; events</BaseBadge>
        <h2>Événements en boutique</h2>
        <p>
          Soirées tournoi, ateliers maquettes, sessions TCG : on organise régulièrement
          des moments pour la communauté. Suis-nous sur les réseaux.
        </p>
      </article>
    </section>

    <section class="cta">
      <h2 class="text-stamp">On t'attend en boutique</h2>
      <BaseButton to="/contact" size="lg">Adresse &amp; horaires</BaseButton>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}
.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}
.hero__title {
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  margin: 0;
}
.hero__lead {
  max-width: 720px;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 4rem;
}
@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
.card {
  background: var(--color-brand-paper);
  border: 2px solid var(--color-brand-ink);
  border-radius: 0.8rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  box-shadow: var(--shadow-stamp);
}
.card h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 0;
}
.card p {
  margin: 0;
  line-height: 1.5;
}
.cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 3rem 1rem;
  background: var(--color-brand-cream);
  border-radius: 1rem;
}
.cta h2 {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin: 0;
}
</style>
